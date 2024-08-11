import { Button, ButtonGroup } from "@mantine/core";
import { updatePeriod } from "@/app/components/KlineCharts/stateFn";

export function PeriodBar() {
  const periods = [
    { multiplier: 1, timespan: "minute", text: "1m" },
    { multiplier: 5, timespan: "minute", text: "5m" },
    { multiplier: 15, timespan: "minute", text: "15m" },
    { multiplier: 1, timespan: "hour", text: "1H" },
    { multiplier: 2, timespan: "hour", text: "2H" },
    { multiplier: 4, timespan: "hour", text: "4H" },
    { multiplier: 1, timespan: "day", text: "D" },
    { multiplier: 1, timespan: "week", text: "W" },
    { multiplier: 1, timespan: "month", text: "M" },
    { multiplier: 1, timespan: "year", text: "Y" }
  ];

  return (
    <>
      <ButtonGroup>
        {periods.map((period, index) => (
          <Button
            size={"xs"}
            variant={"default"}
            onClick={() => updatePeriod(period)}
            key={index}
            value={period.multiplier}
          >
            {period.text}
          </Button>
        ))}
      </ButtonGroup>
    </>
  );
}
