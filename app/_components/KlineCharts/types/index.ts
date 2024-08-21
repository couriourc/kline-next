import type { Chart, Overlay, OverlayCreate } from "couriourc-klinecharts";
import type { MouseEventType } from "@components/KlineCharts/extensions/overlays/BaseOverlay";

export interface Period {
  multiplier: number;
  timespan: string;
  text: string;
}
export type WrappedOverlay = {
  id: string;
  attributes: {
    label: string;
    type?: string;
    visible: boolean;
    timestamp: number;
  };
  overlay_event?: {
    selected: boolean;
    mouse_event: MouseEventType;
  };
  overlay_id?: string;
  styles: Record<string, any>;
  destroyed?: boolean;
  _event: any;
};

export interface ICommands extends Partial<Chart> {
  createOverlay: Chart["createOverlay"];
  getOverlayByIds: (
    key: (Chart["id"] | OverlayCreate) | (Chart["id"] | OverlayCreate)[]
  ) => (Overlay | null)[];
  resize: Chart["resize"];
  overrideOverlay: Chart["overrideOverlay"];
}
