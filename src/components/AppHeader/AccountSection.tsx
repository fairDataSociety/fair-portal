import React from "react";
import { styled } from "@mui/system";
import ConnectButton from "../ConnectButton/ConnectButton";

export const Wrapper = styled("div")({
  display: "flex",
  marginLeft: "auto",
});

const AccountSection = () => {
  return (
    <Wrapper>
      <ConnectButton />
    </Wrapper>
  );
};

export default AccountSection;
