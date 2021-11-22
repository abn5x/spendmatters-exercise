import { createContext, FC, useContext } from "react";
import { Updater, useImmer } from "use-immer";

const filtersDefaultState = {
  name: "",
  alcohol: "",
  ingredients: "",
  glasses: "",
  categories: "",
};
const defaultState = {
  filters: filtersDefaultState,
  setFilters: () => {},
};
const Filters = createContext<FiltersContext>(defaultState);
export interface FiltersContext {
  filters: SelectedFilters;
  setFilters: Updater<SelectedFilters>;
}
export interface SelectedFilters {
  name: string;
  alcohol: string;
  ingredients: string;
  glasses: string;
  categories: string;
}

const FiltersProvider: FC = ({ children }) => {
  const [filters, setFilters] = useImmer<SelectedFilters>(filtersDefaultState);
  return (
    <Filters.Provider value={{ filters, setFilters }}>
      {children}
    </Filters.Provider>
  );
};

export const useFilters = () => useContext(Filters);
export default FiltersProvider;
