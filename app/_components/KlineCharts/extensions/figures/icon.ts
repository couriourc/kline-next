import type { FigureTemplate } from "couriourc-klinecharts";
import { Rectangle } from "@pixi/math";
import { createFont } from "@components/KlineCharts/extensions/figures/utils";

const icon: FigureTemplate = {
  name: "icon",
  checkEventOn: (coordinate, attrs) => {
    attrs.hover = new Rectangle(attrs.x, attrs.y, attrs.width, 14).contains(
      coordinate.x,
      coordinate.y
    );
    return attrs.hover;
  },
  draw: (ctx, attrs, styles) => {
    const {
      color = "currentColor",
      size = 12,
      family = "fontawesome"
    } = styles;

    ctx.fillStyle = color;

    const text = "\uF064";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.font = createFont(size, 500, family);

    ctx.fillText(text, attrs.x, attrs.y);
    attrs.width = ctx.measureText(text).width;

    return true;
  }
};
export default icon;
