import { useEffect, useMemo, useState } from "react";
import { TwseApiPath } from "../constants/twseApiPath";

interface TwseResponse {
    fields?: string[];
    data: string[][];
}

export function useTwseApi(
    path: (typeof TwseApiPath)[keyof typeof TwseApiPath], // API 路徑，例如 "exchangeReport/STOCK_DAY"
    params: Record<string, string>, // 查詢參數
) {
    const [data, setData] = useState<string[][]>([]);
    const [fields, setFields] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const queryString: string = useMemo(
        () => new URLSearchParams({ response: "json", ...params}).toString(), 
        [params]
    );

    useEffect(() =>{
        fetch(`https://www.twse.com.tw/${path}?${queryString}`)
            .then(res => res.json())
            .then((json: TwseResponse) =>{
                setData(json.data);
                setFields(json.fields ?? []);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, [path, queryString]);
    
    return { 
        result: { data, fields }, 
        status: { loading, error },
    }; 
}