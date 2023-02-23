import React from "react";
import intl from "react-intl-universal";
import { styled } from "@mui/system";
import { useWalletContext } from "../../context/WalletContext";
import RouteCodes from "../../routes/RouteCodes";
import HeaderLink from "./Link";

export const Wrapper = styled("div")({
  display: "flex",
  marginLeft: "auto",
});

const Links = () => {
  const { connected } = useWalletContext();
  return (
    <Wrapper>
      <HeaderLink to={RouteCodes.home}>{intl.get("STORE")}</HeaderLink>
      {connected && (
        <HeaderLink to={RouteCodes.registerDapp}>
          {intl.get("REGISTER")}
        </HeaderLink>
      )}
    </Wrapper>
  );
};

export default Links;
