// 用户板块

import { atomWithQuery } from "jotai-tanstack-query";
import {
  getUserCustomPlate,
  type IGetUserCustomPlateResponse
} from "@/app/services/plate.api";

// 获取 用户-自定义板块 列表
export const plateListAtom = atomWithQuery<IGetUserCustomPlateResponse>(
  (get) => {
    return {
      queryKey: ["/user/custom/plate"],
      queryFn: async () => {
        return await getUserCustomPlate();
      }
    };
  }
);
