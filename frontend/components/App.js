import React from "react";
import TodoList from "./TodoList";
import Form from "./Form";
import axios from "axios";

const URL = "http://localhost:9000/api/todos";

//init items for state
const itemz = [];

export default class App extends React.Component {
  constructor() {
    super();
    //init setState happens here
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
    this.postTodo(newItem);
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
  fetchTodo = () => {
    axios.get(URL).then((res) => {
      console.log(res.data);
      this.setState({ ...this.state, items: res.data.data });
    });
  };
  postTodo = (item) => {
    axios.post(URL, item).then((res) => {
      console.log(res.data);
      this.fetchTodo();
      this.setState({ formValue: "" });
    });
  };
  componentDidMount() {
    console.log("Component mounted");
    this.fetchTodo();
  }
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
