"use client";
import type { PropsWithChildren } from "react";
import {
  getCommandsByPosition,
  useSetupCommandsByPosition
} from "@/app/commands/register";
import { CommandPosition } from "@/app/commands";
import _ from "underscore";
import emitter from "@/app/hooks/use-event-emitter";
import "./base/command-initor";

// 监听后台任务
getCommandsByPosition(CommandPosition.Background)
  .filter((command) => command.listen)
  .map((item) => {
    const listen = _.isString(item.listen) ? [item.listen] : item.listen!;
    listen.forEach((listenItem) => {
      emitter.on(listenItem, (...args) => item.executor?.(...args));
    });
  });
const CommandInitor = ({ children }: PropsWithChildren) => {
  useSetupCommandsByPosition(CommandPosition.Background);

  return <>{children}</>;
};

export default CommandInitor;
