import { useStockData } from "../hooks/useStockData";
import { toObjectArray } from "../utils/toObjectArray";
import { useMemo, useState } from "react";

function parseValue(v: string) {
    if (!v || v === '--') return 0;
    return Number(v.replace(/,/g,""));
}

export default function TwseDailyTable({ date }: { date: string[] }) {
    const state = useStockData({type: "daily", date: date});
    console.log(state);

    const [sortField, setSortField] = useState<string>("證券代號");

    const objectData = useMemo(() => {
        if (state.status !== "success") return [];
        return toObjectArray(state.response.fields, state.response.data);
    }, [state]);

    const sortedData = useMemo(() => {
        if (!objectData.length) return [];
        return [...objectData].sort(
            (a, b) => parseValue(a[sortField]) - parseValue(b[sortField])
        );
    }, [objectData, sortField]);

    if (state.status === "loading") 
        return <div>Loading...</div>;

    if (state.status === "error") 
        return <div>Error: {state.error.message}</div>;

    return (
        <>
            <p>{date.map((d, idx) => <p key={idx}>{d}</p>)}</p>
            <table className=" w-full border-collapse ">
                <thead>
                    <tr>
                        {state.status === "success" && 
                            state.response.fields.map((f, idx) => (
                                <th
                                    key={idx}
                                    onClick={() => {setSortField(f);}}
                                    style={{cursor: "pointer"}}
                                    className="border px-4 py-2"
                                >
                                    {f}
                                </th>
                            ))
                        }
                    </tr>
                </thead>
                <tbody>
                    {sortedData.map((row, idx) => (
                        <tr key={idx}>
                        {state.status === "success" &&
                            state.response.fields.map((f) => (
                                <td key={f}>{row[f]}</td>
                            ))
                        }
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    ); 
}