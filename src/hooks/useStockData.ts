import { useEffect, useMemo, useState } from "react";
import { getStockDayAllUrl, getStockDayUrl } from "../constants/baseUrl";
import { fetchTwseJson } from "../utils/fetchTwseJson";

type StockResponse = {
    data: string[][];
    fields: string[];
}

type UseStockOptions = 
    | {type: "daily"; date: string }
    | {type: "detail"; date: string; stockNo: string };

export function useStockData(options: UseStockOptions) {
    const url = useMemo(() => {
        if (options.type === "daily") {
            return getStockDayAllUrl(options.date);
        } else if (options.type === "detail") {
            return getStockDayUrl(options.date, options.stockNo);
        }
        return "";
    }, [options]);

    const [res, setRes] = useState<StockResponse>();
    const [error, setError] = useState<string>("");

    useEffect(() =>{
        const controller = new AbortController();

        fetchTwseJson<StockResponse>(url, { signal: controller.signal })
            .then(setRes)
            .catch((err) => setError(err.message));

            return () => controller.abort();
    }, [url]);

    const data = res?.data ?? [];
    const fields = res?.fields ?? [];


    return { result: { data, fields }, status: { error } }; 
}