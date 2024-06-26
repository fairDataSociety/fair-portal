import React from "react";
import intl from "react-intl-universal";
import { ethers } from "ethers";
import { ButtonProps, Button, CircularProgress } from "@mui/material";
import { useWalletContext } from "../../context/WalletContext";
import { useMessageContext } from "../../context/MessageContext";

const ConnectButton = (props: ButtonProps) => {
  const { connected, loading, setWallet, removeWallet } = useWalletContext();
  const { setMessage } = useMessageContext();

  const connect = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(
        window.ethereum,
        "any"
      );
      await provider.send("eth_requestAccounts", []);
      const address = await provider.getSigner().getAddress();

      await setWallet(provider.getSigner(), address);
    } catch (error) {
      console.error(error);

      setMessage({
        text: intl.get("SWITCH_NETWORK", {
          network: import.meta.env.VITE_ENVIRONMENT,
        }),
        level: "warning",
      });
    }
  };

  if (loading) {
    return <CircularProgress sx={{ margin: "8px 0 7px 0" }} />;
  }

  return (
    <Button
      variant="contained"
      size="small"
      color={connected ? "secondary" : "primary"}
      onClick={connected ? removeWallet : connect}
      sx={{ height: "34px", margin: "11px 0", fontWeight: "bold" }}
    >
      {intl.get(connected ? "DISCONNECT" : "CONNECT")}
    </Button>
  );
};

export default ConnectButton;
