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

const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <Wrapper>
      <AppHeader />
      {children}
    </Wrapper>
  );
};

export default AppLayout;
