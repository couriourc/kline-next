import { TooltipIconPosition } from "couriourc-klinecharts";
import { createSignal } from "solid-js";

export const [indicatorVisible, setIndicatorVisible] = createSignal(true);
export const indicatorCommands = [
  {
    id: "visible",
    position: TooltipIconPosition.Middle
  }
];
