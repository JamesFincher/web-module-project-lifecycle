import React from "react";

export default class Todo extends React.Component {
  constructor() {
    super();
  }
  render() {
    const { name, id, crossOff, completed } = this.props;
    return (
      //return item
      <div
        id={id}
        onClick={() => crossOff(id)}
        className={`todo${completed ? " completed" : ""}`}
      >
        <p>{name}</p>
      </div>
    );
  }
}
