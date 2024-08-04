/* eslint-disable import/no-mutable-exports */
import { env } from "next-runtime-env";

export const NEXT_PUBLIC_PUBLIC_API_PREFIX = env(
  "NEXT_PUBLIC_PUBLIC_API_PREFIX"
);
