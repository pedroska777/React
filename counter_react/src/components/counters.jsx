import React, { Component } from "react";
import Counter from "./counter";

class Counters extends Component {
  render() {
    return (
      <div>
        <button
          onClick={this.props.onReset}
          className="btn btn-primary btn-small"
        >
          Reset
        </button>
        {this.props.counters.map(counter => (
          <li>
            <Counter
              key={counter.id}
              counter={counter}
              onDelete={this.props.onDelete}
              onIncriment={this.props.onIncrement}
            ></Counter>
          </li>
        ))}
      </div>
    );
  }
}

export default Counters;
