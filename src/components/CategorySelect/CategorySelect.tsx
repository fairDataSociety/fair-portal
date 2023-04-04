import React, { useState } from "react";
import intl from "react-intl-universal";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  SelectProps,
} from "@mui/material";
import { Category } from "../../model/Category";
import categories from "../../assets/data/categories.json";

export interface CategorySelectProps {
  defaultSubcategory: string;
}

const fieldStyles = {
  marginBottom: "20px",
};

const findCategoryBySubcategory = (
  subcategory: string
): Category | undefined => {
  return categories.find(({ subcategories }) =>
    subcategories.some((sc) => sc === subcategory)
  );
};

const CategorySelect = ({
  disabled,
  error,
  defaultSubcategory,
  ...props
}: SelectProps & CategorySelectProps) => {
  const [category, setCategory] = useState<Category | undefined>(
    findCategoryBySubcategory(defaultSubcategory)
  );
  const [subcategories, setSubcategories] = useState<string[]>(
    category?.subcategories || []
  );

  const onCategoryChange = (event: SelectChangeEvent) => {
    const name = event.target.value;

    const category = categories.find((c) => c.name === name);

    setCategory(category);
    setSubcategories(category?.subcategories || []);
  };

  return (
    <>
      <FormControl sx={fieldStyles} error={error && !category} fullWidth>
        <InputLabel>{intl.get("CATEGORY")}</InputLabel>
        <Select
          value={category?.name}
          onChange={onCategoryChange}
          autoWidth
          label={intl.get("CATEGORY")}
          disabled={disabled}
        >
          {categories.map(({ name }) => (
            <MenuItem key={name} value={name}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl
        fullWidth
        sx={fieldStyles}
        disabled={disabled || !category}
        error={error}
      >
        <InputLabel>{intl.get("SUBCATEGORY")}</InputLabel>
        <Select
          {...props}
          defaultValue={defaultSubcategory}
          error={error}
          autoWidth
          label={intl.get("SUBCATEGORY")}
        >
          {subcategories.map((subcategory) => (
            <MenuItem key={subcategory} value={subcategory}>
              {subcategory}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};

export default CategorySelect;
