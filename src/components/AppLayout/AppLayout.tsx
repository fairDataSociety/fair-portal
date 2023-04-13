import React from "react";
import { styled } from "@mui/system";
import AppHeader from "../AppHeader/AppHeader";
import Footer from "../Footer/Footer";
import { Container } from "@mui/material";
import Filters from "../Filters/Filters";
import { useWalletContext } from "../../context/WalletContext";
import { useDappContext } from "../../context/DappContext";

export interface AppLayoutProps {
  children: React.ReactNode;
}

export const Wrapper = styled("div")({
  width: "100%",
  display: "flex",
  flexDirection: "column",
});

const AppLayout = ({ children }: AppLayoutProps) => {
  const { connected, isValidator } = useWalletContext();
  const {
    categories,
    filter,
    onCategorySelect,
    onSubcategorySelect,
    onValidatedChange,
  } = useDappContext();

  return (
    <Wrapper>
      <AppHeader />
      <Container
        sx={{
          display: "flex",
          margin: "20px auto",
          flexDirection: { sm: "row", xs: "column" },
        }}
      >
        <Filters
          categories={categories}
          selected={filter.category}
          validatedOnly={filter.validatedOnly}
          onCategorySelect={onCategorySelect}
          onSubcategorySelect={onSubcategorySelect}
          onValidatedOnlyChange={connected ? onValidatedChange : undefined}
        />
        {children}
      </Container>
      <Footer />
    </Wrapper>
  );
};

export default AppLayout;
