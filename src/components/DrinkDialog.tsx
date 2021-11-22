import CloseIcon from "./CloseIcon";
import * as Dialog from "@radix-ui/react-dialog";

interface Ingredient {
  name: string;
  measure: string;
  image: string;
}

export const getIngredientList = (drink: object): Ingredient[] => {
  const ingredients: Ingredient[] = [];
  for (let i = 1; ; i++) {
    const name = drink[`strIngredient${i}` as keyof typeof drink];
    const measure = drink[`strMeasure${i}` as keyof typeof drink]
      ? drink[`strMeasure${i}` as keyof typeof drink]
      : "—";
    const image = `https://www.thecocktaildb.com/images/ingredients/${name}-Small.png`;
    if (!name) break;
    ingredients.push({
      name,
      measure,
      image,
    });
  }
  return ingredients;
};
interface Props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  drink: object;
}
export default function DrinkDialog({ isOpen, setIsOpen, drink }: Props) {
  const ingredients: Ingredient[] = getIngredientList(drink);
  const {
    strDrinkThumb: thumbnail,
    strDrink: drinkName,
    strInstructions: instructions,
  }: any = drink;

  return (
    <Dialog.Root open={isOpen}>
      <Dialog.Overlay className="bg-black fixed bg-opacity-30 w-screen h-screen"></Dialog.Overlay>
      <Dialog.Content
        onPointerDownOutside={() => setIsOpen(false)}
        className="bg-white fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-11/12 max-w-2xl rounded-md"
      >
        <Dialog.Title className="border-b-2 p-4">
          <div className="flex flex-row justify-between">
            <p className="text-2xl font-bold">{drinkName}</p>
            <Dialog.Close asChild>
              <CloseIcon
                onClose={() => {
                  setIsOpen(false);
                }}
              />
            </Dialog.Close>
          </div>
        </Dialog.Title>
        <img
          src={thumbnail}
          alt=""
          className="w-full h-60 overflow-hidden object-cover"
        />
        <div className="p-4">
          <p className="font-bold text-xl">Ingredients</p>
          <ul>
            {ingredients.map((ingredient) => {
              return (
                <li
                  key={ingredient.name + ingredient.measure}
                  className="w-full flex justify-between hover:bg-gray-100 py-1 px-3 rounded-md"
                >
                  <div className="flex flex-row">
                    <img
                      width="25px"
                      className="mr-2"
                      src={ingredient.image}
                      alt=""
                    />
                    <span className="font-bold">{ingredient.name}</span>
                  </div>
                  <span>{ingredient.measure}</span>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="p-4">
          <p className="font-bold text-xl">Instructions</p>
          {instructions ? (
            instructions
              .split(". ")
              .map((instruction: string, index: number) => {
                return (
                  <p key={instruction + index}>
                    {index + 1}. {instruction}
                  </p>
                );
              })
          ) : (
            <p>No Instructions...</p>
          )}
        </div>
      </Dialog.Content>
    </Dialog.Root>
  );
}
