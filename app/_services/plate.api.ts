import type { WrapperResult } from "./types";
import requester from "./http";

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

export type IPostUserCustomPlate = {
  plate_name: string;
  plate_code: string;
};
export const postUserCustomPlateA = (data: IPostUserCustomPlate) =>
  requester.post("/user/custom/plate/a", data);

export const getUserCustomPlateRel = (
  data: Pick<IPostUserCustomPlate, "plate_code">
) => requester.get("/user/custom/plate/rel", data);
