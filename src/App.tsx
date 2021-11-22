import DrinksResults from "./components/DrinksResults";
import SearchFilters from "./components/SearchFilters";
import Title from "./components/Title";

function App() {
  return (
    <div className="container mx-auto p-2 flex-col">
      <Title />
      <div className="container flex">
        <SearchFilters />
        <DrinksResults />
      </div>
    </div>
  );
}

export default App;
