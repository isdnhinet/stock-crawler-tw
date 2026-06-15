import { toObjectArray } from "../utils/toObjectArray";
import { useMemo, useState } from "react";
import { useStockData } from "../hooks/useStockData";

function parseValue(v: string) {
    if (!v || v === '--') return 0;
    return Number(v.replace(/,/g,""));
}

export default function TwseDailyTable({ date }: { date: string }) {
    const { result, status } = useStockData({type: "daily", date: date});

    const objData = toObjectArray(result.fields, result.data);
    const [sortField, setSortField] = useState<string>("證券代號");
    
    const sortedData = useMemo(() => {
        if (!objData.length) return [];
        const data = [...objData];
        return data.sort((a, b) => {
            const aVal = parseValue(a[sortField]);
            const bVal = parseValue(b[sortField]);
            return bVal - aVal;
        });
    }, [objData, sortField]);

    if(status.error) return <div>Error: {status.error}</div>
    return (
        <div>
            <p>{date}</p>
            <table className=" w-full border-collapse ">
                <thead>
                    <tr>
                        {result.fields.map((field) => (
                            <th 
                                key={field} 
                                onClick={() => {setSortField(field);}}
                                style={{cursor: "pointer"}}
                                className="border px-4 py-2"
                            >
                                {field}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {sortedData.map((row, rowIdx) => (
                        <tr key={rowIdx}>
                            {result.fields.map((field) => (
                                <td key={field} className="border border-amber-50 px-4 py-2">{row[field]}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}