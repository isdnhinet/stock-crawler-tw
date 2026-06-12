import { useMemo } from "react";
import { getStockDayAllUrl, getStockDayUrl } from "../constants/baseUrl";
import { useFetchJson } from "./useFetchJson";

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

    const { json, loading, error } = useFetchJson<StockResponse>(url);
    const data = json?.data ?? [];
    const fields = json?.fields ?? [];

    return { result: { data, fields }, status: { loading, error } }; 
}