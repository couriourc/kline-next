import { atom } from "jotai";

import { atomWithQuery } from "jotai-tanstack-query";
import {
  getStockInfoSearch,
  getStockMarketKline
} from "@/app/services/stock.api";

export const curSelectedStockAtom = atom<string | null>(null);

export const stockListAtom = atomWithQuery(() => {
  return {
    queryKey: ["stockList"],
    queryFn: async () => {
      return await getStockInfoSearch({ kw: "6" });
    }
  };
});

export const stockMarketKlineChartAtom = atomWithQuery((get) => {
  return {
    queryKey: ["stockMarketKlineChart", get(curSelectedStockAtom)],
    queryFn: async () => {
      let curSelectedStock = get(curSelectedStockAtom);
      if (!curSelectedStock) {
        curSelectedStock = "600000";
      }
      return await getStockMarketKline({
        stock_code: curSelectedStock,
        k_type: "1",
        adjust_type: "1"
      });
    }
  };
});
