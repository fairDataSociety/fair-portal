import React, { useEffect, useState } from "react";
import { createContext, useContext } from "react";
import { LocalDapp } from "../model/Dapp";
import { getDapps, getValidatedRecords } from "../storage/dapp-registry";
import categories from "../assets/data/categories.json";
import { Category } from "../model/Category";
import { DappRecord } from "@fairdatasociety/fdp-contracts-js/build/types/model/dapp-record.model";

export interface DappFilters {
  search: string;
  category: Category | null;
  validatedOnly: boolean;
}

export interface DappContext {
  allDapps: LocalDapp[];
  validatedRecords: Record<string, DappRecord>;
  filteredDapps: LocalDapp[];
  categories: Category[];
  loading: boolean;
  filter: DappFilters;
  reload: () => void;
  onCategorySelect: (category: Category | null) => void;
  onSubcategorySelect: (subcateogory: string) => void;
  onSearch: (search: string) => void;
  onValidatedChange: (validatedOnly: boolean) => void;
}

const DappContext = createContext<DappContext>({
  allDapps: [],
  validatedRecords: {},
  filteredDapps: [],
  categories,
  loading: true,
  filter: {
    search: "",
    category: null,
    validatedOnly: true,
  },
  reload: () => {},
  onCategorySelect: (category: Category | null) => {},
  onSubcategorySelect: (subcateogory: string) => {},
  onSearch: (search: string) => {},
  onValidatedChange: (validatedOnly: boolean) => {},
});

export const useDappContext = () => useContext(DappContext);

export interface DappContextProviderProps {
  children: React.ReactNode;
}

export const DappContextProvider = ({ children }: DappContextProviderProps) => {
  const [allDapps, setAllDapps] = useState<LocalDapp[]>([]);
  const [validatedRecords, setValidatedRecords] = useState<
    Record<string, DappRecord>
  >({});
  const [filteredDapps, setFilteredDapps] = useState<LocalDapp[]>([]);
  const [filter, setFilter] = useState<DappFilters>({
    search: "",
    category: null,
    validatedOnly: true,
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadDapps = async () => {
    try {
      setLoading(true);
      // TODO Add pagination
      const [dapps, validatedRecords] = await Promise.all([
        getDapps(0, 100),
        getValidatedRecords(),
      ]);
      dapps.forEach(
        (dapp) =>
          (dapp.validated = Boolean(validatedRecords[dapp.hash as string]))
      );

      setAllDapps(dapps);
      setValidatedRecords(validatedRecords);
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

  const onValidatedChange = (validatedOnly: boolean) => {
    setFilter({
      ...filter,
      validatedOnly,
    });
  };

  const filterDapps = () => {
    const { search, category, validatedOnly } = filter;

    const filteredDapps = allDapps
      .filter((dapp) => dapp.name.indexOf(search) > -1)
      .filter(
        (dapp) => !category || category.subcategories.includes(dapp.category)
      )
      .filter((dapp) => !validatedOnly || dapp.validated);

    setFilteredDapps(filteredDapps);
  };

  useEffect(() => {
    filterDapps();
  }, [filter, allDapps]);

  useEffect(() => {
    loadDapps();
  }, []);

  return (
    <DappContext.Provider
      value={{
        allDapps,
        validatedRecords,
        filteredDapps,
        categories,
        filter,
        loading,
        reload: loadDapps,
        onCategorySelect,
        onSubcategorySelect,
        onSearch,
        onValidatedChange,
      }}
    >
      {children}
    </DappContext.Provider>
  );
};
