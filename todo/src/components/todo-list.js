import React from 'react';
import TodoListItem from './todo-list-item';

// todos аналогично использованию props, в данном случае используется деструктуризация
const TodoList = ({todos}) => {

  const element = todos.map((item) => {
    return (
      <li key={item.id}>
        <TodoListItem 
          label={item.label}
          important={item.important}
        />
      </li>
    );
  })

  return (
    <ul>
      { element }
    </ul>
  );
};

export default TodoList;