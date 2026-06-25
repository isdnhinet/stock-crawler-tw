import { useEffect } from "react";
import { useStockDailyData } from "../hooks/useStockDailyData";

export default function TwseDailyTable(
	{ dates, setIsLoading }: { dates: string[], setIsLoading: React.Dispatch<React.SetStateAction<boolean>> }
) {
	const state = useStockDailyData(dates);
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
			<div>{dates.map((d, idx) => <span key={idx}>{d}{idx !== (dates.length - 1) ? ", " : " "}</span>)}</div>
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