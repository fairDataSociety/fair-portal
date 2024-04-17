import { CssBaseline } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import AppLayout from "./components/AppLayout/AppLayout";
import { DappContextProvider } from "./context/DappContext";
import { LocalesContextProvider } from "./context/LocalesContext";
import { ThemeContextProvider } from "./context/ThemeContext";
import { WalletContextProvider } from "./context/WalletContext";
import Routes from "./routes/Routes";
import { MessageContextProvider } from "./context/MessageContext";

function App() {
  return (
    <BrowserRouter>
      <ThemeContextProvider>
        <LocalesContextProvider>
          <MessageContextProvider>
            <WalletContextProvider>
              <DappContextProvider>
                <CssBaseline />
                <AppLayout>
                  <Routes />
                </AppLayout>
              </DappContextProvider>
            </WalletContextProvider>
          </MessageContextProvider>
        </LocalesContextProvider>
      </ThemeContextProvider>
    </BrowserRouter>
  );
}

export default App;
