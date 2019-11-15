import "./App.css";
import NavBar from "./components/navbar";
import React, { Component } from "react";
import Counters from "./components/counters";

class APP extends Component {
  state = {
    counters: [
      { id: 1, value: 0 },
      { id: 2, value: 4 },
      { id: 3, value: 0 },
      { id: 4, value: 0 }
    ]
  };

  handleDelete = counterId => {
    console.log("delete");
    const counters = this.state.counters.filter(c => c.id !== counterId);
    this.setState({ counters: counters });
  };

  handleReset = () => {
    console.log("reset");

    const counters = this.state.counters.map(c => {
      c.value = 0;
      return c;
    });
    this.setState({ counters: counters });
  };

  handleIncriment = counter => {
    console.log("increment");

    const newcounters = [...this.state.counters];
    const index = newcounters.indexOf(counter);
    newcounters[index].value++;
    console.log("here", index, newcounters, counter);
    this.setState({ counters: newcounters });
  };
  render() {
    return (
      <React.Fragment>
        <NavBar
          totalCounters={this.state.counters.filter(c => c.value > 0).length}
        ></NavBar>
        <main className="container">
          <Counters
            counters={this.state.counters}
            onReset={this.handleReset}
            onDelete={this.handleDelete}
            onIncrement={this.handleIncriment}
          ></Counters>
        </main>
      </React.Fragment>
    );
  }
}

export default APP;
