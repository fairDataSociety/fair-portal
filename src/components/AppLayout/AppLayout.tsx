import React from "react";
import { styled } from "@mui/system";
import AppHeader from "../AppHeader/AppHeader";

export interface AppLayoutProps {
  children: React.ReactNode;
}

export const Wrapper = styled("div")({
  width: "100%",
  display: "flex",
  flexDirection: "column",
});

export const InnerWrapper = styled("div")(({ theme }) => ({
  width: "1200px",
  margin: "auto",
  [theme.breakpoints.down("lg")]: {
    width: "100%",
  },
}));

const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <Wrapper>
      <AppHeader />
      <InnerWrapper>{children}</InnerWrapper>
    </Wrapper>
  );
};

export default AppLayout;
