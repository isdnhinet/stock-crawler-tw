export const TwseApiPath = {
  // 單一股票每日
  // 接收date, stockNo
  // 欄位stat, date, title, fields, data
  STOCK_DAY: "exchangeReport/STOCK_DAY",
  // 全部股票每日
  // 欄位stat, date, title, fields, data
  STOCK_DAY_ALL: 'exchangeReport/STOCK_DAY_ALL',

} as const;
