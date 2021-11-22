import { useEffect } from "react";
import { useQuery } from "react-query";
import { getDrinks } from "../utils/apiServices";
import DrinkCard from "./DrinkCard";
import { useFilters } from "./FiltersProvider";

export default function DrinksResults() {
  const { filters, setFilters } = useFilters();
  const { isPlaceholderData, isError, data, refetch, isFetching } = useQuery(
    "SEARCH-DRINKS",
    async () => await getDrinks({ filters, setFilters })
  );
  useEffect(() => {
    refetch();
  }, [filters, refetch]);

  if (isFetching)
    return (
      <div className="flex justify-center items-center w-full">
        <p>Drinks are loading...</p>
      </div>
    );

  if (isError)
    return (
      <div className="flex justify-center items-center w-full">
        <p>Drinks are loading...</p>
      </div>
    );

  return data.length ? (
    <div className="container flex flex-col">
      {data.map((drink: any) => {
        return <DrinkCard drink={drink} key={drink.idDrink} />;
      })}
    </div>
  ) : (
    <div className="flex justify-center items-center w-full">
      <p>No drinks to show. Try searching for some!</p>
    </div>
  );
}
