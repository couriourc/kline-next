import type { OverlayTemplate } from "couriourc-klinecharts";

export const create = (fn: () => Omit<OverlayTemplate, "onDrawStart">) => {
  const pre = fn();

  return pre as OverlayTemplate;
};
