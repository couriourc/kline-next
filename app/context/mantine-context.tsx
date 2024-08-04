"use client";
import {
  createTheme,
  localStorageColorSchemeManager,
  MantineProvider as Provider
} from "@mantine/core";
import type { PropsWithChildren } from "react";
import "./mantine-override.scss";
import { NavigationProgress } from "@mantine/nprogress";
import { Notifications } from "@mantine/notifications";
// 基本样式
import "@mantine/core/styles/global.css";
import "@mantine/core/styles/AppShell.css";
import "@mantine/core/styles/Avatar.css";
import "@mantine/core/styles/ThemeIcon.css";
import "@mantine/core/styles/Flex.css";
import "@mantine/core/styles/ScrollArea.css";
import "@mantine/core/styles/Input.css";
import "@mantine/core/styles/List.css";
import "@mantine/core/styles/Stack.css";
import "@mantine/core/styles/Container.css";
import "@mantine/core/styles/Table.css";
import "@mantine/core/styles/Group.css";
import "@mantine/core/styles/Kbd.css";
import "@mantine/core/styles/Popover.css";
import "@mantine/core/styles/Text.css";
import "@mantine/core/styles/Menu.css";
import "@mantine/core/styles/UnstyledButton.css";
import "@mantine/core/styles/Badge.css";
import "@mantine/core/styles/Loader.css";
import "@mantine/core/styles/Blockquote.css";
import "@mantine/core/styles/ActionIcon.css";
import "@mantine/core/styles/Tooltip.css";
// 布局样式
import "@mantine/core/styles/global.layer.css";
import "@mantine/core/styles/AppShell.layer.css";
import "@mantine/core/styles/Avatar.layer.css";
import "@mantine/core/styles/ThemeIcon.layer.css";
import "@mantine/core/styles/Flex.layer.css";
import "@mantine/core/styles/ScrollArea.layer.css";
import "@mantine/core/styles/Input.layer.css";
import "@mantine/core/styles/List.layer.css";
import "@mantine/core/styles/Stack.layer.css";
import "@mantine/core/styles/Container.layer.css";
import "@mantine/core/styles/Table.layer.css";
import "@mantine/core/styles/Group.layer.css";
import "@mantine/core/styles/Kbd.layer.css";
import "@mantine/core/styles/Popover.layer.css";
import "@mantine/core/styles/Text.layer.css";
import "@mantine/core/styles/Menu.layer.css";
import "@mantine/core/styles/UnstyledButton.layer.css";
import "@mantine/core/styles/Badge.layer.css";
import "@mantine/core/styles/Loader.layer.css";
import "@mantine/core/styles/Blockquote.layer.css";
import "@mantine/core/styles/ActionIcon.layer.css";
import "@mantine/core/styles/Tooltip.layer.css";

// 插件样式
import "@mantine/nprogress/styles.css";
import { ContextMenus } from "@/app/components/ui/ContextMenu";

const theme = createTheme({});

const colorSchemeManager = localStorageColorSchemeManager({
  key: "theme-color-scheme"
});
export function MantineProvider({ children }: PropsWithChildren) {
  return (
    <Provider
      theme={theme}
      withCssVariables
      withGlobalClasses
      withStaticClasses
      defaultColorScheme="dark"
      colorSchemeManager={colorSchemeManager}
      cssVariablesSelector="html"
      deduplicateCssVariables={false}
    >
      <NavigationProgress />
      <Notifications />
      {children}
      <ContextMenus />
    </Provider>
  );
}
