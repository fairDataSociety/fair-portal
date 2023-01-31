import { CssBaseline } from "@mui/material";
import { HashRouter } from "react-router-dom";
import AppLayout from "./components/AppLayout/AppLayout";
import { DappContextProvider } from "./context/DappContext";
import { ThemeContextProvider } from "./context/ThemeContext";
import Routes from "./routes/Routes";

function App() {
  return (
    <HashRouter>
      <ThemeContextProvider>
        <DappContextProvider>
          <CssBaseline />
          <AppLayout>
            <Routes />
          </AppLayout>
        </DappContextProvider>
      </ThemeContextProvider>
    </HashRouter>
  );
}

export default App;
