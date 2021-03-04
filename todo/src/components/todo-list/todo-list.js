import React from 'react';
import TodoListItem from '../todo-list-item/todo-list-item';
import './todo-list.css';

// todos аналогично использованию props, в данном случае используется деструктуризация
const TodoList = ({todos, onDeleted, onToggleImportant, onToggleDone}) => {

  const element = todos.map((item) => {
    return (
      <li key={item.id} className="list-group-item">
        <TodoListItem 
          label={item.label}
          important={item.important}
          done={item.done}
          onDeleted={() => onDeleted(item.id)}
          onToggleImportant={() => onToggleImportant(item.id)}
          onToggleDone={() => onToggleDone(item.id)}
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