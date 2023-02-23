import React from "react";
import intl from "react-intl-universal";
import { styled } from "@mui/system";
import MetamaskConnect from "../MetamaskConnect/MetamaskConnect";
import { useWalletContext } from "../../context/WalletContext";
import { Button, CircularProgress } from "@mui/material";

export const Wrapper = styled("div")({
  display: "flex",
  marginLeft: "auto",
});

const AccountSection = () => {
  const { connected, loading, removeWallet } = useWalletContext();
  return (
    <Wrapper>
      {loading ? (
        <CircularProgress sx={{ margin: "8px 0 7px 0" }} />
      ) : connected ? (
        <Button
          variant="contained"
          size="small"
          color="secondary"
          onClick={removeWallet}
          sx={{ height: "34px", margin: "11px 0", fontWeight: "bold" }}
        >
          {intl.get("DISCONNECT")}
        </Button>
      ) : (
        <>
          <MetamaskConnect />
        </>
      )}
    </Wrapper>
  );
};

export default AccountSection;
