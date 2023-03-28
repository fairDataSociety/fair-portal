import { createTheme } from "@mui/material";
import { colors } from "./colors";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: colors.shadeLight3Night,
      light: colors.shadeLight3Night,
      dark: colors.shadeDark3Night,
      contrastText: colors.shadeLight1Night,
    },
    secondary: {
      main: colors.shadeLight3Night,
      light: colors.shadeLight2Night,
      dark: colors.shadeDark2Night,
    },
    border: {
      main: "#ddd",
    },
    link: {
      main: "#333",
      dark: "#888",
    },
  },
});

export default darkTheme;
