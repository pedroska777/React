import React, { Component } from "react";
import "./App.css";
import Button from "./components/button";
import Input from "./components/input";
import Clear from "./components/clear";
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
      operator: "",
      prevnum: "",
      currnum: ""
    };
  }

  addToScreen = value => {
    this.setState({ input: this.state.input + value });
  };

  addZeroToScreen = value => {
    if (this.state.input !== "") {
      this.setState({ input: this.state.input + value });
    }
  };

  addDecimalToScreen = value => {
    if (this.state.input.indexOf(".") === -1) {
      this.setState({ input: this.state.input + value });
    }
  };

  handleClear = () => {
    this.setState({ input: "",
    operator: "",
    prevnum: "",
    currnum: "" });
    /*     this.setState({ prevnum: "" });
    this.setState({ currnum: "" });
    this.setState({ operator: "" }); */
  };

  handleAdd = () => {
    this.setState({
      prevnum: this.state.input,
      input: "",
      operator: "plus"
    });
  };

  handleSubtract = () => {
    this.setState({
      prevnum: this.state.input,
      input: "",
      operator: "subtract"
    });
  };

  handleMultiply = () => {
    this.setState({
      prevnum: this.state.input,
      input: "",
      operator: "multiply"
    });
  };

  handleDivide = () => {
    this.setState({
      prevnum: this.state.input,
      input: "",
      operator: "divide"
    });
  };

  /*   handleEvaluate = () => {
    this.setState({ currnum: this.state.input });
    //this.state.currnum = this.state.input;

    if (this.state.operator === "plus") {
      this.setState(prevState => ({
        input: parseFloat(prevState.prevnum) + parseFloat(prevState.currnum)
      }));
    } else if (this.state.operator === "subtract") {
      this.setState(prevState => ({
        input: parseFloat(prevState.prevnum) - parseFloat(prevState.currnum)
      }));
    } else if (this.state.operator === "multiply") {
      this.setState(prevState => ({
        input: parseFloat(prevState.prevnum) * parseFloat(prevState.currnum)
      }));
    } else if (this.state.operator === "divide") {
      this.setState(prevState => ({
        input: parseFloat(prevState.prevnum) / parseFloat(prevState.currnum)
      }));
    }
  };
 */

  submitEqual = () => {
    this.setState({ currnum: this.state.input });

    //prevent page from refresh
    //e.preventDefault();
    const data = {
      operator: this.state.operator,
      currnum: this.state.input,
      prevnum: this.state.prevnum
    };

    //set the with credentials to true
    //axios.defaults.withCredentials = true;
    //make a post request with the user data
    axios
      .post("http://localhost:3001/", data)
      .then(response => {
        console.log("Status Code : ", response.status);
        if (response.status === 201) {
          console.log("here:", response.data);
          this.setState({
            input: response.data.output,
            prevnum: this.state.currnum,
            currnum: response.data.output
          });
        }
      })
      .catch(error => {
        console.log("Error fetching and parsing data", error);
      });
  };

  render() {
    return (
      <div className="App">
        <div className="calc-wrapper">
          <div className="row">
            <Input>{this.state.input}</Input>
          </div>

          <div className="row">
            <Button clickScreen={this.addToScreen}>7</Button>
            <Button clickScreen={this.addToScreen}>8</Button>
            <Button clickScreen={this.addToScreen}>9</Button>
            <Button clickScreen={this.handleDivide}>/</Button>
          </div>
          <div className="row">
            <Button clickScreen={this.addToScreen}>4</Button>
            <Button clickScreen={this.addToScreen}>5</Button>
            <Button clickScreen={this.addToScreen}>6</Button>
            <Button clickScreen={this.handleMultiply}>*</Button>
          </div>
          <div className="row">
            <Button clickScreen={this.addToScreen}>1</Button>
            <Button clickScreen={this.addToScreen}>2</Button>
            <Button clickScreen={this.addToScreen}>3</Button>
            <Button clickScreen={this.handleAdd}>+</Button>
          </div>
          <div className="row">
            <Button clickScreen={this.addDecimalToScreen}>.</Button>
            <Button clickScreen={this.addZeroToScreen}>0</Button>
            <Button clickScreen={this.submitEqual}>=</Button>
            <Button clickScreen={this.handleSubtract}>-</Button>
          </div>
          <div className="row">
            <Clear onClear={this.handleClear}>Clear</Clear>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
