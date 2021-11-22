import { useFilters } from "./FiltersProvider";

export default function SearchDrink() {
  const { filters, setFilters } = useFilters();
  return (
    <div className="container mr-2 flex flex-col items-center py-2">
      <label
        htmlFor="drinkName"
        className="mr-auto min-w-max max-w-min font-bold"
      >
        Drink name:
      </label>
      <input
        className="bg-gray-100 w-full rounded border-2 px-2 py-1"
        type="text"
        name="drinkName"
        id="drinkName"
        value={filters.name}
        onChange={(e) => {
          setFilters((draft) => {
            draft.name = e.target.value;
          });
        }}
      />
    </div>
  );
}
