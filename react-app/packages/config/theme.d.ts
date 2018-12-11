export interface GrayScale {
  G0: string;
  G1: string;
  G2: string;
  G3: string;
  G4: string;
}

interface ColorType {
  light: string;
  main: string;
  dark: string;
  contrastText: string;
}

export interface Palette {
  primary: ColorType;
  secondary: ColorType;
  error: ColorType;
  gray: GrayScale;
}

export interface TypographyElement {
  color: string;
  fontWeight: number;
  fontSize: string;
  lineHeight: number;
  letterSpacing: string;
}

export interface Typography {
  fontFamily: string;
  p: TypographyElement;
  label: TypographyElement;
  h1: TypographyElement;
  h2: TypographyElement;
  h3: TypographyElement;
  h4: TypographyElement;
  h5: TypographyElement;
  h6: TypographyElement;
}

export interface Theme {
  palette: Palette;
  typography: Typography;
  spacings: number[];
}
