import React from "react";
import { styled } from "@mui/system";
import { ethers } from "ethers";
import { IconButton, ButtonProps } from "@mui/material";
import MetamakLogo from "../../assets/images/MetaMask_Fox.svg";
import { useWalletContext } from "../../context/WalletContext";

const Logo = styled("img")({
  width: "40px",
});

const MetamaskConnect = (props: ButtonProps) => {
  const { setWallet } = useWalletContext();

  const connect = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    await provider.send("eth_requestAccounts", []);
    const address = await provider.getSigner().getAddress();

    setWallet(provider.getSigner(), address);
  };

  return (
    <IconButton {...props} disabled={!window.ethereum} onClick={connect}>
      <Logo src={MetamakLogo} />
    </IconButton>
  );
};

export default MetamaskConnect;
