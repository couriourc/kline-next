"use client";

import { SWRConfig } from "swr";
import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { useRouter, useSearchParams } from "next/navigation";

type SwrInitorProps = {
  children: ReactNode;
};
const SwrInitor = ({ children }: SwrInitorProps) => {
  const searchParams = useSearchParams();
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
