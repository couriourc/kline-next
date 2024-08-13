import { createSignal } from "solid-js";
import type { WrappedOverlay } from "@/app/components/KlineCharts/types";
import { createStore } from "zustand";

export const useStore = createStore<{
  overlays: Map<WrappedOverlay["id"], WrappedOverlay>;
}>((set) => {
  return {
    overlays: new Map(),
    indicators: new Map()
  };
});

export const [chartStore, updateChartStore] = createSignal<{}>({
  hoverState: null
});
export const pickOverlayId = (overlay: WrappedOverlay) => overlay.id;

export const drawStore = () => useStore.getState().overlays;

export const updateDrawStore = (overlays: WrappedOverlay[]) =>
  useStore.setState((state) => {
    overlays.reduce((prev, now) => {
      return prev.set(pickOverlayId(now), now);
    }, state.overlays);
    return {
      ...state,
      overlays: new Map(state.overlays)
    };
  });

export const removeDrawStore = (overlays?: WrappedOverlay[]) =>
  useStore.setState((state) => {
    if (!overlays) {
      state.overlays.clear();
    } else {
      overlays?.forEach((overlay) =>
        state.overlays.delete(pickOverlayId(overlay))
      );
    }
    return {
      ...state,
      overlays: new Map(state.overlays)
    };
  });
