import React from "react";
import { styled } from "@mui/system";
import AppHeader from "../AppHeader/AppHeader";
import Footer from "../Footer/Footer";
import { Container } from "@mui/material";
import Filters from "../Filters/Filters";
import { useDappContext } from "../../context/DappContext";
import Disclaimer from "../Disclaimer/Disclaimer";

export interface AppLayoutProps {
  children: React.ReactNode;
}

export const Wrapper = styled("div")({
  width: "100%",
  display: "flex",
  flexDirection: "column",
});

const AppLayout = ({ children }: AppLayoutProps) => {
  const {
    categories,
    filter,
    onCategorySelect,
    onSubcategorySelect,
    onValidatedChange,
  } = useDappContext();

  return (
    <Wrapper>
      <Disclaimer />
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
          onValidatedOnlyChange={onValidatedChange}
        />
        {children}
      </Container>
      <Footer />
    </Wrapper>
  );
};

export default AppLayout;
