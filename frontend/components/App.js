import React from "react";
import TodoList from "./TodoList";
import Form from "./Form";
import axios from "axios";

const URL = "http://localhost:9000/api/todos";
const PATCH = "http://localhost:9000/api/todos/";
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

  //is requested by onSubmit to add item to list, and will pass the newItem to postTodo function
  addItem = (e, item) => {
    console.log(item);
    const newItem = {
      id: Date.now(),
      name: item,
      completed: false,
    };
    this.postTodo(newItem);
  };

  //is onClick handler that will remove all completed items from the list.
  // This function will filter the current state of items and return only the uncompleted items stored in filteredItems....
  //filteredItem is then sent to postTodo to update the list on the api.
  remove = () => {
    const filteredItems = this.state.items.filter((item) => {
      return !item.completed;
    });
    console.log("State Before Removal", this.state.items);
    console.log("State After Removal", filteredItems);
    this.postTodo(filteredItems);
  };
  
  //what we call to process a submit onClick.... will call addItem which will create the item, and use postTodo to send it to the server...
  onSubmit = (e) => {
    e.preventDefault();
    // console.log(e);
    this.addItem(e, this.state.formValue);
    console.log("New item posted... Reseting formValue state to empty");
    // this.setState({ formValue: "" });
  };

  //disable a clicked item
  crossOff = (id) => {
    axios.patch(PATCH + id, { completed: true });
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

  filter = () => {
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
    console.log("item:", item);
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
        <button onClick={this.filter}>Hide Completed Items</button>
        {/* <br />
        <span>
          <button onClick={this.remove}>Remove Completed Items FOREVER</button>
        </span>
      </> */}
    );
  }
}
