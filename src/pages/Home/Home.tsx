import React from "react";
import DappGrid from "./DappGrid";
import { LinearProgress } from "@mui/material";
import { useDappContext } from "../../context/DappContext";

const Home = () => {
  const { filteredDapps, loading, onSearch } = useDappContext();
  return (
    <>
      {/* <Hidden mdUp>
        <SearchInput onChange={(e) => onSearch(e.target.value)} />
      </Hidden> */}
      {loading ? (
        <LinearProgress color="secondary" sx={{ width: "100%", mt: "50px" }} />
      ) : (
        <DappGrid dapps={filteredDapps} />
      )}
    </>
  );
};

export default Home;
