import React from "react";
import Todo from "./Todo";

export default class TodoList extends React.Component {
  constructor() {
    super();
  }
  render() {
    const { items, crossOff } = this.props;
    return (
      //map over items in the list, sending the data to Todo tp parse
      <>
        <div>TodoList</div>{" "}
        {items.map((item) => {
          return (
            <Todo
              name={item.name}
              key={item.id}
              id={item.id}
              completed={item.completed}
              crossOff={crossOff}
            />
          );
        })}
      </>
    );
  }
}
