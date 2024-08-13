import type { Chart, Overlay, OverlayCreate } from "couriourc-klinecharts";

export interface Period {
  multiplier: number;
  timespan: string;
  text: string;
}
export type WrappedOverlay = {
  id: string;
  attributes: {
    label: string;
    visible: boolean;
  };
  overlay_id?: string;
  styles: Record<string, any>;
  timestamp: number;
};

export interface ICommands extends Partial<Chart> {
  createOverlay: Chart["createOverlay"];
  removeOverlay: Chart["removeOverlay"];
  getOverlayByIds: (
    key: (Chart["id"] | OverlayCreate) | (Chart["id"] | OverlayCreate)[]
  ) => (Overlay | null)[];
  resize: Chart["resize"];
  overrideOverlay: Chart["overrideOverlay"];
}
