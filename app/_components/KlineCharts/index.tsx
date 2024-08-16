import { useAtom, useAtomValue } from "jotai/index";
import {
  curSelectedStockAtom,
  stockMarketKlineChartAtom
} from "@lib/store/chartStore";
import { useEffect } from "react";
import { Text } from "@mantine/core";
import Loading from "@components/base/loading";
import { KlineChartModule } from "@components/KlineCharts/core";
import Dock from "@components/ui/Dock";
import "./listeners";
import { CommandPosition } from "@lib/commands";
import { useSetupCommandsByPosition } from "@lib/commands/register";

const klineChartMemo = KlineChartModule();

export function KLineChart() {
  /*setup with hook command*/
  useSetupCommandsByPosition(CommandPosition.Main);

  const { init } = klineChartMemo;
  const { ref: klineRef } = init();
  const [{ data: stockMarketKlineChartData, isLoading }] = useAtom(
    stockMarketKlineChartAtom
  );
  const curSelectedStockCode = useAtomValue(curSelectedStockAtom);

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
    <>
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
      <Dock />
    </>
  );
}
