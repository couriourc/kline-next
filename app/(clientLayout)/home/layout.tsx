"use client";
import "@gfazioli/mantine-split-pane/styles.css";
import { Split } from "@gfazioli/mantine-split-pane";
import {
  Flex,
  Group,
  Input,
  Menu,
  Stack,
  Text,
  UnstyledButton
} from "@mantine/core";
import { KlineChartModule } from "@/app/components/KlineCharts/core";
import { executeCommand } from "@/app/hooks/use-event-emitter";
import { type PropsWithChildren, useEffect, useRef } from "react";
import { ContextMenuTrigger } from "rctx-contextmenu";
import { ContextMenuEnum } from "@/app/components/ui/ContextMenu/types";
import {
  curSearchStockKeywordAtom,
  curSelectedStockAtom,
  stockMarketKlineChartAtom
} from "@/app/utils/store/chartStore";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import Loading from "@/app/components/base/loading";
import { getHotkeyHandler } from "@mantine/hooks";
import { plateListAtom } from "@/app/utils/store/userPlateStore";

function SearchStockInput() {
  const updateCurSearchStockKeywordAtom = useSetAtom(curSearchStockKeywordAtom);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const handleEnterSearch = getHotkeyHandler([
    [
      "Enter",
      (ev) => {
        // 聚焦搜索
        updateCurSearchStockKeywordAtom(ev.target.value);
      }
    ]
  ]);
  return (
    <Input
      ref={inputRef}
      placeholder={"搜索"}
      className={"!h-full"}
      onKeyDown={handleEnterSearch}
      rightSection={<i className={"i-mdi-search"} />}
      size="xs"
    />
  );
}
// 侧边下拉菜单
function AsideMenus() {
  // 用户-自定义板块 列表 数据
  const { data: plateList } = useAtomValue(plateListAtom);
  return (
    <Menu>
      <Menu.Target>
        <UnstyledButton className={"flex items-center"}>
          <span className="i-[material-symbols-light--expand-circle-down-outline]"></span>
          <Text size={"sm"}>自选组</Text>
        </UnstyledButton>
      </Menu.Target>
      <Menu.Dropdown px={"xs"}>
        {plateList?.content.map((plate) => (
          <Menu.Item
            className={"hover:bg-[var(--mantine-default-hover)]"}
            p={"5px"}
            key={plate.plate_id}
          >
            <Text size={"xs"} className={""}>
              {plate.plate_name}
            </Text>
          </Menu.Item>
        )) ?? []}
      </Menu.Dropdown>
    </Menu>
  );
}
function AsideHeader() {
  return (
    <Group justify={"space-between"} py={"4px"} className={"box-border"}>
      <Group>
        <AsideMenus />
      </Group>
      <Group mr={"12px"}>
        <SearchStockInput />
      </Group>
    </Group>
  );
}

function KLineChart() {
  const klineChartMemo = KlineChartModule();
  const { init } = klineChartMemo;
  const { ref: klineRef } = init();
  const [{ data: stockMarketKlineChartData, isLoading }] = useAtom(
    stockMarketKlineChartAtom
  );
  const curSelectedStockCode = useAtomValue(curSelectedStockAtom);
  useEffect(() => {
    const rsi = klineChartMemo.chart.createIndicator("RSI", true);
    const boll = klineChartMemo.chart.createIndicator("BOLL", true);
    const indicator = klineChartMemo.chart.createIndicator("Custom", true, {
      id: "candle_pane"
    });

    return () => {
      klineChartMemo.chart.removeIndicator(rsi!);
      klineChartMemo.chart.removeIndicator(boll!);
      klineChartMemo.chart.removeIndicator(indicator!);
    };
  }, [klineChartMemo.chart]);
  useEffect(() => {
    if (!stockMarketKlineChartData?.content) return;
    klineChartMemo.chart.applyNewData?.(
      stockMarketKlineChartData.content ?? []
    );
  }, [stockMarketKlineChartData?.content]);
  return (
    <div className={"relative w-full grow"} ref={klineRef}>
      <div
        className={
          "pointer-events-none absolute left-[50%] top-[50%] z-[1] flex size-full translate-x-[-50%] translate-y-[-50%] items-center justify-center"
        }
      >
        <Text c="gray" opacity={0.05} size={"10vw"}>
          {curSelectedStockCode}
        </Text>
      </div>
      {isLoading && (
        <div
          className={
            "bg-[#000]] pointer-events-none absolute left-[50%] top-[50%] z-[100] flex size-full translate-x-[-50%] translate-y-[-50%] items-center backdrop-blur"
          }
        >
          <Loading />
        </div>
      )}
    </div>
  );
}

export default function KLineChartLayout({ children }: PropsWithChildren) {
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
            className={"relative flex w-full grow"}
          >
            <KLineChart></KLineChart>
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
          <AsideHeader />
          {children}
        </Flex>
      </Split.Pane>
    </Split>
  );
}
