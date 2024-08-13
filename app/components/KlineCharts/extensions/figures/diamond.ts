import type { Figure } from "couriourc-klinecharts";

const diamond: Figure = {
  name: "diamond",
  checkEventOn: (coordinate, attrs) => {
    const { x, y, width, height } = attrs;
    const xDis = Math.abs(coordinate.x - x);
    const yDis = Math.abs(coordinate.y - y);
    return xDis * height + yDis * width < (width * height) / 2;
  },
  draw: (ctx, attrs, styles) => {
    const { x, y, width, height } = attrs;
    const {
      style = "fill",
      color = "currentColor",
      borderSize = 1,
      borderColor = "currentColor",
      borderStyle = "solid",
      borderDashedValue = [2, 2]
    } = styles;
    // 绘制填充的菱形
    if (style === "fill" || styles.style === "stroke_fill") {
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.moveTo(x - width / 2, y);
      ctx.lineTo(x, y - height / 2);
      ctx.lineTo(x + width / 2, y);
      ctx.lineTo(x, y + height / 2);
      ctx.closePath();
      ctx.fill();
    }
    // 绘制边框的菱形
    if (style === "stroke" || styles.style === "stroke_fill") {
      ctx.strokeStyle = borderColor;
      ctx.lineWidth = borderSize;
      if (borderStyle === "dashed") {
        ctx.setLineDash(borderDashedValue);
      } else {
        ctx.setLineDash([]);
      }
      ctx.beginPath();
      ctx.beginPath();
      ctx.moveTo(x - width / 2, y);
      ctx.lineTo(x, y - height / 2);
      ctx.lineTo(x + width / 2, y);
      ctx.lineTo(x, y + height / 2);
      ctx.closePath();
      ctx.stroke();
    }
  }
};
export default diamond;
