"use client";
import { createContext, type PropsWithChildren } from "react";
import {
  drawStore,
  updateChartStore
} from "@/app/components/KlineCharts/stateFn/store";
import type { WrappedOverlay } from "@/app/components/KlineCharts/types";

interface ChartContextProps {
  store: Map<WrappedOverlay["id"], WrappedOverlay>;
  updateStore: typeof updateChartStore;
}
const ChartContext = createContext<ChartContextProps>({
  store: drawStore(),
  updateStore: updateChartStore
});

export default function ChartContextProvider({ children }: PropsWithChildren) {
  // it provides current chart:
  //// overlays
  //// indicators
  // etc.

  return (
    <ChartContext.Provider
      value={{
        store: drawStore(), // default chart store
        updateStore: updateChartStore
      }}
    >
      {children}
    </ChartContext.Provider>
  );
}
