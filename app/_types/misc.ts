import type { ReactNode } from "react";

export type BaseProps<T = {}> = T & {
  className?: string;
  children?: ReactNode;
};
export type FunctionOrValue<T> = T | ((...args: any[]) => T);

export type DynamicProps<T> = T & Record<string, any>;

export type WithMessageProps<T> = T &
  Partial<{
    success_message: FunctionOrValue<string>;
    error_message: FunctionOrValue<string>;
  }>;
