import type { Viewport } from "next";
import BrowerInitor from "@components/browser-initor";
import Topbar from "@components/base/topbar";

import { PublicEnvScript } from "next-runtime-env";
import type { ReactNode } from "react";
import "./styles/globals.scss";
import { ColorSchemeScript } from "@mantine/core";
import { NEXT_PUBLIC_CHART_WEBSITE_NAME } from "@/config";

export const metadata = {
  title: NEXT_PUBLIC_CHART_WEBSITE_NAME
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
  userScalable: false
};

const LocaleLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang={"zh-Hans"} className="h-full">
      <head>
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <PublicEnvScript></PublicEnvScript>
        <ColorSchemeScript
          forceColorScheme={"dark"}
          defaultColorScheme="dark"
        />
      </head>
      <body className="h-full select-auto">
        <Topbar />
        <BrowerInitor>{children}</BrowerInitor>
      </body>
    </html>
  );
};

export default LocaleLayout;
