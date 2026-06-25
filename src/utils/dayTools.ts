export default function dayTools(input?: string | number | Date, format: string = "YYYYMMDD") {
	let date: Date;

	if (typeof input === "string") {
		const trimmed = input.trim();
		const twnDate = trimmed.match(/^(\d{2,3})[-/](\d{2})[-/](\d{2})$/);

		if (twnDate) {
			const twnY = parseInt(twnDate[1], 10);
			const month = parseInt(twnDate[2], 10) - 1;
			const day = parseInt(twnDate[3], 10);
			date = new Date(twnY + 1911, month, day);
		} else if (format === "YYYYMMDD" && /^\d{8}$/.test(input)) {
			const year = parseInt(input.slice(0, 4));
			const month = parseInt(input.slice(4, 6)) - 1;
			const day = parseInt(input.slice(6, 8));
			date = new Date(year, month, day);
		} else {
			date = new Date(input);
		}
	} else if (typeof input === "number") {
		date = new Date(input);
	} else if (input instanceof Date) {
		date = new Date(input);
	} else {
		date = new Date();
	}

	return {
		format: (f: string): string => {
			const year = date.getFullYear().toString();
			const month = (date.getMonth() + 1).toString().padStart(2, "0");
			const day = date.getDate().toString().padStart(2, "0");
			const h = date.getHours().toString().padStart(2, "0");
			const m = date.getMinutes().toString().padStart(2, "0");
			const s = date.getSeconds().toString().padStart(2, "0");
			const twnYear = (date.getFullYear() - 1911).toString();
			return f
				.replace("YYYY", year)
				.replace("YYY", twnYear)
				.replace("MM", month)
				.replace("DD", day)
				.replace("HH", h)
				.replace("mm", m)
				.replace("ss", s)
		},
		day: (): number => date.getDay(),
		dayZh: (): string =>
			["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"][date.getDay()],
		add: (value: number, unit: "day" | "month" | "year" = "day") => {
			const newDate = new Date(date);
			switch (unit) {
				case "day": newDate.setDate(newDate.getDate() + value); break;
				case "month": newDate.setMonth(newDate.getMonth() + value); break;
				case "year": newDate.setFullYear(newDate.getFullYear() + value); break;
			};
			return dayTools(newDate);
		},
		subtract: (value: number, unit: "day" | "month" | "year" = "day") => {
			return dayTools(date).add(-value, unit);
		},
		isWeekend: (): boolean => {
			const dayOfWeek = date.getDay();
			return dayOfWeek === 0 || dayOfWeek === 6;
		},
		isValid: (): boolean => !isNaN(date.getTime()),
	};
}