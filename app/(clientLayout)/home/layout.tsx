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
  ThemeIcon,
  UnstyledButton
} from "@mantine/core";
import { KlineChartModule } from "@/app/components/KlineCharts/core";
import { executeCommand } from "@/app/hooks/use-event-emitter";
import { useEffect } from "react";
import { Logs } from "@/app/components/page/home/Logs";
import Datasource from "@/app/(clientLayout)/home/page";
import { ContextMenuTrigger } from "rctx-contextmenu";
import { ContextMenuEnum } from "@/app/components/ui/ContextMenu/types";
import { stockMarketKlineChartAtom } from "@/app/utils/store/chartStore";
import { useAtom } from "jotai";
import Loading from "@/app/components/base/loading";

export default function KLineChartLayout() {
  const klineChartMemo = KlineChartModule();
  const { init } = klineChartMemo;
  const { ref: klineRef } = init();
  const [{ data: stockMarketKlineChartData, isLoading }] = useAtom(
    stockMarketKlineChartAtom
  );
  useEffect(() => {
    const rsi = klineChartMemo.chart.createIndicator("RSI", true);
    const boll = klineChartMemo.chart.createIndicator("BOLL", true);
    return () => {
      klineChartMemo.chart.removeIndicator(rsi!);
      klineChartMemo.chart.removeIndicator(boll!);
    };
  }, [klineChartMemo.chart]);

  useEffect(() => {
    if (!stockMarketKlineChartData?.content) return;
    klineChartMemo.chart.applyNewData?.(
      stockMarketKlineChartData.content ?? []
    );
  }, [stockMarketKlineChartData?.content]);

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
          {isLoading && (
            <div
              className={
                "bg-[#000]] pointer-events-none absolute left-[50%] top-[50%] z-[100] flex size-full translate-x-[-50%] translate-y-[-50%] items-center backdrop-blur"
              }
            >
              <Loading />
            </div>
          )}
          <ContextMenuTrigger
            id={ContextMenuEnum.CHART}
            className={"relative flex w-full grow"}
          >
            <div className={"w-full grow"} ref={klineRef}></div>
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
                  <List
                    p={0}
                    bg={"var(--mantine-color-body)"}
                    className={"dark:bg-[#191919]!"}
                  >
                    <List.Item
                      className={
                        "cursor-pointer px-[4px] py-[6px] hover:hover:bg-[var(--mantine-color-default-hover)]"
                      }
                    >
                      <Text
                        size={"sm"}
                        className={"flex items-center justify-center"}
                      >
                        <i className={"i-mdi-add-circle"}></i>添加自选组
                      </Text>
                    </List.Item>
                  </List>
                </Popover.Dropdown>
              </Popover>
            </Group>
            <Popover>
              <Popover.Target>
                <ThemeIcon variant={"outline"}>
                  <i className={"i-mdi-menu cursor-pointer text-xl"} />
                </ThemeIcon>
              </Popover.Target>
              <Popover.Dropdown w={200}>
                <Text size="sm">
                  <List p={0}>
                    <List.Item
                      className={
                        "cursor-pointer px-[4px] py-[6px] hover:bg-[var(--mantine-color-default-hover)]"
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
