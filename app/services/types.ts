export type WrapperResult<T> = {
  flag: number;
  success: boolean;
  code: number;
  message: string;
  content: T;
};
