import { useTwseQuery } from "../hooks/useTwseQuery";
import { BaseUrl } from "../constants/baseUrl";
import { toObjectArray } from "../utils/toObjectArray";
import { useMemo, useState } from "react";

type Props = {
    path: typeof BaseUrl[keyof typeof BaseUrl];
    params: Record<string, string>;
};

function parseValue(v: string) {
    if (!v || v === '--') return 0;
    return Number(v.replace(/,/g,""));
}

export function TwseTable({ path, params }: Props) {
    const { result, status } = useTwseQuery(path, params);
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

    if(status.loading) return <div>Loading...</div>
    if(status.error) return <div>Error: {status.error}</div>
    return (
        <table className="bg-amber-50">
             <thead>
                <tr>
                    {result.fields.map((field) => (
                        <th 
                            key={field} 
                            onClick={() => {setSortField(field);}}
                            style={{cursor: "pointer"}}
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
                            <td key={field}>{row[field]}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}