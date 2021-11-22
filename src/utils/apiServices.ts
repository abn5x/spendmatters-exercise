import axios from "axios";
import { FiltersContext, SelectedFilters } from "../components/FiltersProvider";

interface Drink {
  drinks: object[];
}
export interface FilterObject {
  strCategory?: string;
  strGlass?: string;
  strIngredient1?: string;
  strAlcoholic?: string;
}

export interface Filters {
  alcohol: string[];
  ingredients: string[];
  glasses: string[];
  categories: string[];
}
type drinkInfoType = {
  idDrink: string;
};
const filters: Map<string, string[]> = new Map([
  ["c", ["categories", "strCategory"]],
  ["g", ["glasses", "strGlass"]],
  ["i", ["ingredients", "strIngredient1"]],
  ["a", ["alcohol", "strAlcoholic"]],
]);
export async function getDrinks(filterContext: FiltersContext): Promise<any> {
  const fetchedDrinks: any = {};
  const foundDrinks: any = [];
  let neededMatches: number = 0;
  const keys = Array.from(Object.keys(filterContext.filters));
  for (let i = 0; i < keys.length; i++) {
    const selectedFilter =
      filterContext.filters[keys[i] as keyof SelectedFilters];
    if (!selectedFilter) continue;
    neededMatches += 1;
    const query =
      keys[i] === "name"
        ? `search.php?s=${selectedFilter}`
        : `filter.php?${keys[i][0]}=${selectedFilter}`;
    const {
      data: { drinks },
    } = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/${query}`);
    drinks.forEach((drink: drinkInfoType) => {
      if (typeof fetchedDrinks[drink.idDrink] === "undefined") {
        fetchedDrinks[drink.idDrink] = {
          count: 1,
          data: drink,
        };
      } else if (fetchedDrinks.hasOwnProperty(drink.idDrink))
        fetchedDrinks[drink.idDrink].count += 1;
    });
  }
  for (let key in fetchedDrinks) {
    if (fetchedDrinks[key].count === neededMatches)
      foundDrinks.push(fetchedDrinks[key].data);
  }
  return foundDrinks;
}
export async function getFilters(): Promise<any> {
  let filterObject: any = {};
  for (let i = 0; i < filters.size; i++) {
    const filter = Array.from(filters.keys())[i];
    const [name, key] = filters.get(filter) as [
      keyof Filters,
      keyof FilterObject
    ];
    const {
      data: { drinks },
    } = await axios.get<Drink>(
      `https://www.thecocktaildb.com/api/json/v1/1/list.php?${filter}=list`
    );

    filterObject[name] = drinks.map((item: FilterObject) => item[key]);
  }
  return filterObject;
}

export async function getMoreDetails(id: string): Promise<any> {
  const { data: fullData } = await axios.get(
    `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
  );

  return fullData.drinks[0];
}
