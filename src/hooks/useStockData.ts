import { useEffect, useState } from "react";
import { getStockDaily, getStockDetail } from "../api/endpoints/getStockUrl";
import { fetchJson } from "../api/fetchJson";

type StockResponse = {
    data: string[][];
    fields: string[];
};

type StockState = 
    | { status: "idle" }
    | { status: "loading" }
    | { status: "success"; response: StockResponse }
    | { status: "error"; error: Error };

type StockRequestParams = 
    | { type: "daily"; date: string[] }
    | { type: "detail"; date: string[]; stockNo: string };

export function useStockData( params: StockRequestParams ) {
    const [state, setState] = useState<StockState>({ status: "loading" });

    useEffect(() => {
        const controller = new AbortController();

        const requests: Promise<StockResponse>[] = params.date.map(date => {
            const url = 
                params.type === "daily"
                    ? getStockDaily(date)
                    : getStockDetail(date, params.stockNo);
            
            return fetchJson<StockResponse>(url, { signal: controller.signal });
        });

        Promise.allSettled(requests)
            .then((results) => {
                // filter for fulfilled
                const success = results
                    .filter(
                        // for Ts type check
                        (r): r is PromiseFulfilledResult<StockResponse> => 
                            r.status === "fulfilled"
                    )
                    .map((r) => r.value);
                
                // if all rejected
                if ( success.length === 0 ) {
                    setState({ 
                        status: "error", 
                        error: new Error("All requests failed"),
                    });
                    return;
                }

                setState({
                    status: "success",
                    response: {
                        fields: success[0].fields ?? [],
                        data: success.flatMap((r) => r.data),
                    },
                });
            })
            .catch((err) => {
                if (err?.name === "AbortError") return;
                setState({
                    status: "error",
                    error: err,
                });
            });

        return () => controller.abort();
    }, [params]);

    return state; 
}