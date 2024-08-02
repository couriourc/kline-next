"use client";
import type { ReactNode } from "react";
import SwrInitor from "@/app/components/swr-initor";
import { EventEmitterContextProvider } from "@/app/context/event-emitter";
import { MantineProvider } from "@/app/context/mantine-context";
import "react-toastify/dist/ReactToastify.css";
import { AppShell, Burger } from "@mantine/core";
import { ToastContainer } from "react-toastify";
import { cx } from "@emotion/css";

export default function ({ children }: { children: ReactNode }) {
  return (
    <>
      <SwrInitor>
        <MantineProvider>
          <EventEmitterContextProvider>
            <AppShell navbar={{ width: 200, breakpoint: "xl" }}>
              <AppShell.Header>
                <Burger hiddenFrom="sm" size="sm" />
                <div>Logo</div>
              </AppShell.Header>

              <AppShell.Navbar p="md"></AppShell.Navbar>

              <AppShell.Main>{children}</AppShell.Main>
            </AppShell>
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
            ></ToastContainer>
          </EventEmitterContextProvider>
        </MantineProvider>
      </SwrInitor>
    </>
  );
}
