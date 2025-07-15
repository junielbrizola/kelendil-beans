'use client'

import * as React from 'react';
import { useColorScheme } from '@mui/material/styles';

interface Props {
  window?: () => Window;
  children?: React.ReactElement<{ elevation?: number, color: string }>;
}

export default function ElevateAppBar(props: Props) {

  const { mode, setMode } = useColorScheme()

  React.useEffect(() => {
    if (mode === 'system') setMode('light')
  }, [])

  return (
    <React.Fragment>
      {props.children}
    </React.Fragment>
  );
}
