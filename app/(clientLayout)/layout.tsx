"use client";
import type { ReactNode } from "react";
import SwrInitor from "@/app/components/swr-initor";
import { MantineProvider } from "@/app/context/mantine-context";
import "react-toastify/dist/ReactToastify.css";
import { AppShell, rem } from "@mantine/core";
import { ToastContainer } from "react-toastify";
import { cx } from "@emotion/css";
import { HomeHeader } from "@/app/components/page/home/HomeHeader";
import CommandInitor from "@/app/components/command-initor";
import KlineChartsInitor from "@/app/components/kline-initor";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export default function ({ children }: { children: ReactNode }) {
  return (
    <>
      <SwrInitor>
        <CommandInitor>
          <MantineProvider>
            <KlineChartsInitor>
              <DndProvider backend={HTML5Backend}>
                <AppShell
                  layout="default"
                  header={{
                    height: {
                      base: rem(48)
                    }
                  }}
                >
                  <HomeHeader />
                  <AppShell.Main h={"100vh"} className={"pb-[48px]"}>
                    {children}
                    <ToastContainer
                      position="top-center"
                      newestOnTop={true}
                      progressClassName={cx("hidden")}
                      theme={"dark"}
                      closeButton={false}
                      autoClose={1000}
                      containerId={"global"}
                      hideProgressBar={true}
                      className={cx(
                        `[--toastify-color-dark:#2F403A] [--toastify-color-progress-bgo:0] [--toastify-toast-min-height:initial] [--toastify-toast-width:auto]`
                      )}
                    />
                  </AppShell.Main>
                </AppShell>
              </DndProvider>
            </KlineChartsInitor>
          </MantineProvider>
        </CommandInitor>
      </SwrInitor>
    </>
  );
}
