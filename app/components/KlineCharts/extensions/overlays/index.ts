import arrow from "./arrow";

import circle from "./circle";
import rect from "./rect";
import parallelogram from "./parallelogram";
import triangle from "./triangle";
import fibonacciCircle from "./fibonacciCircle";
import fibonacciSegment from "./fibonacciSegment";
import fibonacciSpiral from "./fibonacciSpiral";
import fibonacciSpeedResistanceFan from "./fibonacciSpeedResistanceFan";
import fibonacciExtension from "./fibonacciExtension";
import gannBox from "./gannBox";
import threeWaves from "./threeWaves";
import fiveWaves from "./fiveWaves";
import eightWaves from "./eightWaves";
import anyWaves from "./anyWaves";
import abcd from "./abcd";
import xabcd from "./xabcd";
import textInput from "./textInput";

const overlays = [
  arrow,
  circle,
  rect,
  triangle,
  parallelogram,
  fibonacciCircle,
  fibonacciSegment,
  fibonacciSpiral,
  fibonacciSpeedResistanceFan,
  fibonacciExtension,
  gannBox,
  threeWaves,
  fiveWaves,
  eightWaves,
  anyWaves,
  abcd,
  xabcd,
  textInput
];
export const OVERLAYS_DESCRIPTIONS = {
  arrow: {
    name: "箭头",
    desc: "xxx"
  },
  circle: {
    name: "圆",
    desc: "xxx"
  },
  rect: { name: "rect" },
  triangle: { name: "triangle" },
  parallelogram: { name: "parallelogram" },
  fibonacciCircle: { name: "fibonacciCircle" },
  fibonacciSegment: { name: "fibonacciSegment" },
  fibonacciSpiral: { name: "fibonacciSpiral" },
  fibonacciSpeedResistanceFan: { name: "fibonacciSpeedResistanceFan" },
  fibonacciExtension: { name: "fibonacciExtension" },
  gannBox: { name: "gannBox" },
  threeWaves: { name: "threeWaves" },
  fiveWaves: { name: "fiveWaves" },
  eightWaves: { name: "eightWaves" },
  anyWaves: { name: "anyWaves" },
  abcd: { name: "abcd" },
  xabcd: { name: "xabcd" },
  default: { name: "default" },
  textInput: { name: "文本" }
};
export default overlays;
