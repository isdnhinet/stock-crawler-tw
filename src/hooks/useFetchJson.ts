import { useEffect, useState } from "react";

export function useFetchJson<T>(url: string) {
    const [json, setJson] = useState<T | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() =>{
        const controller = new AbortController();

        (async () => {
            try {
                const res = await fetch(url, { signal: controller.signal });
                if(!res.ok) throw new Error(res.statusText);
                const rawjson = await res.json();
                setJson(rawjson);
            } catch(e) {
                if (e instanceof DOMException && e.name === "AbortError") return;
                setError(e instanceof Error ? e.message : String(e));
            } finally{
                setLoading(false);
            }
        })();
    }, [url]);

    return {json, status: {loading, error}};
}