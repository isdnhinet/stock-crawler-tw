import { useStockData } from "../hooks/useStockData";


export default function TwseDailyTable({ date }: { date: string[] }) {
    const state = useStockData({type: "daily", date});
    console.log(state);

    if (state.status === "loading") 
        return <div>Loading...</div>;

    if (state.status === "error") 
        return <div>Error: {state.error.message}</div>;

    return (
        <>
            <div>{date.map((d, idx) => <span key={idx}>{d}{ idx !== (date.length - 1) ? ", " : " "}</span>)}</div>
            <table className=" w-full border-collapse ">
                <thead>
                    <tr>
                        
                    </tr>
                </thead>
                <tbody>
                    
                </tbody>
            </table>
        </>
    ); 
}