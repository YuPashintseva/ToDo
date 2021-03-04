import React from 'react';
import TodoListItem from '../todo-list-item/todo-list-item';
import './todo-list.css';

// todos аналогично использованию props, в данном случае используется деструктуризация
const TodoList = ({todos}) => {

  const element = todos.map((item) => {
    return (
      <li key={item.id} className="list-group-item">
        <TodoListItem 
          label={item.label}
          important={item.important}
        />
      </li>
    );
  })

  return (
    <ul className="list-group todo-list">
      { element }
    </ul>
  );
};

export default TodoList;