import type { WrappedOverlay } from "@components/KlineCharts/types";
import { createStore } from "zustand";
import { atomWithStore } from "jotai-zustand";
import _ from "underscore";
import type { OverlayEvent } from "couriourc-klinecharts";

export interface ChartStoreState {
  overlays: Map<WrappedOverlay["id"], WrappedOverlay>;
  indicators: Map<WrappedOverlay["id"], WrappedOverlay>;
  overlayEvents: Map<string, OverlayEvent>;
  selectedOverlayIds: string[];
}

export const useChartStore = createStore<ChartStoreState>(() => {
  return {
    overlays: new Map(),
    indicators: new Map(),
    overlayEvents: new Map(),
    selectedOverlayIds: []
  };
});

export const ChartStoreAtom = atomWithStore(useChartStore);
export const pickOverlayId = (overlay: WrappedOverlay) => overlay.id;

export const drawStore = () => useChartStore.getState().overlays;
export const selectOverlayByIds = (ids: string[]) =>
  useChartStore.setState((state) => {
    return {
      ...state,
      selectedOverlayIds: ids
    };
  });
export const updateDrawStore = (overlays: WrappedOverlay[] | WrappedOverlay) =>
  useChartStore.setState((state) => {
    if (_.isArray(overlays)) {
      overlays.reduce((prev, now) => {
        return prev.set(pickOverlayId(now), now);
      }, state.overlays);
    } else {
      state.overlays.set(pickOverlayId(overlays), overlays);
    }
    return {
      ...state,
      overlays: new Map(state.overlays)
    };
  });

export const removeDrawStore = (overlays?: WrappedOverlay[]) =>
  useChartStore.setState((state) => {
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
