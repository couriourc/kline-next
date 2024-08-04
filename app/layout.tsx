import type { Viewport } from "next";
import BrowerInitor from "./components/browser-initor";
import Topbar from "./components/base/topbar";

import { PublicEnvScript } from "next-runtime-env";
import type { ReactNode } from "react";
import "./styles/globals.css";
import { ColorSchemeScript } from "@mantine/core";

export const metadata = {
  title: ""
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
        <meta name="theme-color" content="#FFFFFF" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <title></title>
        <PublicEnvScript></PublicEnvScript>
        <ColorSchemeScript />
        <script src={"/config.js"}></script>
      </head>
      <body className="h-full select-auto">
        <Topbar />
        <BrowerInitor>{children}</BrowerInitor>
      </body>
    </html>
  );
};

export default LocaleLayout;
