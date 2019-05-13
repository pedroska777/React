import React, { Component } from "react";

class Error extends Component {
  render() {
    return (
      <div className="error-div container">
        <h1>Error!</h1>
        <div>
          <h3>
            Try accessing the link <a href="http://localhost:3000">here</a>
          </h3>
        </div>
      </div>
    );
  }
}

export default Error;
