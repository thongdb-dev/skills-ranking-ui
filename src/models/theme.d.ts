import { ThemeOptions } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface TypeBackground {
    alt?: string; // Add the custom 'alt' property
  }

  interface Palette {
    neutral: {
      dark: string;
      main: string;
      mediumMain: string;
      medium: string;
      light: string;
    };
    background: TypeBackground;
  }

  interface PaletteOptions {
    neutral?: {
      dark: string;
      main: string;
      mediumMain: string;
      medium: string;
      light: string;
    };
    background?: Partial<TypeBackground>;
  }
}