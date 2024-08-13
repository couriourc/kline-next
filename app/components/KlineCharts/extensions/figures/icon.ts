import type { Figure } from "couriourc-klinecharts";

const icon: Figure = {
  name: "icon",
  checkEventOn: (coordinate, attrs) => {
    const { x, y, width, height } = attrs;
    const xDis = Math.abs(coordinate.x - x);
    const yDis = Math.abs(coordinate.y - y);
    return xDis * height + yDis * width < (width * height) / 2;
  },
  draw: (ctx, attrs, styles) => {}
};
export default icon;
