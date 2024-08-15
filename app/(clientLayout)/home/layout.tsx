"use client";
import "@gfazioli/mantine-split-pane/styles.css";
import { Split } from "@gfazioli/mantine-split-pane";
import { Stack } from "@mantine/core";
import { executeCommand } from "@/app/hooks/use-event-emitter";
import type { PropsWithChildren } from "react";
import { ContextMenuTrigger } from "rctx-contextmenu";
import { ContextMenuEnum } from "@components/ui/ContextMenu/types";
import { KLineChart } from "@components/KlineCharts";

export default function KLineChartLayout({ children }: PropsWithChildren) {
  return (
    <Split size="xs" h={"100vh"} className={"box-border"}>
      <Split.Pane
        key="left"
        grow
        onResizeEnd={() => {
          executeCommand("chart:overlay:resize");
        }}
      >
        <Stack className={"h-100vh flex w-full flex-col"}>
          <ContextMenuTrigger
            id={ContextMenuEnum.CHART}
            className={"relative flex w-full grow"}
          >
            <KLineChart />
          </ContextMenuTrigger>
        </Stack>
      </Split.Pane>

      <Split.Pane
        maxWidth={400}
        initialWidth={350}
        withResizer
        minWidth={300}
        key={"right"}
      >
        <div className={"w-full"}>{children}</div>
      </Split.Pane>
    </Split>
  );
}
