import { useEffect, useMemo, useState } from "react";
import { getPastDays } from "../utils/getPastDays";

export function useStockDataRange(days: number, date?: string) {
    const candidateDates = useMemo(() => {
        if (date) {
            return [date, ...getPastDays(days - 1 , date)];
        } 
        return getPastDays(days);
    }, [days, date]);


  //  const { result, status } = useStockData({type: "daily", date: date});



    return candidateDates;
}