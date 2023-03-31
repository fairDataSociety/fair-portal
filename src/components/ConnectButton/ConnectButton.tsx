import React from "react";
import intl from "react-intl-universal";
import { ethers } from "ethers";
import { ButtonProps, Button, CircularProgress } from "@mui/material";
import { useWalletContext } from "../../context/WalletContext";

const ConnectButton = (props: ButtonProps) => {
  const { connected, loading, setWallet, removeWallet } = useWalletContext();

  const connect = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    await provider.send("eth_requestAccounts", []);
    const address = await provider.getSigner().getAddress();

    setWallet(provider.getSigner(), address);
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
