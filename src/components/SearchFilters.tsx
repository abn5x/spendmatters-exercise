import Filters from "./Filters";
import SearchDrink from "./SearchDrink";

export default function SearchFilters() {
  return (
    <div className="container flex flex-col align-top max-w-2xs divide-y">
      <SearchDrink />
      <Filters />
    </div>
  );
}
