import { useEffect, useState } from "react";
import { getStockDaily, getStockDetail } from "../api/endpoints/getStockUrl";
import { fetchJson } from "../api/fetchJson";

type StockResponse = {
    fields: string[];
    data: string[][];
};

type StockResult = {
    [date: string]: Record<string, string | number | null>[];
};

type StockState = 
    | { status: "idle" }
    | { status: "loading" }
    | { status: "success"; response: StockResult }
    | { status: "error"; error: Error };

type StockRequestParams = 
    | { type: "daily"; date: string[] }
    | { type: "detail"; date: string[]; stockNo: string };

const numericFields = new Set([
  "成交筆數",
  "成交股數",
  "成交金額",
  "收盤價",
  "最低價",
  "最高價",
  "開盤價",
]);

const toNumber = (v: string): number | null => {
  if (!v) return null;
  const n = Number(v.replace(/,/g, ""));
  return Number.isFinite(n) ? n : null;
};

function parseRow(fields: string[], row: string[]) {
    return Object.fromEntries(
        fields.map((field, i) => [field, row[i] ?? ""])
    );
}

function transformRow(obj: Record<string, string>) {
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => {
      if (numericFields.has(key)) {
        return [key, toNumber(value)];
      }
      return [key, value];
    })
  );
}

export function useStockData( params: StockRequestParams ) {
    const [result, setResult] = useState<StockState>({ status: "loading" });

    useEffect(() => {
        const controller = new AbortController();

        const requests: Promise<StockResponse & { date: string }>[] = params.date.map(
            async (date) => {
                const url = params.type === "daily"
                        ? getStockDaily(date)
                        : getStockDetail(date, params.stockNo);
                
                const res =await fetchJson<StockResponse>(url, { signal: controller.signal });
                
                // injection date to Promise
                return { ...res, date: date};
            }
        );

        Promise.allSettled(requests)
            .then((results) => {
                const responseData: StockResult = {};
                let hasSuccess = false;

                results.forEach((res, index) => {
                    if (res.status === "fulfilled") {
                        const currentDate = res.value.date;
                        const fields = res.value.fields ?? [];
                        const data = res.value.data ?? [];

                        const requiredField = params.type === "daily" ? "證券代號" : "日期"; 

                        if (!fields.includes(requiredField)) {
                            throw new Error(
                                `API schema changed. Missing field: ${requiredField}. Received fields: ${fields.join(", ")}`
                            );
                        }

                        responseData[currentDate] = [];

                        data.forEach(row => {
                            const parsed = parseRow(fields, row);
                            const typed = transformRow(parsed);

                            responseData[currentDate].push(typed);
                        });

                        hasSuccess = true;
                    } else {
                        const failedDate = params.date[index];
                        responseData[failedDate] = [];
                    }
                });

                if (!hasSuccess) {
                    setResult({ status: "error", error: new Error("All requests failed") });
                    return;
                }

                setResult({
                    status: "success",
                    response: responseData,
                });
            })
            .catch((err) => {
                if (err?.name === "AbortError") return;
                setResult({ status: "error", error: err });
            });

        return () => controller.abort();

    }, [params]);

    return result; 
}