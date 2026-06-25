import { getStockDailyUrl } from "../api/endpoints/getStockUrl";
import { useStockData } from "./useStockDate";

// Raw response returned by TWSE API
interface StockDailyApiRow {
	Date: string;
	Code: string;
	Name: string;
	TradeVolume: string;
	TradeValue: string;
	OpeningPrice: string;
	HighestPrice: string;
	LowestPrice: string;
	ClosingPrice: string;
	Change: string;
	Transaction: string;
}

// Raw response returned by TWSE API
type StockDailyApiResponse = StockDailyApiRow[];

// Normalized stock daily used by the application
interface StockDaily {
	Date: string;
	Code: string;
	Name: string;
	TradeVolume: number | null;
	TradeValue: number | null;
	OpeningPrice: number | null;
	HighestPrice: number | null;
	LowestPrice: number | null;
	ClosingPrice: number | null;
	Change: number | null;
	Transaction: number | null;
}

// Clean raw 
function normalizeStockDaily(row: StockDailyApiRow): StockDaily {
	const toNumber = (v: string): number | null => {
		if (!v) return null;
		const n = Number(v.replace(/,/g, ""));
		return Number.isFinite(n) ? n : null;
	}

	return {
		Date: row.Date,
		Code: row.Code,
		Name: row.Name,
		TradeVolume: toNumber(row.TradeVolume),
		TradeValue: toNumber(row.TradeValue),
		Transaction: toNumber(row.Transaction),
		OpeningPrice: toNumber(row.OpeningPrice),
		HighestPrice: toNumber(row.HighestPrice),
		LowestPrice: toNumber(row.LowestPrice),
		ClosingPrice: toNumber(row.ClosingPrice),
		Change: toNumber(row.Change),
	};
}

export function useStockDailyData(dates: string[]) {
	const buildUrl = (date: string) => getStockDailyUrl(date);
	const normalize = (raw: unknown) => {
		const data = raw as StockDailyApiResponse; // 不驗證 runtime 型別
		return data.map((row) => {
			return normalizeStockDaily(row)
		});
	};

	return useStockData<StockDaily>(dates, buildUrl, normalize);
}