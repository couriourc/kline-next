import { createSignal } from "solid-js";
import type { Period } from "@/app/components/KlineCharts/types";
import { FormatDateType, utils } from "couriourc-klinecharts";

export const [period, updatePeriod] = createSignal<Period>({
  multiplier: 1,
  timespan: "minute",
  text: "1分钟"
});
export function formatDate(
  dateTimeFormat: Intl.DateTimeFormat,
  timestamp: number,
  _format: string,
  type: FormatDateType
) {
  const p = period();
  switch (p.timespan) {
    case "minute": {
      if (type === FormatDateType.XAxis) {
        return utils.formatDate(dateTimeFormat, timestamp, "HH:mm");
      }
      return utils.formatDate(dateTimeFormat, timestamp, "YYYY-MM-DD HH:mm");
    }
    case "hour": {
      if (type === FormatDateType.XAxis) {
        return utils.formatDate(dateTimeFormat, timestamp, "MM-DD HH:mm");
      }
      return utils.formatDate(dateTimeFormat, timestamp, "YYYY-MM-DD HH:mm");
    }
    case "day":
    case "week":
      return utils.formatDate(dateTimeFormat, timestamp, "YYYY-MM-DD");
    case "month": {
      if (type === FormatDateType.XAxis) {
        return utils.formatDate(dateTimeFormat, timestamp, "YYYY-MM");
      }
      return utils.formatDate(dateTimeFormat, timestamp, "YYYY-MM-DD");
    }
    case "year": {
      if (type === FormatDateType.XAxis) {
        return utils.formatDate(dateTimeFormat, timestamp, "YYYY");
      }
      return utils.formatDate(dateTimeFormat, timestamp, "YYYY-MM-DD");
    }
  }
  return utils.formatDate(dateTimeFormat, timestamp, "YYYY-MM-DD HH:mm");
}
