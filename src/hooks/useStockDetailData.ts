import { getStockDetailUrl } from "../api/endpoints/getStockUrl";
import { useStockData } from "./useStockDate";
import dayTools from "../utils/dayTools";

// Raw response returned by TWSE API
interface StockDetailApiResponse {
	stat: string;
	date: string;
	tatle: string;
	fields: string[];
	data: string[][];
	notes: string[];
};

// Normalized stock detail used by the application
interface StockDetail {
	Date: string;
	Code: string;
	Name: string;
	Transaction: number | null;
	TradeVolume: number | null;
	TradeValue: number | null;
	OpeningPrice: number | null;
	HighestPrice: number | null;
	LowestPrice: number | null;
	ClosingPrice: number | null;
	Change: number | null;
}

// Clean raw 
function normalizeStockDetail(
	obj: Record<string, string>, 
	stockNo: string
): StockDetail {
	const toNumber = (v: string): number | null => {
		if (!v) return null;
		const n = Number(v.replace(/,/g, ""));
		return Number.isFinite(n) ? n : null;
	}

	return {
		Date: dayTools(obj["日期"]).format("YYYMMDD"),
		Code: stockNo, 
		Name:stockNo,
		Transaction: toNumber(obj["成交筆數"]),
		TradeVolume: toNumber(obj["成交股數"]),
		TradeValue: toNumber(obj["成交金額"]),
		OpeningPrice: toNumber(obj["開盤價"]),
		HighestPrice: toNumber(obj["最高價"]),
		LowestPrice: toNumber(obj["最低價"]),
		ClosingPrice: toNumber(obj["收盤價"]),
		Change: toNumber(obj["漲跌價差"]),
	}
}

export function useStockDetailData( dates: string[], stockNo: string ) {
	const buildUrl = (date: string) => getStockDetailUrl(date, stockNo);
	const normalize = (raw: unknown) => {
		const fields = (raw as StockDetailApiResponse).fields ?? []; // 不驗證 runtime 型別
		const data = (raw as StockDetailApiResponse).data ?? []; // 不驗證 runtime 型別
		return data.map((row) => {
			const parsed = Object.fromEntries(fields.map((f, i) => [f, row[i]])); // 產生 [filed. data[]]
			return normalizeStockDetail(parsed, stockNo);
		});
	};

	return useStockData<StockDetail>(dates, buildUrl, normalize);
}