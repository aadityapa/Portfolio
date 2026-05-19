"use client";

import dynamic from "next/dynamic";
import { SmoothScroll } from "./SmoothScroll";

const CustomCursor = dynamic(
  () => import("@/components/cursor/CustomCursor").then((m) => m.CustomCursor),
  { ssr: false }
);

const PageLoader = dynamic(
  () => import("@/components/layout/PageLoader").then((m) => m.PageLoader),
  { ssr: false }
);

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SmoothScroll>
      <PageLoader />
      <CustomCursor />
      {children}
    </SmoothScroll>
  );
}
