import React, { Component } from "react";

class Counter extends Component {
  formatCount = () => {
    return this.props.counter.value === 0 ? "Zero" : this.props.counter.value;
  };

  render() {
    return (
      <React.Fragment>
        <span className={this.getBadgeClasses()}>{this.formatCount()}</span>
        <button
          onClick={() => this.props.onIncriment(this.props.counter)}
          className="btn btn-secondary btn-sm"
        >
          Increment
        </button>
        <button
          onClick={() => this.props.onDelete(this.props.counter.id)}
          className="btn btn-danger btn-sm m-2"
        >
          Delete
        </button>
      </React.Fragment>
    );
  }

  getBadgeClasses() {
    let classes = "badge m-2 badge-";
    classes += this.props.counter.value !== 0 ? "primary" : "warning";
    return classes;
  }
}

export default Counter;
