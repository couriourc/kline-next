import { ContextMenuProvider } from "mantine-contextmenu";
import type { PropsWithChildren } from "react";
import "mantine-contextmenu/styles.css";
import "mantine-contextmenu/styles.layer.css";

export const MantineContextMenuContext = ({ children }: PropsWithChildren) => {
  return (
    <ContextMenuProvider borderRadius="md" shadow="md">
      {children}
    </ContextMenuProvider>
  );
};
