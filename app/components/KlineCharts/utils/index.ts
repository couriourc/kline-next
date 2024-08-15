import type { Period } from "@/app/components/KlineCharts/types";

export const adjustFromTo = (
  period: Period,
  toTimestamp: number,
  count: number
) => {
  let to = toTimestamp;
  let from = to;
  switch (period.timespan) {
    case "minute": {
      to = to - (to % (60 * 1000));
      from = to - count * period.multiplier * 60 * 1000;
      break;
    }
    case "hour": {
      to = to - (to % (60 * 60 * 1000));
      from = to - count * period.multiplier * 60 * 60 * 1000;
      break;
    }
    case "day": {
      to = to - (to % (60 * 60 * 1000));
      from = to - count * period.multiplier * 24 * 60 * 60 * 1000;
      break;
    }
    case "week": {
      const date = new Date(to);
      const week = date.getDay();
      const dif = week === 0 ? 6 : week - 1;
      to = to - dif * 60 * 60 * 24;
      const newDate = new Date(to);
      to = new Date(
        `${newDate.getFullYear()}-${newDate.getMonth() + 1}-${newDate.getDate()}`
      ).getTime();
      from = count * period.multiplier * 7 * 24 * 60 * 60 * 1000;
      break;
    }
    case "month": {
      const date = new Date(to);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      to = new Date(`${year}-${month}-01`).getTime();
      from = count * period.multiplier * 30 * 24 * 60 * 60 * 1000;
      const fromDate = new Date(from);
      from = new Date(
        `${fromDate.getFullYear()}-${fromDate.getMonth() + 1}-01`
      ).getTime();
      break;
    }
    case "year": {
      const date = new Date(to);
      const year = date.getFullYear();
      to = new Date(`${year}-01-01`).getTime();
      from = count * period.multiplier * 365 * 24 * 60 * 60 * 1000;
      const fromDate = new Date(from);
      from = new Date(`${fromDate.getFullYear()}-01-01`).getTime();
      break;
    }
  }
  return [from, to];
};
