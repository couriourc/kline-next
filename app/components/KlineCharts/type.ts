import type { Chart, Overlay, OverlayCreate } from "couriourc-klinecharts";

export interface ICommands {
  createOverlay: Chart["createOverlay"];
  removeOverlay: Chart["removeOverlay"];
  getOverlayByIds: (
    key: (Chart["id"] | OverlayCreate) | (Chart["id"] | OverlayCreate)[]
  ) => (Overlay | null)[];
  resize: Chart["resize"];
}
