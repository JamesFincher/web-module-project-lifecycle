import React from "react";
import TodoList from "./TodoList";
import Form from "./Form";

//init items for state
const itemz = [
  {
    name: "Organize Garage",
    id: 1528817077286,
    completed: false,
  },
  {
    name: "Bake Cookies",
    id: 1528817084358,
    completed: false,
  },
];
export default class App extends React.Component {
  constructor() {
    super();
    //setState happens here
    this.state = {
      items: itemz,
      formValue: "",
    };
    // console.log("State from App", this.state.items);
  }
  //Updates form and state as we type in teh input
  formChange = (e) => {
    this.setState({ formValue: e.target.value });
  };

  //callback for submit to process the new item submission
  addItem = (e, item) => {
    console.log(item);
    const newItem = {
      name: item,
      id: Date.now(),
      completed: false,
    };
    this.setState({
      items: [...this.state.items, newItem],
      formValue: "",
    });
  };

  //what we call to process a submit onClick
  onSubmit = (e) => {
    e.preventDefault();
    // console.log(e);
    this.addItem(e, this.state.formValue);
    console.log("New item posted... Reseting formValue state to empty");
    // this.setState({ formValue: "" });
  };

  //disable a clicked item
  crossOff = (id) => {
    this.setState({
      items: this.state.items.map((item) => {
        if (id === item.id) {
          return { ...item, completed: !item.completed };
        } else {
          return item;
        }
      }),
    });
    console.log(id);
  };

  filter = (e) => {
    this.setState({
      items: this.state.items.filter((item) => {
        return !item.completed;
      }),
    });
  };
  render() {
    return (
      <>
        return{" "}
        <TodoList
          items={this.state.items}
          crossOff={this.crossOff}
          toggle={this.toggle}
        />
        <Form
          formValue={this.state.formValue}
          formChange={this.formChange}
          onSubmit={this.onSubmit}
        />
        <button onClick={this.filter}>Filter</button>
      </>
    );
  }
}
