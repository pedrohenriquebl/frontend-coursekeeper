"use client";
import { PageLoader } from "@/components/ui/PageLoader";
import { createContext, useContext, useState } from "react";


const PageLoaderContext = createContext({
  show: () => {},
  hide: () => {},
});

export function usePageLoader() {
  return useContext(PageLoaderContext);
}

export function PageLoaderProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(false);

  const value = {
    show: () => setLoading(true),
    hide: () => setLoading(false),
  };

  return (
    <PageLoaderContext.Provider value={value}>
      {loading && <PageLoader />}
      {children}
    </PageLoaderContext.Provider>
  );
}
