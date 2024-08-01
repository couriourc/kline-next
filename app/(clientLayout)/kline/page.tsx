"use client";
import { useKlineChart } from "@/app/components/KlineCharts/core";

export default function KlinePage() {
  const { ref: klineRef } = useKlineChart().init();

  return <div className={"w-100vw h-100vh"} ref={klineRef}>
  </div>;
}
