import { useStockData } from "../hooks/useStockData";
import { toObjectArray } from "../utils/toObjectArray";

export default function TwseDayTable({ date, stockNo }: { date: string, stockNo: string }) {
    const { result, status } = useStockData({type: "detail", date: date, stockNo: stockNo});
    const objData = toObjectArray(result.fields, result.data);

    if(status.error) return <div>Error: {status.error}</div>
    return (
        <div>
            <p>{stockNo} {!result.data.length && <span>No Data</span>}</p>
            <table className=" w-full border-collapse ">
                <thead>
                    <tr>
                        {result.fields.map((field) => (
                            <th 
                                key={field} 
                                className="border px-4 py-2"
                            >
                                {field}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                     {objData.map((row, rowIdx) => (
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