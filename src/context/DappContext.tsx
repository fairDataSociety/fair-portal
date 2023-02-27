import React, { useEffect, useState } from "react";
import { createContext, useContext } from "react";
import { Dapp } from "../model/Dapp";
import { getDapps } from "../storage/dapp-registry";
import categories from "../assets/data/categories.json";
import { Category } from "../model/Category";

export interface DappFilters {
  search: string;
  category: Category | null;
}

export interface DappContext {
  allDapps: Dapp[];
  filteredDapps: Dapp[];
  categories: Category[];
  loading: boolean;
  filter: DappFilters;
  onCategorySelect: (category: Category | null) => void;
  onSubcategorySelect: (subcateogory: string) => void;
  onSearch: (search: string) => void;
}

const DappContext = createContext<DappContext>({
  allDapps: [],
  filteredDapps: [],
  categories,
  loading: true,
  filter: {
    search: "",
    category: null,
  },
  onCategorySelect: (category: Category | null) => {},
  onSubcategorySelect: (subcateogory: string) => {},
  onSearch: (search: string) => {},
});

export const useDappContext = () => useContext(DappContext);

export interface DappContextProviderProps {
  children: React.ReactNode;
}

export const DappContextProvider = ({ children }: DappContextProviderProps) => {
  const [allDapps, setAllDapps] = useState<Dapp[]>([]);
  const [filteredDapps, setFilteredDapps] = useState<Dapp[]>([]);
  const [filter, setFilter] = useState<DappFilters>({
    search: "",
    category: null,
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadDapps = async () => {
    try {
      // TODO Add pagination
      const dapps = await getDapps(0, 100);
      setAllDapps(dapps);
      setFilteredDapps(dapps);
    } catch (error) {
      console.error(error);
      setError(String(error));
    } finally {
      setLoading(false);
    }
  };

  const onCategorySelect = (category: Category | null) => {
    const filterCategory =
      category === null
        ? null
        : {
            ...category,
            subcategories: [...category.subcategories],
          };
    setFilter({
      ...filter,
      category: filterCategory,
    });
  };

  const onSubcategorySelect = (subcategory: string) => {
    const category = { ...(filter.category as Category) };
    category.subcategories = [...category.subcategories];

    const index = category.subcategories.indexOf(subcategory);

    if (index >= 0) {
      category.subcategories.splice(index, 1);
    } else {
      category.subcategories.push(subcategory);
    }

    setFilter({
      ...filter,
      category,
    });
  };

  const onSearch = (search: string) => {
    setFilter({
      ...filter,
      search,
    });
  };

  const filterDapps = () => {
    const { search, category } = filter;

    const filteredDapps = allDapps
      .filter((dapp) => dapp.name.indexOf(search) > -1)
      .filter(
        (dapp) =>
          !category ||
          (dapp.category == category.name &&
            dapp.subcategories.some((subcategory) =>
              category.subcategories.includes(subcategory)
            ))
      );

    setFilteredDapps(filteredDapps);
  };

  useEffect(() => {
    filterDapps();
  }, [filter]);

  useEffect(() => {
    loadDapps();
  }, []);

  return (
    <DappContext.Provider
      value={{
        allDapps,
        filteredDapps,
        categories,
        filter,
        loading,
        onCategorySelect,
        onSubcategorySelect,
        onSearch,
      }}
    >
      {children}
    </DappContext.Provider>
  );
};
