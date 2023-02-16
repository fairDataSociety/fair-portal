import React, { useEffect, useState } from "react";
import { createContext, useContext } from "react";
import { Dapp } from "../model/Dapp";
import { getDapps } from "../storage/dapp-registry";

// TODO will be dynamic
const categories = ["Text editing", "Media", "Privacy"];

export interface DappFilters {
  search: string;
  categories: string[];
}

export interface DappContext {
  allDapps: Dapp[];
  filteredDapps: Dapp[];
  categories: string[];
  loading: boolean;
  filter: DappFilters;
  onCategorySelect: (category: string) => void;
  onSearch: (search: string) => void;
}

const DappContext = createContext<DappContext>({
  allDapps: [],
  filteredDapps: [],
  categories: [],
  loading: true,
  filter: {
    search: "",
    categories: [],
  },
  onCategorySelect: (category: string) => {},
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
    categories: [],
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
      setError(String(error));
    } finally {
      setLoading(false);
    }
  };

  const onCategorySelect = (category: string) => {
    const selectedIndex = filter.categories.findIndex((c) => c === category);

    const filteredCategories = [...filter.categories];

    if (selectedIndex < 0) {
      filteredCategories.push(category);
    } else {
      filteredCategories.splice(selectedIndex, 1);
    }

    setFilter({
      ...filter,
      categories: filteredCategories,
    });
  };

  const onSearch = (search: string) => {
    setFilter({
      ...filter,
      search,
    });
  };

  const filterDapps = () => {
    const { search, categories } = filter;

    const filteredDapps = allDapps
      .filter((dapp) => dapp.name.indexOf(search) > -1)
      .filter(
        (dapp) =>
          categories.length === 0 ||
          categories.some((c) => dapp.categories.indexOf(c) > -1)
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
        onSearch,
      }}
    >
      {children}
    </DappContext.Provider>
  );
};
