import React from "react";
import DappGrid from "./DappGrid";
import { Container, LinearProgress } from "@mui/material";
import Filters from "../../components/Filters/Filters";
import { useDappContext } from "../../context/DappContext";
import { useWalletContext } from "../../context/WalletContext";

export interface HomeProps {}

const Home = (props: HomeProps) => {
  const { connected, isValidator } = useWalletContext();
  const {
    filteredDapps,
    categories,
    filter,
    loading,
    onCategorySelect,
    onSubcategorySelect,
    onValidatedChange,
  } = useDappContext();
  return (
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
        onValidatedOnlyChange={
          connected && isValidator ? onValidatedChange : undefined
        }
      />
      {loading ? (
        <LinearProgress color="secondary" sx={{ width: "100%", mt: "50px" }} />
      ) : (
        <DappGrid dapps={filteredDapps} />
      )}
    </Container>
  );
};

export default Home;
