"use client";
import { KlineChartModule } from "@/app/components/KlineCharts/core";
import { Split } from "@gfazioli/mantine-split-pane";
import { useContextMenu } from "mantine-contextmenu";
import { List, ScrollArea, Stack, ThemeIcon } from "@mantine/core";

export default function KlinePage() {
  const { ref: klineRef } = KlineChartModule().init();
  const { showContextMenu } = useContextMenu();

  return (
    <Split h={"100vh"}>
      <Split.Pane key="left" withResizer grow>
        <div
          className={"h-100vh w-full"}
          ref={klineRef}
          onContextMenu={showContextMenu((close) => {
            return (
              <Stack>
                <ScrollArea mah={250}>
                  <List
                    spacing="xs"
                    size="sm"
                    center
                    icon={
                      <ThemeIcon color="teal" size={24} radius="xl">
                        <i className={"i-mdi-text"} />
                      </ThemeIcon>
                    }
                  >
                    <List.Item
                      p={"sm"}
                      className={"rounded-1 cursor-pointer hover:bg-gray-200"}
                    >
                      添加文本
                    </List.Item>
                  </List>
                </ScrollArea>
              </Stack>
            );
          })}
        />
      </Split.Pane>
      <Split.Pane key="right"></Split.Pane>
    </Split>
  );
}
