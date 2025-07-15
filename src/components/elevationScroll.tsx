'use client'

import * as React from 'react'
import { useScrollTrigger } from "@mui/material";

interface Props {
  window?: () => Window;
  children?: React.ReactElement<{ elevation?: number, color: string }>;
}

export function ElevationScroll(props: Props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return children
    ? React.cloneElement(children, {
        elevation: trigger ? 4 : 0,
      })
    : null;
}