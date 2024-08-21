"use client";

import { SWRConfig } from "swr";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";

type SwrInitorProps = {
  children: ReactNode;
};
const SwrInitor = ({ children }: SwrInitorProps) => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    setInit(true);
  }, []);
  if (!init) return null;
  return (
    <SWRConfig
      value={{
        shouldRetryOnError: false,
        revalidateOnFocus: false
      }}
    >
      {children}
    </SWRConfig>
  );
};

export default SwrInitor;
