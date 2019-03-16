import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router";

class Delete extends Component {
  constructor(props) {
    //Call the constrictor of Super class i.e The Component
    super(props);
    //maintain the state required for this component
    this.state = {
      BookID: "",
      Deleted: false
    };
    //Bind the handlers to this class
    /*     this.deleteChangeHandler = this.deleteChangeHandler.bind(this);

    this.deleteBook = this.deleteBook.bind(this); */
  }

  deleteChangeHandler = e => {
    this.setState({
      BookID: e.target.value
    });
  };

  deleteBook = e => {
    var headers = new Headers();
    //prevent page from refresh
    e.preventDefault();
    const data = {
      BookID: this.state.BookID
    };
    //set the with credentials to true
    axios.defaults.withCredentials = true;
    //make a post request with the user data
    axios.post("http://localhost:3001/delete", data).then(response => {
      console.log("Status Code : ", response.status);
      if (response.status === 200) {
        this.setState({
          Deleted: true
        });
      } else {
        this.setState({
          Deleted: false
        });
      }
    });
  };

  render() {
    let redirectVar = null;
    if (this.state.Deleted) {
      redirectVar = <Redirect to="/home" />;
    }
    return (
      <div class="container">
        {redirectVar}
        <form>
          <div style={{ width: "50%", float: "left" }} class="form-group">
            <input
              required
              onChange={this.deleteChangeHandler}
              type="text"
              class="form-control"
              name="BookID"
              placeholder="Search a Book by Book ID"
            />
          </div>
          <div style={{ width: "50%", float: "right" }}>
            <button
              onClick={this.deleteBook}
              class="btn btn-success"
              type="submit"
            >
              Delete
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default Delete;
