"use client";
import {
  Button,
  createTheme,
  Input,
  MantineProvider as Provider,
  TextInput
} from "@mantine/core";
import { PropsWithChildren } from "react";
import cn from "classnames";
import "./mantine-override.scss";

const theme = createTheme({
  /** Put your mantine theme override here */
});

export function MantineProvider({ children }: PropsWithChildren) {
  return <Provider theme={theme}>{children}</Provider>;
}
