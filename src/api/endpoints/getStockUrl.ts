import { stockUrl } from "./stockUrl";

export function getStockDaily(date: string) {
    return `${stockUrl.STOCK_DAY_ALL}/${date}.json`;
}

export function getStockDetail(date: string, stockNo: string) {
    return `${stockUrl.STOCK_DAY}?response=json&stockNo=${stockNo}&date=${date}`;
}