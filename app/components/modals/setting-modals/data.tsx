export function getOptions(_locale?: string) {
  return [
    {
      key: "candle.type",
      text: "蜡烛图类型",
      component: "select",
      dataSource: [
        { value: "candle_solid", label: "candle_solid" },
        { value: "candle_stroke", label: "candle_stroke" },
        { value: "candle_up_stroke", label: "candle_up_stroke" },
        { value: "candle_down_stroke", label: "candle_down_stroke" },
        { value: "ohlc", label: "ohlc" },
        { value: "area", label: "area" }
      ]
    },
    {
      key: "candle.priceMark.last.show",
      text: "最新价显示",
      component: "switch"
    },
    {
      key: "candle.priceMark.high.show",
      text: "最高价显示",
      component: "switch"
    },
    {
      key: "candle.priceMark.low.show",
      text: "最低价显示",
      component: "switch"
    },
    {
      key: "indicator.lastValueMark.show",
      text: "指标最新值显示",
      component: "switch"
    },
    {
      key: "yAxis.type",
      text: "价格轴类型",
      component: "select",
      dataSource: [
        { value: "normal", label: "normal" },
        { value: "percentage", label: "percentage" },
        { value: "log", label: "log" }
      ]
    },
    {
      key: "yAxis.reverse",
      text: "倒置坐标",
      component: "switch"
    },
    {
      key: "grid.show",
      text: "网格线显示",
      component: "switch"
    }
  ];
}
