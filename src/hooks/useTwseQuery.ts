import { useEffect, useMemo, useState } from "react";
import { BaseUrl } from "../constants/baseUrl";

interface TwseResponse {
    fields: string[];
    data: string[][];
}

export function useTwseQuery(path: string, params: Record<string, string>) {
    const [data, setData] = useState<string[][]>([]);
    const [fields, setFields] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const url: string = useMemo(() => {
        if(path === BaseUrl.STOCK_DAY) {
            const queryString = new URLSearchParams({response: "json", ...params}).toString();
            return `${path}?${queryString}`;
        }else if(path === BaseUrl.STOCK_DAY_ALL) {
            return `${path}/${params.date}.json`;
        }
        return path;
    }, [path, params]);
    console.log(url);

    useEffect(() =>{
        const controller = new AbortController();
        const signal = controller.signal;

        (async () => {
            setLoading(true); 
            try {
                const res = await fetch(url, { signal });
                const json: TwseResponse = await res.json();
                setData(json.data ?? []);
                setFields(json.fields ?? []);
            } catch (err) {
                if(err instanceof DOMException && err.name === "AbortError") {
                    // 請求中斷
                } else {
                    // 未知中斷
                    setError(err instanceof Error ? err.message : String(err));
                } 
            } finally {
                setLoading(false);
            }
        })();
        return () => { controller.abort() };
    }, [url]);
    
    return { 
        result: { data, fields }, 
        status: { loading, error },
    }; 
}