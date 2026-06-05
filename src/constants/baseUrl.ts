export const BaseUrl = {
  // 接收date, stockNo
  // 欄位stat, date, title, fields, data
  STOCK_DAY: "https://www.twse.com.tw/exchangeReport/STOCK_DAY",

  // 接收date
  STOCK_DAY_ALL: "https://raw.githubusercontent.com/isdnhinet/twse-data/main/data",
} as const;

export function getStockDayUrl(stockNo: string, date: string) {
    return `${BaseUrl.STOCK_DAY}?response=json&stockNo=${stockNo}&date=${date}`;
}

export function getStockDayAllUrl(date: string) {
    return `${BaseUrl.STOCK_DAY_ALL}/${date}.json`;
}