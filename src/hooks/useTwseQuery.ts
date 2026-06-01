import { useEffect, useMemo, useState } from "react";
import { BaseUrl } from "../constants/baseUrl";

interface TwseResponse {
    fields: string[];
    data: string[][];
}

function buildUrl(path: string, params: Record<string, string>): string {
    if(path === BaseUrl.STOCK_DAY) {
        return `${path}?${new URLSearchParams({response: "json", ...params}).toString()}`;
    }else if(path === BaseUrl.STOCK_DAY_ALL) {
        return `${path}/${params.date}.json`;
    }
    return path;
}

export function useTwseQuery(path: string, params: Record<string, string>) {
    const [data, setData] = useState<string[][]>([]);
    const [fields, setFields] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const url: string = useMemo(() => buildUrl(path, params), [path, params]);

    useEffect(() =>{
        const controller = new AbortController();
        const signal = controller.signal;

        (async () => {
            setLoading(true); 
            try {
                const res = await fetch(url, { signal });
                if(!res.ok) throw new Error(`HTTP error: ${res.status}`);
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