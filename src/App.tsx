import React from "react";
import {
  SortableContainer,
  SortableElement,
  SortableHandle,
  arrayMove,
  SortEnd,
} from "react-sortable-hoc";

import "./App.css";

const MySortableHandle = SortableHandle(() => (
  <div
    style={{ height: 30, width: 30, background: "black", cursor: "pointer" }}
  />
));

interface SortableItemProps {
  value: string;
}
const SortableItem = SortableElement(({ value }: SortableItemProps) => (
  <li
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    }}
  >
    {value}
    <MySortableHandle />
  </li>
));

interface MySortableContainerProps {
  items: string[];
}
const MySortableContainer = SortableContainer(
  ({ items }: MySortableContainerProps) => {
    return (
      <ul>
        {items.map((value, index) => (
          <SortableItem key={`item-${value}`} index={index} value={value} />
        ))}
      </ul>
    );
  }
);

const initialItems: string[] = [];
for (let i = 1; i < 20; i++) {
  initialItems.push("Item " + i);
}

const App = () => {
  const [items, setItems] = React.useState(initialItems);

  const handleSortEnd = ({ oldIndex, newIndex }: SortEnd) => {
    const newItems = arrayMove(items, oldIndex, newIndex);
    setItems(newItems);
  };

  return (
    <div className={"container"}>
      <div className={"header"} />
      <MySortableContainer
        lockAxis={"y"}
        lockToContainerEdges={true}
        useDragHandle={true}
        onSortEnd={handleSortEnd}
        items={items}
      />
      <div className={"footer"} />
    </div>
  );
};
export default App;
