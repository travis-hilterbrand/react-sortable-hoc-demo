import React, { Component } from 'react';
import { sortableContainer, sortableElement, sortableHandle, arrayMove } from 'react-sortable-hoc';

import './App.css'

const SortableHandle = sortableHandle(() => (<div style={{ height: 30, width: 30, background: 'black', cursor: 'pointer' }} />));

const SortableItem = sortableElement(({ value }) => (
  <li style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', }}>
    {value}
    <SortableHandle />
  </li>
));

const SortableContainer = sortableContainer(({ children }) => {
  return <ul>{children}</ul>;
});

const initialItemx = [];
for (let i = 1; i < 20; i++) {
  initialItemx.push('Item ' + i);
}

class App extends Component {
  state = {
    items: initialItemx,
  };

  onSortEnd = ({ oldIndex, newIndex }) => {
    this.setState(({ items }) => ({
      items: arrayMove(items, oldIndex, newIndex),
    }));
  };

  render() {
    const { items } = this.state;

    return (
      <div className={'container'}>
        <div className={'header'} />
        <SortableContainer lockAxis={'y'} lockToContainerEdges={true} useDragHandle={true} onSortEnd={this.onSortEnd}
        >
          {items.map((value, index) => (
            <SortableItem key={`item-${value}`} index={index} value={value} />
          ))}
        </SortableContainer>
        <div className={'footer'} />
      </div>
    );
  }
}

export default App;
