"use client";
import type { PropsWithChildren } from "react";
import {
  getCommandsByPosition,
  useSetupCommandsByPosition
} from "@lib/commands/register";
import { CommandPosition } from "@lib/commands";
import _ from "underscore";
import emitter from "@lib/hooks/use-event-emitter";
import "@lib/commands/command-initor";

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
