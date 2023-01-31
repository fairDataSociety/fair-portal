import React from "react";
import Done from "@mui/icons-material/Done";
import { Chip, Stack } from "@mui/material";

export interface FiltersProps {
  categories: string[];
  selected: string[];
  onClick: (category: string) => void;
}

const Filters = ({ categories, selected, onClick }: FiltersProps) => {
  const isSelected = (category: string) => selected.some((c) => c === category);

  return (
    <Stack
      direction="row"
      spacing={3}
      sx={{
        display: "flex",
        justifyContent: "center",
        margin: "20px",
        flexWrap: "wrap",
        gap: "12px",
      }}
    >
      {categories.map((category) => {
        const isCategorySelected = isSelected(category);
        return (
          <Chip
            label={category}
            key={category}
            onClick={() => onClick(category)}
            variant={isCategorySelected ? "filled" : "outlined"}
            icon={isCategorySelected ? <Done /> : undefined}
          />
        );
      })}
    </Stack>
  );
};

export default Filters;
