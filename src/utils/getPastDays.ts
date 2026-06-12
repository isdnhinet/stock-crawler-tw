import dayTools from "./dayTools";

export function getPastDays(n: number, baseDate?: string) {
    const startDay = baseDate ? dayTools(baseDate) : dayTools();
    const result: string[] = [];

    for (let i = 1; result.length < n; i++) {
        const pastDay = startDay.subtract(i, "day");
        const dayOfWeek = pastDay.day();

        if (dayOfWeek !== 0 && dayOfWeek !== 6) {
            result.push(pastDay.format("YYYYMMDD"));
        }
    }

    return result;
}