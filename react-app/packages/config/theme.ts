import { Palette, Typography, ColorType, GrayScale } from "./theme.d";

const primary: ColorType = {
  light: "#7986cb",
  main: "#3f51b5",
  dark: "#303f9f",
  contrastText: "#fff"
};

const secondary: ColorType = {
  light: "#ff4081",
  main: "#f50057",
  dark: "#c51162",
  contrastText: "#fff"
};

const error: ColorType = {
  light: "#e57373",
  main: "#f44336",
  dark: "#d32f2f",
  contrastText: "#fff"
};

const gray: GrayScale = {
  G0: "#616161",
  G1: "#aaaaaa",
  G2: "#424242",
  G3: "#9e9e9e",
  G4: "#ffffff"
};

const palette: Palette = {
  primary,
  secondary,
  error,
  gray
};

const typography: Typography = {
  fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif"`,
  h1: {
    color: "rgba(0, 0, 0, 0.87)",
    fontWeight: 300,
    fontSize: "6rem",
    lineHeight: 1,
    letterSpacing: "-0.01562em"
  },
  h2: {
    color: "rgba(0, 0, 0, 0.87)",
    fontWeight: 300,
    fontSize: "3.75rem",
    lineHeight: 1,
    letterSpacing: "-0.00833em"
  },
  h3: {
    color: "rgba(0, 0, 0, 0.87)",
    fontWeight: 400,
    fontSize: "3rem",
    lineHeight: 1.04,
    letterSpacing: "0em"
  },
  h4: {
    color: "rgba(0, 0, 0, 0.87)",
    fontWeight: 400,
    fontSize: "2.125rem",
    lineHeight: 1.17,
    letterSpacing: "0.00735em"
  },
  h5: {
    color: "rgba(0, 0, 0, 0.87)",
    fontWeight: 400,
    fontSize: "1.5rem",
    lineHeight: 1.33,
    letterSpacing: "0em"
  },
  h6: {
    color: "rgba(0, 0, 0, 0.87)",
    fontWeight: 500,
    fontSize: "1.25rem",
    lineHeight: 1.6,
    letterSpacing: "0.0075em"
  },
  label: {
    fontSize: "0.875rem",
    fontWeight: 400,
    letterSpacing: "1.46429em",
    lineHeight: 1,
    color: "rgba(0, 0, 0, 0.87)"
  },
  p: {
    fontSize: "0.875rem",
    fontWeight: 500,
    letterSpacing: "1.71429em",
    lineHeight: 1,
    color: "rgba(0, 0, 0, 0.87)"
  }
};

export const Theme = {
  palette,
  typography,
  spacings: [0, 8, 16, 24, 32, 44]
};
