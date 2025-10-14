'use client';

import React from 'react';
import { ReactLenis } from 'lenis/react';

export default function LenisProvider({ children }: { children: React.ReactNode }) {
  // ReactLenis must be used in a client component
  // pass options to ReactLenis if needed: <ReactLenis root options={{ lerp: 0.1 }}>
  return <ReactLenis root options={{ lerp: 0.05 }}>{children}</ReactLenis>;
}
