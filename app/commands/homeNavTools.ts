"use client";
import Router from "next/router";
import type { ExecutionMenuItem } from "@/app/components/ui/ContextMenu/types";
import { executeCommand } from "@/app/hooks/use-event-emitter";
import { OverlayMode } from "couriourc-klinecharts";

export const singleLineTool: ExecutionMenuItem = {
  label: "",
  key: "singleLine",
  icon: "i-material-symbols-light-line-end [&.active]:text-blue",
  command: "singleLine",
  onChildExecute: (child) => {
    executeCommand("chart:command:creator", {
      params: {
        search: "",
        command: child.key
      }
    });
  },
  children: [
    {
      description: "horizontalStraightLine",
      label: "horizontalStraightLine",
      key: "horizontalStraightLine",
      icon: "i-material-symbols-light-line-curve"
    },
    {
      description: "horizontalRayLine",
      label: "horizontalRayLine",
      key: "horizontalRayLine",
      icon: "i-material-symbols-light-data-array-rounded"
    },
    {
      description: "horizontalSegment",
      label: "horizontalSegment",
      key: "horizontalSegment",
      icon: "i-mdi-segment"
    },
    {
      description: "verticalStraightLine",
      label: "verticalStraightLine",
      key: "verticalStraightLine"
    },
    {
      description: "verticalRayLine",
      label: "verticalRayLine",
      key: "verticalRayLine"
    },
    {
      description: "verticalSegment",
      label: "verticalSegment",
      key: "verticalSegment"
    },
    { description: "straightLine", label: "straightLine", key: "straightLine" },
    { description: "rayLine", label: "rayLine", key: "rayLine" },
    { description: "segment", label: "segment", key: "segment" },
    { description: "arrow", label: "arrow", key: "arrow" },
    { description: "priceLine", label: "priceLine", key: "priceLine" }
  ]
};
export const moreLineTool: ExecutionMenuItem = {
  label: "",
  key: "moreLine",
  icon: "i-material-symbols-light-line-weight [&.active]:text-blue",
  command: "moreLine",
  onChildExecute: (child) => {
    executeCommand("chart:command:creator", {
      params: {
        search: "",
        command: child.key
      }
    });
  },
  children: [
    {
      description: "priceChannelLine",
      key: "priceChannelLine",
      label: "priceChannelLine"
    },
    {
      description: "parallelStraightLine",
      key: "parallelStraightLine",
      label: "parallelStraightLine"
    }
  ]
};
export const polyTool: ExecutionMenuItem = {
  label: "",
  key: "polygon",
  icon: "i-mdi-vector-polygon [&.active]:text-blue",
  command: "polygon",
  onChildExecute: (child) => {
    executeCommand("chart:command:creator", {
      params: {
        search: "",
        command: child.key
      }
    });
  },
  children: [
    { description: "circle", key: "circle", label: "circle" },
    { description: "rect", key: "rect", label: "rect" },
    {
      description: "parallelogram",
      key: "parallelogram",
      label: "parallelogram"
    },
    { description: "triangle", key: "triangle", label: "triangle" }
  ]
};

export const fibonacciTool: ExecutionMenuItem = {
  label: "",
  key: "fibonacci",
  icon: "i-mdi-math-integral [&.active]:text-blue",
  command: "fibonacci",
  onChildExecute: (child) => {
    executeCommand("chart:command:creator", {
      params: {
        search: "",
        command: child.key
      }
    });
  },
  children: [
    {
      description: "fibonacciLine",
      key: "fibonacciLine",
      label: "fibonacciLine"
    },
    {
      description: "fibonacciSegment",
      key: "fibonacciSegment",
      label: "fibonacciSegment"
    },
    {
      description: "fibonacciCircle",
      key: "fibonacciCircle",
      label: "fibonacciCircle"
    },
    {
      description: "fibonacciSpiral",
      key: "fibonacciSpiral",
      label: "fibonacciSpiral"
    },
    {
      description: "fibonacciSpeedResistanceFan",
      key: "fibonacciSpeedResistanceFan",
      label: "fibonacciSpeedResistanceFan"
    },
    {
      description: "fibonacciExtension",
      key: "fibonacciExtension",
      label: "fibonacciExtension"
    },
    { description: "gannBox", key: "gannBox", label: "gannBox" }
  ]
};

export const waveTool: ExecutionMenuItem = {
  label: "",
  key: "wave",
  icon: "i-mdi-sine-wave [&.active]:text-blue",
  command: "wave",
  onChildExecute: (child) => {
    executeCommand("chart:command:creator", {
      params: {
        search: "",
        command: child.key
      }
    });
  },
  children: [
    { key: "xabcd", label: "xabcd", description: "xabcd" },
    { key: "abcd", label: "abcd", description: "abcd" },
    { key: "threeWaves", label: "threeWaves", description: "threeWaves" },
    { key: "fiveWaves", label: "fiveWaves", description: "fiveWaves" },
    { key: "eightWaves", label: "eightWaves", description: "eightWaves" },
    { key: "anyWaves", label: "anyWaves", description: "anyWaves" }
  ]
};

export const textTool: ExecutionMenuItem = {
  label: "添加文本",
  description: "添加标记文本",
  icon: "i-material-symbols-light-text-fields ",
  key: "add-text",
  command: "createTextOverlay",
  shortcuts: "t",
  executor() {
    executeCommand("chart:command:creator", {
      params: {
        search: "",
        command: "textInput"
      }
    });
  }
};
export const homeNavTools: ExecutionMenuItem[] = [
  {
    label: "磁吸",
    description: "磁吸",
    icon: "i-mdi-magnet ",
    key: "change-magnet",
    command: "changeMagnet",
    executor() {
      executeCommand("chart:command:magnet", OverlayMode.StrongMagnet);
    }
  },
  {
    label: "锁定",
    description: "锁定所有绘图",
    icon: "i-[mdi--lock-open-outline]",
    key: "change-lock",
    command: "changeMagnet",
    executor() {
      executeCommand("chart:command:magnet", OverlayMode.StrongMagnet);
    }
  },
  {
    label: "隐藏",
    description: "隐藏绘图",
    icon: "i-mdi-eye",
    key: "change-eye",
    command: "changeVisible",
    executor() {
      executeCommand("chart:command:visible");
    }
  },
  {
    label: "层级",
    description: "层级",
    icon: "i-[material-symbols-light--layers-outline-rounded]",
    key: "change-layers",
    command: "changeLayers",
    executor() {
      Router.push("/layers");
    }
  }
];
