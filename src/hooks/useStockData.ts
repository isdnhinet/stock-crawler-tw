import { useMemo } from "react";
import { getStockDayAllUrl, getStockDayUrl } from "../constants/baseUrl";
import { useFetchJson } from "./useFetchJson";

type StockResponse = {
    data: string[][];
    fields: string[];
}

type UseStockOptions = 
    | {type: "all"; date: string}
    | {type: "single"; stockNo: string; date: string};

export function useStockData(options: UseStockOptions) {
    const url = useMemo(() => {
        if (options.type === "all") {
            return getStockDayAllUrl(options.date);
        }
        return getStockDayUrl(options.stockNo, options.date);
    }, [options]);

    const { json, status } = useFetchJson<StockResponse>(url);
    const data = json?.data ?? [];
    const fields = json?.fields ?? [];

    return { 
        result: { data, fields }, 
        status,
    }; 
}