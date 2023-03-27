import { createTheme } from "@mui/material";
import { colors } from "./colors";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: colors.shadeDark2Night,
      light: colors.shadeDark1Night,
      dark: colors.shadeDark3Night,
    },
    secondary: {
      main: colors.shadeLight2Night,
      light: colors.shadeLight1Night,
      dark: colors.shadeLight3Night,
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
