"use client";

import { ReactLenis } from '@studio-freight/react-lenis';
import { ReactNode } from 'react';

export default function LenisProvider({ children }: { children: ReactNode }) {
  return (
    // @ts-ignore - mismatch between older lenis types and react 19 types
    <ReactLenis root options={{ lerp: 0.05, syncTouch: true, smoothWheel: true }}>
      {children as any}
    </ReactLenis>
  );
}
