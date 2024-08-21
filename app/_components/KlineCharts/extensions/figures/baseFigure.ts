import type { FigureTemplate, OverlayTemplate } from "couriourc-klinecharts";

type DefineOverlay = (fn: () => FigureTemplate) => OverlayTemplate;
export const create: DefineOverlay = (fn) => {
  return fn();
};
