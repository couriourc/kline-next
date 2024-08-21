import { KlineChartModule } from "@components/KlineCharts/core";
import { useEffect, useState } from "react";
import { List, rem, ThemeIcon } from "@mantine/core";
import { useScrollIntoView } from "@mantine/hooks";

export function Logs() {
  const klineChartMemo = KlineChartModule();
  const [history, updateHistory] = useState<string[]>([]);

  const { scrollableRef, targetRef, scrollIntoView } = useScrollIntoView<
    HTMLElement,
    HTMLElement
  >();

  useEffect(() => {
    klineChartMemo.emitter.on("command:setup", (option) => {
      updateHistory((state) => [...state, JSON.stringify(option)]);
    });
    handleScrollToBottom();
    return () => klineChartMemo.emitter.off("command:setup");
  }, [klineChartMemo]);
  function handleScrollToBottom() {
    scrollIntoView({});
  }
  return (
    <>
      <List
        className={
          "fixed bottom-[24px] max-h-[200px] overflow-y-auto overflow-x-hidden"
        }
        spacing="xs"
        size="sm"
        center
        ref={(ref) => {
          scrollableRef.current = ref as HTMLElement;
        }}
        icon={
          <ThemeIcon color="teal" size={24} radius="xl">
            <i
              className={"i-mdi-info"}
              style={{ width: rem(16), height: rem(16) }}
            />
          </ThemeIcon>
        }
      >
        {history.map((item, index) => {
          return <List.Item key={index}>{item}</List.Item>;
        })}
        <a
          ref={(ref) => {
            targetRef.current = ref as HTMLElement;
          }}
        ></a>
      </List>
    </>
  );
}
