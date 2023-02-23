import "@mui/material/styles/createPalette";
declare module "@mui/material/styles" {
  interface Palette {
    border: Palette["primary"];
    link: Palette["primary"];
  }
  interface PaletteOptions {
    border: PaletteOptions["primary"];
    link: PaletteOptions["primary"];
  }
}
