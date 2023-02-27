import React from "react";
import DappGrid from "./DappGrid";
import { Container } from "@mui/material";
import Filters from "../../components/Filters/Filters";
import { useDappContext } from "../../context/DappContext";

export interface HomeProps {}

const Home = (props: HomeProps) => {
  const {
    filteredDapps,
    categories,
    filter,
    loading,
    onCategorySelect,
    onSubcategorySelect,
  } = useDappContext();
  return (
    <Container sx={{ display: "flex", margin: "20px auto" }}>
      <Filters
        categories={categories}
        selected={filter.category}
        onCategorySelect={onCategorySelect}
        onSubcategorySelect={onSubcategorySelect}
      />
      {loading ? null : <DappGrid dapps={filteredDapps} />}
    </Container>
  );
};

export default Home;
