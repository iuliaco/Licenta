import { createTheme as createMuiTheme } from '@mui/material';
import { createComponents } from '@/theme/create-components';
import { createShadows } from '@/theme/create-shadows';
import { createTypography } from '@/theme/create-typography';
import { createPalette } from '@/theme/create-palette';

export function createTheme() {
  const shadows = createShadows();
  const palette = createPalette();
  const components = createComponents({ palette });
  const typography = createTypography();

  return createMuiTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 900,
        lg: 1200,
        xl: 1440
      }
    },
    components,
    palette,
    shadows,
    shape: {
      borderRadius: 8
    },
    typography
  });
}