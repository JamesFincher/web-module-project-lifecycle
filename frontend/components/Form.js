import React from "react";

export default class Form extends React.Component {
  constructor() {
    super();
  }
  render() {
    const { formValue, formChange, onSubmit } = this.props;
    return (
      <div>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="item"
            value={formValue}
            onChange={formChange}
          ></input>
          <button>Submit</button>
        </form>
      </div>
    );
  }
}
