import requester from "@/app/services/http";

//{
//  "stock_code": "string",
//  "k_type": 0,
//  "adjust_type": 0,
//  "pos": "string",
//  "label_type": "string",
//  "label_text": "string",
//  "user_id": "adata"
//}

export interface IPostLabelKlineA {
  stock_code: string;
  k_type: number;
  adjust_type: number;
  pos: string;
  label_type: string;
  label_text: string;
  user_id: string;
}
export interface IPostLabelKlineA {}

export const postLabelKlineA = (data: IPostLabelKlineA) =>
  requester.post("/label/kline/a", data);
export interface IGetLabelKlineListParams {
  stock_code: string;
  k_type: string;
  adjust_type: string;
}
export interface IGetLabelKlineListResponse {}

export const getLabelKlineList = (data: IGetLabelKlineListParams) =>
  requester.get("/label/kline/list", data);

export interface IGetLabelKlineStockDownParams {
  plate_id: string;
}
export const getLabelKlineDown = (data: IGetLabelKlineStockDownParams) =>
  requester.get("/label/kline/down", data);
