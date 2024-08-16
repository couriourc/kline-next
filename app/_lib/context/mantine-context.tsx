"use client";
import {
  createTheme,
  localStorageColorSchemeManager,
  MantineProvider as Provider
} from "@mantine/core";
import type { PropsWithChildren } from "react";
import "@/app/_styles/mantine-override.scss";
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
import "@mantine/core/styles/Paper.css";
import "@mantine/core/styles/SimpleGrid.css";
import "@mantine/core/styles/Fieldset.css";
import "@mantine/core/styles/Divider.css";
import "@mantine/core/styles/Button.css";
import "@mantine/core/styles/Switch.css";
import "@mantine/core/styles/ModalBase.css";
import "@mantine/core/styles/Modal.css";
import "@mantine/core/styles/Combobox.css";
import "@mantine/core/styles/CloseButton.css";
import "@mantine/core/styles/Overlay.css";
import "@mantine/core/styles/Burger.css";
import "@mantine/core/styles/Tabs.css";
// 布局样式
// 插件样式
import "@mantine/nprogress/styles.css";
import { ContextMenus } from "@components/ui/ContextMenu";

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
