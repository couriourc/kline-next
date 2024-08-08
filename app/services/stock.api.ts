import requester from "@/app/services/http";

export interface IGetStockInfoSearch {
  kw?: string;
}

export interface IGetStockInfoSearchResponse {
  flag: number;
  success: boolean;
  code: number;
  message: string;
  content: {
    stock_code: string;
    short_name: string;
    exchange: string;
    code_type: string;
  }[];
}
export const getStockInfoSearch = (data: IGetStockInfoSearch) =>
  requester.get<IGetStockInfoSearchResponse>("/stock/info/search", data);
export interface IGetStockMarketKline {
  stock_code: string;
  k_type: string;
  adjust_type: string;
}
export interface IGetStockMarketKlineResponse {}
export const getStockMarketKline = (data: IGetStockMarketKline) =>
  requester.get<IGetStockMarketKlineResponse>("/stock/market/kline", data);
