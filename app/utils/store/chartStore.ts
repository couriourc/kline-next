import { atom } from "jotai";

import { atomWithQuery } from "jotai-tanstack-query";
import { getStockInfoSearch } from "@/app/services/stock.api";

export const curSelectedStockAtom = atom<string | null>(null);

export const stockListAtom = atomWithQuery(() => {
  return {
    queryKey: ["stockList"],
    queryFn: async () => {
      return await getStockInfoSearch({ kw: "6" });
    }
  };
});
