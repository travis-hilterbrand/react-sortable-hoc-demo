import React, { Component } from 'react';
import { sortableContainer, sortableElement, arrayMove } from 'react-sortable-hoc';

import './App.css'

const SortableItem = sortableElement(({ value }) => <li>{value}</li>);

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
        <SortableContainer onSortEnd={this.onSortEnd} lockAxis={'y'} lockToContainerEdges={true}>
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
