import React from "react";
import { useTwseQuery } from "../hooks/useTwseQuery";
import { BaseUrl } from "../constants/baseUrl";

export function TwseTable({ path, params }: {
    path: typeof BaseUrl[keyof typeof BaseUrl];
    params: Record<string, string>;
}) {
    const { result, status } = useTwseQuery(path, params);

    if(status.loading) return <div>Loading...</div>
    if(status.error) return <div>Error: {status.error}</div>

    return (
        <table>
            <thead>
                <tr>
                    {result.fields.map((field, idx) => (
                        <th key={idx}>{field}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {result.data.map((row, rowIdx) => (
                    <tr key={rowIdx}>
                        {row.map((cell, cellIdx) => (
                            <td key={cellIdx}>{cell}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}