import { useEffect, useState } from "react";
import { getMoreDetails } from "../utils/apiServices";
import DrinkDialog, { getIngredientList } from "./DrinkDialog";
interface Drink {
  strDrinkThumb: string;
  strDrink: string;
  strAlcoholic: string;
  strCategory: string;
  idDrink: string;
}

export default function DrinkCard({ drink: drinkProp }: { drink: Drink }) {
  const [drink, setDrink] = useState(drinkProp);

  useEffect(() => {
    if (drink.strCategory) return;
    const getDetails = async () => {
      const data = await getMoreDetails(drink.idDrink);
      setDrink(data);
    };
    getDetails();
  }, [drink]);
  const ingredients = getIngredientList(drink);
  const {
    strDrinkThumb: thumbnail,
    strDrink: drinkName,
    strAlcoholic: alcoholic,
    strCategory: category,
  } = drink;

  const [isOpen, setIsOpen] = useState(false);
  return (
    <div
      className="container w-full flex p-4 ml-2 rounded-md hover:bg-gray-100 cursor-pointer"
      onClick={(e) => {
        e.preventDefault();
        setIsOpen(true);
      }}
    >
      <div className="max-w-2xs rounded-md overflow-hidden">
        <img src={thumbnail} alt="" />
      </div>
      <div className="container ml-4 flex flex-col">
        <p className="font-bold text-xl">{drinkName}</p>
        <div className="container flex flex-row flex-wrap gap-2 mt-2">
          <p className="bg-green-500 text-white max-w-min min-w-max py-1 px-2 rounded-md">
            {alcoholic}
          </p>
          <p className="bg-blue-600 text-white max-w-min min-w-max py-1 px-2 rounded-md">
            {category}
          </p>
        </div>
        <div className="container flex flex-row flex-wrap gap-2 mt-auto">
          {ingredients.map((ingredient, index) => {
            return (
              <img
                className="w-8"
                src={ingredient.image}
                alt={ingredient.name}
                key={"dialog-" + ingredient.name + index}
              />
            );
          })}
        </div>
      </div>
      <DrinkDialog isOpen={isOpen} setIsOpen={setIsOpen} drink={drink} />
    </div>
  );
}
