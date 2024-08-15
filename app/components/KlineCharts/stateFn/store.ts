import type { WrappedOverlay } from "@/app/components/KlineCharts/types";
import { createStore } from "zustand";
import { atomWithStore } from "jotai-zustand";
import _ from "underscore";
import type { ActionType, OverlayEvent } from "couriourc-klinecharts";

export interface ChartStoreState {
  overlays: Map<WrappedOverlay["id"], WrappedOverlay>;
  indicators: Map<WrappedOverlay["id"], WrappedOverlay>;
  overlayEvents: Map<string, OverlayEvent>;
}
export const useChartStore = createStore<ChartStoreState>(() => {
  return {
    overlays: new Map(),
    indicators: new Map(),
    overlayEvents: new Map()
  };
});

export const ChartStoreAtom = atomWithStore(useChartStore);
export const pickOverlayId = (overlay: WrappedOverlay) => overlay.id;

export const drawStore = () => useChartStore.getState().overlays;
export const drawEvents = () => useChartStore.getState().overlayEvents;

export const updateDrawEvents = (type: ActionType, event: OverlayEvent) =>
  useChartStore.setState((state) => {
    return {
      ...state,
      overlayEvents: state.overlayEvents.set(type, event)
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
