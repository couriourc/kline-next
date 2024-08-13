"use client";
import { KlineChartModule } from "./core";
import type { OverlayCreate } from "couriourc-klinecharts";
import _ from "underscore";
import { removeDrawStore } from "./stateFn/store";
import type { ICommands } from "./types";
import { makeAttributes } from "@/app/components/KlineCharts/utils/makeAttributes";

const klineChartInstance = KlineChartModule();

function arrifyOverlay<T>(target: T | T[]): T[] {
  return _.isArray(target) ? target : [target];
}

type OverlayCreatorOverrid = OverlayCreate & {
  setup: boolean;
};
const createOverlay: ICommands["createOverlay"] = (overlayCreator, paneId) => {
  const wrapperOverlayFunction = (nameOrOption: string | OverlayCreate) => {
    // wrap option
    const option: OverlayCreatorOverrid = {
      setup: false
    } as OverlayCreatorOverrid;
    if (_.isString(nameOrOption)) {
      option.name = nameOrOption;
    } else {
      Object.assign(option, nameOrOption);
    }
    // 内置信息
    option.extendData = makeAttributes();
    option.id = option.extendData.id;
    (
      [
        "onDrawStart",
        "onDrawing",
        "onDrawEnd",
        "onClick",
        "onDoubleClick",
        "onRightClick",
        "onPressedMoveStart",
        "onPressedMoving",
        "onPressedMoveEnd",
        "onMouseEnter",
        "onMouseLeave",
        "onRemoved",
        "onSelected",
        "onDeselected"
      ] as const
    ).forEach((fnName) => {
      const fn = option[fnName];
      // turn all events into function that emits the corresponding event to the chart instance
      option[fnName] = (...args) => {
        const overlay = args[0].overlay;
        klineChartInstance.emitter.emit(`overlay:${fnName}`, args[0]);
        return !!fn?.(...args);
      };

      switch (fnName) {
        case "onRightClick":
          option[fnName] = (...args) => {
            const event = args[0];
            // cancel right click event to customize contextmenu
            event.preventDefault?.();
            fn?.(...args);
            return true;
          };
          break;
        case "onRemoved":
          option[fnName] = (...args) => {
            const overlay = args[0].overlay;
            klineChartInstance.emitter.emit("overlay:removed", overlay);
            removeDrawStore([overlay.extendData]);
            fn?.(...args);
            return true;
          };
          break;
        default:
          break;
      }
    });
    return option as OverlayCreate;
  };
  const wrapperOverlayCreator = arrifyOverlay(overlayCreator).map(
    wrapperOverlayFunction
  );
  const overlayIds: string[] = klineChartInstance.chart.createOverlay(
    wrapperOverlayCreator,
    paneId
  ) as string[];
  // attach overlay_id
  wrapperOverlayCreator.forEach((item, id) => {
    item.extendData.overlay_id = overlayIds[id]! as string;
    return item.extendData;
  });
  console.log(`[🪪]wrapperOverlayCreator-->`, wrapperOverlayCreator);

  // 创建覆层
  //  klineChartInstance.emitter.emit(
  //    `overlay:${LifeCycle.}`,
  //    wrapperOverlayCreator.map((item) => item.extendData)
  //  );
  // 获取
  return overlayIds;
};
const removeOverlay: ICommands["removeOverlay"] = (args) => {
  console.log(`[🪪]args-->`, args);

  KlineChartModule().chart.removeOverlay(args);
};
const getOverlayByIds: ICommands["getOverlayByIds"] = (...args) => {
  const overlayIds = arrifyOverlay(args[0]);
  return overlayIds.map((idOrOption) => {
    if (_.isString(idOrOption)) {
      return klineChartInstance.chart.getOverlayById(idOrOption);
    }
    return klineChartInstance.chart.getOverlayById(idOrOption.id!);
  });
};
const overrideOverlay: ICommands["overrideOverlay"] = (...args) =>
  klineChartInstance.chart.overrideOverlay(...args);
const resize: ICommands["resize"] = () => {
  return klineChartInstance.chart?.resize();
};
const commands: ICommands = {
  createOverlay,
  removeOverlay,
  getOverlayByIds,
  resize,
  overrideOverlay
};

export function executeChartCommand<T extends keyof ICommands>(
  type: T,
  ...args: ICommands[T] extends (...args: infer P) => any ? P : never[]
): void {
  klineChartInstance.emitter.emit("command:setup", {
    type,
    args
  });
  /*@ts-ignore*/
  return commands[type as keyof ICommands](...args);
}
