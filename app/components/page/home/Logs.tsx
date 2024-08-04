import { KlineChartModule } from "@/app/components/KlineCharts/core";
import { useEffect, useState } from "react";

export function Logs() {
  const klineChartMemo = KlineChartModule();
  const [history, updateHistory] = useState<string[]>([]);

  useEffect(() => {
    klineChartMemo.emitter.on("command:setup", (option) => {
      updateHistory((state) => [...state, JSON.stringify(option)]);
    });
    return () => klineChartMemo.emitter.off("command:setup");
  }, [klineChartMemo]);
  return (
    <ul>
      {history.map((item, index) => {
        return <li key={index}>{item}</li>;
      })}
    </ul>
  );
}
