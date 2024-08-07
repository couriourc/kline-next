import { atom } from "jotai";

import { atomWithQuery } from "jotai-tanstack-query";
import {
  getStockInfoSearch,
  getStockMarketKline
} from "@/app/services/stock.api";

// 当前选择的K线股票代码
export const curSelectedStockAtom = atom<string | null>("600000");
// 当前搜索关键字
export const curSearchStockKeywordAtom = atom<string>("");
// 当前股票列表
export const stockListAtom = atomWithQuery((get) => {
  return {
    queryKey: ["stockList", get(curSearchStockKeywordAtom)],
    queryFn: async ({ queryKey: [_, kw] }) => {
      return await getStockInfoSearch({ kw: kw as string });
    }
  };
});
// 当前K线信息
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
