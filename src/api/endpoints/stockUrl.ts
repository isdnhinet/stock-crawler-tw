export const stockUrl = {
  // `${stockUrl.STOCK_DAY}?response=json&stockNo=${stockNo}&date=${date}`
  STOCK_DAY: "https://www.twse.com.tw/exchangeReport/STOCK_DAY",

  // `${stockUrl.STOCK_DAY_ALL}/${date}.json`
  STOCK_DAY_ALL: "https://raw.githubusercontent.com/isdnhinet/twse-data/main/data",

} as const;
