import type { WrapperResult } from "@/app/services/types";
import requester from "@/app/services/http";

export type IGetUserCustomPlateResponseContentItem = {
  plate_id: string;
  plate_name: string;
  plate_code: string;
  create_time: string;
};
export type IGetUserCustomPlateResponse = WrapperResult<
  IGetUserCustomPlateResponseContentItem[]
>;

export const getUserCustomPlate = () =>
  requester.get<IGetUserCustomPlateResponse>("/user/custom/plate");
