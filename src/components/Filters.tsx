import { useQuery } from "react-query";
import { getFilters } from "../utils/apiServices";
import * as Accordion from "@radix-ui/react-accordion";
import capitalize from "../utils/capitalize";
import { SelectedFilters, useFilters } from "./FiltersProvider";

export interface AccordionItemProps {
  items: string[] | undefined;
  title: title;
}
export interface AccordionFilterInputProps {
  item: string;
  title: title;
}
type title = {
  name: string;
  emoji: string;
};
const filters = ["alcohol", "categories", "ingredients", "glasses"];
const emojis = new Map([
  ["alcohol", "🍶"],
  ["categories", "🔎"],
  ["ingredients", "🍒"],
  ["glasses", "🍹"],
]);

function AccordionFilterInput({ item, title }: AccordionFilterInputProps) {
  const { filters, setFilters } = useFilters();
  const handleChange = () => {
    setFilters((draft) => {
      draft[title.name as keyof SelectedFilters] = item;
    });
  };
  return (
    <li className="py-1 px-2" key={item}>
      <input
        type="radio"
        name={title.name}
        id={item}
        className="mr-2"
        onChange={handleChange}
        checked={filters[title.name as keyof SelectedFilters] === item}
      />
      <label htmlFor={item}>{item}</label>
    </li>
  );
}
function AccordionItem({ items, title }: AccordionItemProps) {
  return (
    <Accordion.Item value={title.name}>
      <Accordion.Header className="py-1 px-2 pl-0 max-w-2xs">
        <Accordion.Trigger className="accordion-trigger">
          <span>{`${title.emoji} ${capitalize(title.name)}`}</span>
          <span className="ml-2 arrow">▸</span>
        </Accordion.Trigger>
      </Accordion.Header>
      <Accordion.Content className="ml-3 max-h-64 overflow-y-auto">
        <ul>
          {items?.map((item: string) => {
            return (
              <AccordionFilterInput item={item} title={title} key={item} />
            );
          })}
        </ul>
      </Accordion.Content>
    </Accordion.Item>
  );
}
function renderAccordionItems(items: any) {
  return filters.map((key) => {
    return (
      <AccordionItem
        items={items[key]}
        title={{ name: key, emoji: emojis.get(key) as string }}
        key={key}
      />
    );
  });
}

export default function Filters() {
  const { isLoading, isError, data } = useQuery(
    "FILTERS",
    async () => await getFilters()
  );
  if (isLoading) return <p>Filters are loading...</p>;

  if (isError) return <p>There was an error loading the filters...</p>;

  return (
    <div className="min-w-max">
      <p className="text-xl font-bold py-2 divide-y-0">Filters:</p>
      <Accordion.Root type="multiple">
        {renderAccordionItems(data)}
      </Accordion.Root>
    </div>
  );
}
