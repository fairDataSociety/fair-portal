import React from "react";
import intl from "react-intl-universal";
import { styled } from "@mui/system";
import { useWalletContext } from "../../context/WalletContext";
import RouteCodes from "../../routes/RouteCodes";
import HeaderLink from "./Link";

export const Wrapper = styled("div")({
  display: "flex",
  marginLeft: "10px",
});

const Links = () => {
  const { connected } = useWalletContext();
  return (
    <Wrapper>
      {connected && (
        <HeaderLink to={RouteCodes.registerDapp}>
          {intl.get("REGISTER_YOUR_DAPP")}
        </HeaderLink>
      )}
    </Wrapper>
  );
};

export default Links;
