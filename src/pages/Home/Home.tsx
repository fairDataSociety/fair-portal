import React from "react";
import DappGrid from "./DappGrid";
import { Container } from "@mui/material";
import Filters from "../../components/Filters/Filters";
import { useDappContext } from "../../context/DappContext";

export interface HomeProps {}

const Home = (props: HomeProps) => {
  const { filteredDapps, categories, filter, loading, onCategorySelect } =
    useDappContext();
  return (
    <Container>
      <Filters
        categories={categories}
        selected={filter.categories}
        onClick={onCategorySelect}
      />
      {loading ? null : <DappGrid dapps={filteredDapps} />}
    </Container>
  );
};

export default Home;
