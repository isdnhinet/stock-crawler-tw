import { useEffect, useState } from "react";
import { fetchJson } from "../api/fetchJson";

type StockResult<T> = {
	[date: string]: T[];
};

type StockState<T> =
	| { status: "idle" }
	| { status: "loading" }
	| { status: "success"; response: StockResult<T> }
	| { status: "error"; error: Error };

export function useStockData<T>(
	dates: string[],
	buildUrl: (date: string) => string,
	normalize: (raw: unknown, date: string) => T[],
) {
	const [result, setResult] = useState<StockState<T>>({ status: "loading" });

	useEffect(() => {
		const controller = new AbortController();

		const requests = dates.map(async (date) => {
			const url = buildUrl(date);
			const raw = await fetchJson(url, { signal: controller.signal });
			return { raw, date };
		});

		Promise.allSettled(requests)
			.then((results) => {
				const responseData: StockResult<T> = {};
				let hasSuccess = false;

				results.forEach((res, index) => {
					const currentDate = dates[index];
					if (res.status === "fulfilled") {
						responseData[currentDate] = normalize(res.value.raw, currentDate);
						hasSuccess = true;
					} else {
						responseData[currentDate] = [];
					}
				});

				if (!hasSuccess) {
					setResult({ status: "error", error: new Error("All requests failed") });
					return;
				}

				setResult({ status: "success", response: responseData });
			})
			.catch((err) => {
				if (err?.name === "AbortError") return;
				setResult({ status: "error", error: err });
			});

		return () => controller.abort();
	}, [dates, buildUrl, normalize]);

	return result;
}
