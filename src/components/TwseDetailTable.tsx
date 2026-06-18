import { useStockData } from "../hooks/useStockData";

export default function TwseDayTable({ date, stockNo }: { date: string[], stockNo: string }) {
    const state = useStockData({type: "detail", date, stockNo});
    console.log(state);

    return (
        <div>
          
        </div>
    );
}