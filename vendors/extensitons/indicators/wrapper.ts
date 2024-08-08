import type { IndicatorTemplate } from "couriourc-klinecharts";
//const rasterizehtml = require('rasterizehtml');

const fruits = [
  "🍏",
  "🍎",
  "🍐",
  "🍊",
  "🍋",
  "🍌",
  "🍉",
  "🍇",
  "🍓",
  "🍈",
  "🍒",
  "🍑",
  "🍍",
  "🥥",
  "🥝",
  "🥭",
  "🥑",
  "🍏"
];
const CustomIndicator: IndicatorTemplate = {
  name: "Custom",
  figures: [{ key: "emoji" }],
  calc: (kLineDataList) => {
    return kLineDataList.map((kLineData) => ({
      emoji: kLineData.close,
      text: fruits[Math.floor(Math.random() * 17)]
    }));
  },
  draw: ({ ctx, barSpace, visibleRange, indicator, xAxis, yAxis }) => {
    const { from, to } = visibleRange;

    ctx.font = barSpace.gapBar + "px" + " Helvetica Neue";
    ctx.textAlign = "center";
    const result = indicator.result;
    for (let i = from; i < to; i++) {
      const data = result[i];
      const x = xAxis.convertToPixel(i);
      const y = yAxis.convertToPixel(data.emoji);
      ctx.fillText(data.text, x, y);
    }

    return false;
  }
};
export default CustomIndicator;
