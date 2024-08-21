// 用户板块

import { atomWithQuery } from "jotai-tanstack-query";
import {
  getUserCustomPlate,
  getUserCustomPlateRel,
  type IGetUserCustomPlateResponse,
  type IGetUserCustomPlateResponseContentItem
} from "@services/plate.api";
import { curSelectedPlateAtom } from "@lib/store/chartStore";

// 获取 用户-自定义板块 列表
export const plateListAtom = atomWithQuery<IGetUserCustomPlateResponse>(() => {
  return {
    queryKey: ["/user/custom/plate"],
    queryFn: async () => {
      return await getUserCustomPlate();
    }
  };
});

// 获取 Plate List
export const plateListRelAtom = atomWithQuery((get) => {
  return {
    queryKey: ["/user/custom/plate/rel", get(curSelectedPlateAtom)],
    queryFn: async ({ queryKey: [_, plate] }) => {
      return await getUserCustomPlateRel({
        plate_code: (plate as IGetUserCustomPlateResponseContentItem)
          .plate_code!
      });
    }
  };
});
