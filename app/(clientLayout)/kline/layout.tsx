"use client";
import "@gfazioli/mantine-split-pane/styles.css";
import { useKlineChart } from "@/app/components/KlineCharts/core";
import { BaseProps } from "@/app/types/misc";

export default function KLineChartLayout({ children }: BaseProps) {
  return <>
    {
      children
    }
  </>;
}
