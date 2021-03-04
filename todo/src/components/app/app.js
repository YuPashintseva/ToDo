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
    ]
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

  onToggleImportant = (id) => {
    console.log('onToggleImportant', id);
  }

  onToggleDone = (id) => {
    this.setState(({todoData}) => {
      const idx = todoData.findIndex((el) => el.id === id);
      const oldItem = todoData[idx];
      const newItem = {...oldItem, done: !oldItem.done};
      const newArray = [
          ...todoData.slice(0, idx),
          newItem, 
          ...todoData.slice(idx + 1)
      ];

      return {
        todoData: newArray
      }
    });
  }

  render() {

    const doneCount = this.state.todoData.filter((item) => item.done === true).length;
    const todoCount = this.state.todoData.length - doneCount;

    return (
      <div className="todo-app">
        <AppHeader toDo={todoCount} done={doneCount} />
        <div className="top-panel d-flex">
          <SearchPanel />
          <ItemStatusFilter />
        </div>
  
        <TodoList 
          todos={this.state.todoData}
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
