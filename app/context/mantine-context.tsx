"use client";
import { createTheme, MantineProvider as Provider } from "@mantine/core";
import { PropsWithChildren } from "react";
import "./mantine-override.scss";
import "@mantine/core/styles.css";

const theme = createTheme({
  /** Put your mantine theme override here */
});

export function MantineProvider({ children }: PropsWithChildren) {
  return <Provider theme={theme}>{children}</Provider>;
}
