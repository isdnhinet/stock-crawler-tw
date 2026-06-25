import { stockUrl } from "./stockUrl";

export function getStockDetailUrl(date: string, stockNo: string) {
	return `${stockUrl.STOCK_DAY}?response=json&stockNo=${stockNo}&date=${date}`;
}

export function getStockDailyUrl(date: string) {
	return `${stockUrl.STOCK_DAY_ALL}/dayall/${date}.json`;
}
