"use client";
import "@gfazioli/mantine-split-pane/styles.css";
import { Split } from "@gfazioli/mantine-split-pane";
import {
  Flex,
  Group,
  List,
  Popover,
  Stack,
  Text,
  UnstyledButton
} from "@mantine/core";
import { KlineChartModule } from "@/app/components/KlineCharts/core";
import { executeCommand } from "@/app/hooks/use-event-emitter";
import { useEffect } from "react";
import { Logs } from "@/app/components/page/home/Logs";
import Datasource from "@/app/(clientLayout)/home/page";
import { ContextMenuTrigger } from "rctx-contextmenu";
import { ContextMenuEnum } from "@/app/components/ui/ContextMenu/types";

export default function KLineChartLayout() {
  const klineChartMemo = KlineChartModule();
  const { init } = klineChartMemo;
  const { ref: klineRef } = init();

  useEffect(() => {
    klineChartMemo.chart.applyNewData([
      {
        close: 4976.16,
        high: 4977.99,
        low: 4970.12,
        open: 4972.89,
        timestamp: 1587660000000,
        volume: 204
      },
      {
        close: 4977.33,
        high: 4979.94,
        low: 4971.34,
        open: 4973.2,
        timestamp: 1587660060000,
        volume: 194
      },
      {
        close: 4977.93,
        high: 4977.93,
        low: 4974.2,
        open: 4976.53,
        timestamp: 1587660120000,
        volume: 197
      },
      {
        close: 4966.77,
        high: 4968.53,
        low: 4962.2,
        open: 4963.88,
        timestamp: 1587660180000,
        volume: 28
      },
      {
        close: 4961.56,
        high: 4972.61,
        low: 4961.28,
        open: 4961.28,
        timestamp: 1587660240000,
        volume: 184
      },
      {
        close: 4964.19,
        high: 4964.74,
        low: 4961.42,
        open: 4961.64,
        timestamp: 1587660300000,
        volume: 191
      },
      {
        close: 4968.93,
        high: 4972.7,
        low: 4964.55,
        open: 4966.96,
        timestamp: 1587660360000,
        volume: 105
      },
      {
        close: 4979.31,
        high: 4979.61,
        low: 4973.99,
        open: 4977.06,
        timestamp: 1587660420000,
        volume: 35
      },
      {
        close: 4977.02,
        high: 4981.66,
        low: 4975.14,
        open: 4981.66,
        timestamp: 1587660480000,
        volume: 135
      },
      {
        close: 4985.09,
        high: 4988.62,
        low: 4980.3,
        open: 4986.72,
        timestamp: 1587660540000,
        volume: 76
      }
    ]);
    const rsi = klineChartMemo.chart.createIndicator("RSI", true);
    const boll = klineChartMemo.chart.createIndicator("BOLL", true);

    return () => {
      klineChartMemo.chart.removeIndicator(rsi!);
      klineChartMemo.chart.removeIndicator(boll!);
    };
  }, [klineChartMemo.chart]);

  return (
    <Split size="xs" h={"100vh"}>
      <Split.Pane
        key="left"
        grow
        onResizeEnd={() => {
          executeCommand("chart:command:resize");
        }}
      >
        <Stack className={"h-100vh flex w-full flex-col"}>
          <ContextMenuTrigger
            id={ContextMenuEnum.CHART}
            className={"flex w-full grow"}
          >
            <div className={"w-full grow"} ref={klineRef} />
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
        <Flex w={"100%"} p={"4px"} direction={"column"} gap={6}>
          <Group
            justify={"space-between"}
            p={"sm"}
            className={"shadow-inset rounded-md bg-[var(--mantine-color-body)]"}
          >
            <Group>
              <Popover>
                <Popover.Target>
                  <UnstyledButton className={"flex items-center"}>
                    <span className="i-[material-symbols-light--expand-circle-down-outline]"></span>
                    <span className={"text-sm"}>自选组</span>
                  </UnstyledButton>
                </Popover.Target>
                <Popover.Dropdown p={0} bg={"transparent"} maw={200}>
                  <List p={0} bg={"white"} className={"dark:bg-[#191919]!"}>
                    <List.Item
                      className={
                        "cursor-pointer px-[4px] py-[6px] hover:bg-gray-200"
                      }
                    >
                      <Text size={"sm"}>添加自选组</Text>
                    </List.Item>
                  </List>
                </Popover.Dropdown>
              </Popover>
            </Group>
            <Popover>
              <Popover.Target>
                <i
                  className={"i-mdi-menu cursor-pointer text-xl text-[#333]"}
                />
              </Popover.Target>
              <Popover.Dropdown w={200}>
                <Text size="sm">
                  <List p={0} bg={"white"}>
                    <List.Item
                      className={
                        "cursor-pointer px-[4px] py-[6px] hover:bg-gray-200"
                      }
                    >
                      <Text size={"sm"}>操作信息</Text>
                    </List.Item>
                  </List>
                </Text>
              </Popover.Dropdown>
            </Popover>
          </Group>
          {/*<HomeNav />*/}
          <Datasource />
          <Logs />
        </Flex>
      </Split.Pane>
    </Split>
  );
}
