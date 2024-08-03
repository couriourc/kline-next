"use client";
import { createTheme, MantineProvider as Provider } from "@mantine/core";
import type { PropsWithChildren } from "react";
import "./mantine-override.scss";
import { MantineContextMenuContext } from "@/app/context/plugins/mantine-context-menu-context";
import { NavigationProgress } from "@mantine/nprogress";
import { Notifications } from "@mantine/notifications";

import "@mantine/core/styles/global.css";
import "@mantine/core/styles/AppShell.css";
import "@mantine/core/styles/AppShell.layer.css";
import "@mantine/core/styles/Avatar.css";
import "@mantine/core/styles/Avatar.layer.css";
import "@mantine/core/styles/ThemeIcon.css";
import "@mantine/core/styles/ThemeIcon.layer.css";
import "@mantine/core/styles/Flex.css";
import "@mantine/core/styles/Flex.layer.css";
import "@mantine/core/styles/ScrollArea.css";
import "@mantine/core/styles/ScrollArea.layer.css";
import "@mantine/core/styles/Input.css";
import "@mantine/core/styles/Input.layer.css";
import "@mantine/core/styles/List.css";
import "@mantine/core/styles/List.layer.css";
import "@mantine/core/styles/Stack.css";
import "@mantine/core/styles/Stack.layer.css";
import "@mantine/nprogress/styles.css";

const theme = createTheme({
  /** Put your mantine theme override here */
});

export function MantineProvider({ children }: PropsWithChildren) {
  return (
    <Provider theme={theme} defaultColorScheme="auto">
      <NavigationProgress />
      <Notifications />
      <MantineContextMenuContext>{children}</MantineContextMenuContext>
    </Provider>
  );
}
