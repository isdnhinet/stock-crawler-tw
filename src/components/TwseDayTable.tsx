import { useStockData } from "../hooks/useStockData";


type Props = {
    params: Record<string, string>;
};

export function TwseDayTable({ params }: Props) {
    const { result, status } = useStockData({type: "single", stockNo: params.stockNo, date: params.date});

    console.log(result);
    console.log(status);

    return (
        <table>

        </table>
    );
}