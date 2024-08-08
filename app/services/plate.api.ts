import type { WrapperResult } from "@/app/services/types";
import requester from "@/app/services/http";

export type IGetUserCustomPlateResponse = WrapperResult<
  {
    plate_id: string;
    plate_name: string;
    plate_code: string;
    create_time: string;
  }[]
>;

export const getUserCustomPlate = () =>
  requester.get<IGetUserCustomPlateResponse>("/user/custom/plate");
