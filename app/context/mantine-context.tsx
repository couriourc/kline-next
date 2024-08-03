"use client";
import { createTheme, MantineProvider as Provider } from "@mantine/core";
import type { PropsWithChildren } from "react";
import "./mantine-override.scss";
import { MantineContextMenuContext } from "@/app/context/plugins/mantine-context-menu-context";

const theme = createTheme({
  /** Put your mantine theme override here */
});

export function MantineProvider({ children }: PropsWithChildren) {
  return (
    <Provider theme={theme} defaultColorScheme="auto">
      <MantineContextMenuContext>{children}</MantineContextMenuContext>
    </Provider>
  );
}
