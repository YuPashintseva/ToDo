import React, { Component } from 'react';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import ItemAddForm from '../item-add-form';

import './app.css';

export default class App extends Component {

  maxId = 100;

  state = {
    todoData: [
      this.createToDoItem('Drink Coffee'),
      this.createToDoItem('Make Awesome App'),
      this.createToDoItem('Have a lunch')
    ],
    term: '',
    filter: 'all' //active, all, done
  }
  createToDoItem(label) {
    return { 
      label: label, 
      important: false, 
      done: false,
      id: this.maxId++
    }
  }

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);
      const before = todoData.slice(0, idx);
      const after = todoData.slice(idx + 1);
      const newArray = [...before, ...after];
      return {
        todoData: newArray
      }
    })
  }
  
  addItem = (text) => {
    const lbl = this.createToDoItem(text);
    this.setState(({ todoData }) => {
      const newArray = todoData;
      newArray.push(lbl);
      return {
        todoData: newArray
      }
    })
  }

  toggleProperty(arr, id, propertyName) {
    const idx = arr.findIndex((el) => el.id === id);
    const oldItem = arr[idx];
    const newItem = {...oldItem, [propertyName]: !oldItem[propertyName]};
    return [
      ...arr.slice(0, idx),
      newItem, 
      ...arr.slice(idx + 1)
    ]
  }

  onToggleImportant = (id) => {
    console.log('here')
    this.setState(({todoData}) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'important')
      }
    });
  }


  onToggleDone = (id) => {
    this.setState(({todoData}) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'done')
      }
    });
  }

  onSearchChange = (term) => {
    this.setState({ term });
  }

  onFilterChange = (filter) => {
    this.setState({ filter });
  }
  

  search(items, term) {
    if (term.length === 0) {
      return items;
    }
    return items.filter((item) => {
      return item.label.toLowerCase().indexOf(term.toLowerCase()) > -1;
    })
  }

  filter(items, filter) {
    switch(filter) {
      case 'all':
        return items
      case 'active':
        return items.filter((item) => {
          return !item.done
        })
      case 'done':
        return items.filter((item) => {
          return item.done
        })
      default:
        return items;
    }
  }

  render() {
    const doneCount = this.state.todoData.filter((item) => item.done === true).length;
    const todoCount = this.state.todoData.length - doneCount;
    const visibleItems = this.filter(
        this.search(this.state.todoData, this.state.term), this.state.filter)
    
    return (
      <div className="todo-app">
        <AppHeader toDo={todoCount} done={doneCount} />
        <div className="top-panel d-flex">
          <SearchPanel onSearchChange={this.onSearchChange}/>
          <ItemStatusFilter 
            filter={this.state.filter}
            onFilterChange={this.onFilterChange}/>
        </div>
  
        <TodoList 
          todos={visibleItems}
          onDeleted={this.deleteItem}
          onToggleImportant={this.onToggleImportant}
          onToggleDone={this.onToggleDone}
        />
        <ItemAddForm 
          onElementAdd = {this.addItem}
        />
      </div>
    );
  }
};
