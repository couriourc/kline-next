import { useAtom, useAtomValue } from "jotai/index";
import {
  curSelectedStockAtom,
  mutationLabelKlineA,
  stockMarketKlineChartAtom
} from "@/app/store/chartStore";
import { useEffect } from "react";
import { Text } from "@mantine/core";
import Loading from "@/app/components/base/loading";
import { KlineChartModule } from "@/app/components/KlineCharts/core";
import { ActionType } from "couriourc-klinecharts";
import FloatingMenu from "@/app/components/ui/FloatingMenu";

const klineChartMemo = KlineChartModule();

export function KLineChart() {
  const { init } = klineChartMemo;
  const { ref: klineRef } = init();
  const [{ data: stockMarketKlineChartData, isLoading }] = useAtom(
    stockMarketKlineChartAtom
  );
  const curSelectedStockCode = useAtomValue(curSelectedStockAtom);
  const { mutate: handleMutationLabelKlineA } =
    useAtomValue(mutationLabelKlineA);
  klineChartMemo.useCommand("overlay:create", async (overlay) => {
    console.log(overlay);
    return handleMutationLabelKlineA({
      k_type: 0,
      adjust_type: 0,
      pos: "1713398400000",
      label_type: "string",
      label_text: "string",
      user_id: "adata"
    });
  });

  useEffect(() => {
    const rsi = klineChartMemo.chart.createIndicator("RSI", true);
    const boll = klineChartMemo.chart.createIndicator("BOLL", true);
    const indicator = klineChartMemo.chart.createIndicator("Custom", true, {
      id: "candle_pane"
    });
    const callback = (data) => {
      console.log(`[🪪]data-->`, data);
    };
    Object.keys(ActionType).forEach((type) => {
      klineChartMemo.chart.subscribeAction(type as ActionType, callback);
    });
    return () => {
      Object.keys(ActionType).forEach((type) => {
        klineChartMemo.chart.unsubscribeAction(type as ActionType, callback);
      });

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
      <FloatingMenu />
    </>
  );
}
