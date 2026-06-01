import { useTwseQuery } from "../hooks/useTwseQuery";
import { BaseUrl } from "../constants/baseUrl";

interface Props {
    path: typeof BaseUrl[keyof typeof BaseUrl];
    params: Record<string, string>;
}

export function TwseTable({ path, params }: Props) {
    const { result, status } = useTwseQuery(path, params);

    if(status.loading) return <div>Loading...</div>
    if(status.error) return <div>Error: {status.error}</div>

    return (
        <table className="text-sky-50">
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