import { atom } from "jotai";

import { atomWithMutation, atomWithQuery } from "jotai-tanstack-query";
import {
  getStockInfoSearch,
  getStockMarketKline
} from "@/app/services/stock.api";
import {
  getLabelKlineDown,
  type IPostLabelKlineA,
  postLabelKlineA
} from "@/app/services/label.api";
import type { IGetUserCustomPlateResponseContentItem } from "@/app/services/plate.api";

// 当前选择的K线股票代码
export const curSelectedStockAtom = atom<string | null>("600000");
// 当前搜索关键字
export const curSearchStockKeywordAtom = atom<string>("");
export const curSelectedPlateAtom =
  atom<IGetUserCustomPlateResponseContentItem>("000000");
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
export const mutationLabelKlineA = atomWithMutation((get) => {
  return {
    mutationKey: [postLabelKlineA.name],
    mutationFn: async (data: Omit<IPostLabelKlineA, "stock_code">) => {
      let curSelectedStock = get(curSelectedStockAtom);
      if (!curSelectedStock) curSelectedStock = "600000";

      return await postLabelKlineA({
        ...data,
        stock_code: curSelectedStock
      });
    }
  };
});
export const labelKlineDownAtom = atomWithMutation((get) => {
  return {
    mutationKey: ["labelKlineDown"],
    mutationFn: async () => {
      const curSelectedPlate = get(curSelectedPlateAtom);
      if (!curSelectedPlate) {
        return;
      }
      return await getLabelKlineDown({
        plate_id: curSelectedPlate.plate_id
      });
    }
  };
});
