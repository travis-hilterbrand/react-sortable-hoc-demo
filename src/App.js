import React, { Component } from 'react';
import { sortableContainer, sortableElement, arrayMove } from 'react-sortable-hoc';

import './App.css'

const SortableItem = sortableElement(({ value }) => <li>{value}</li>);

const SortableContainer = sortableContainer(({ children }) => {
  return <ul>{children}</ul>;
});

class App extends Component {
  state = {
    items: ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6'],
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
