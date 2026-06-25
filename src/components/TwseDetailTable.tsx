import { useEffect } from "react";
import { useStockDetailData } from "../hooks/useStockDetailData";

export default function TwseDayTable(
	{ date, stockNo, setIsLoading }: { date: string[], stockNo: string, setIsLoading: React.Dispatch<React.SetStateAction<boolean>> }
) {
	const state = useStockDetailData(date, stockNo);
	console.log(state);

	useEffect(() => {
		if (state.status === "loading") {
			setIsLoading(true);
		} else {
			const timer = setTimeout(() => setIsLoading(false), 300);
			return () => clearTimeout(timer);
		}
	}, [state.status, setIsLoading]);

	if (state.status === "loading") return <div>Loading...</div>;
	if (state.status === "error") return <div>Error: {state.error.message}</div>;

	return (
		<>
			<div>{date.map((d, idx) => <span key={idx}>{d}{idx !== (date.length - 1) ? ", " : " "}</span>)}</div>
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