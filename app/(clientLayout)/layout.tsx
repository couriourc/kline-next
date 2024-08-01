import type { ReactNode } from "react";
import React from "react";
import SwrInitor from "@/app/components/swr-initor";
import { EventEmitterContextProvider } from "@/app/context/event-emitter";
import { MantineProvider } from "@/app/context/mantine-context";
import { cx } from "@emotion/css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default function ({ children }: { children: ReactNode }) {
  return (
    <>
      <SwrInitor>
        <MantineProvider>
          <EventEmitterContextProvider>
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
            ></ToastContainer>
          </EventEmitterContextProvider>
        </MantineProvider>
      </SwrInitor>
    </>
  );
}
