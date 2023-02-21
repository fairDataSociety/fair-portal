import { CssBaseline } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import AppLayout from "./components/AppLayout/AppLayout";
import { DappContextProvider } from "./context/DappContext";
import { LocalesContextProvider } from "./context/LocalesContext";
import { ThemeContextProvider } from "./context/ThemeContext";
import Routes from "./routes/Routes";

function App() {
  return (
    <BrowserRouter>
      <ThemeContextProvider>
        <LocalesContextProvider>
          <DappContextProvider>
            <CssBaseline />
            <AppLayout>
              <Routes />
            </AppLayout>
          </DappContextProvider>
        </LocalesContextProvider>
      </ThemeContextProvider>
    </BrowserRouter>
  );
}

export default App;
