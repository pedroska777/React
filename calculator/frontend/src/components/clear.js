import React, { Component } from "react";
import "./clear.css";

class Clear extends Component {
  state = {};
  render() {
    return (
      <div className="clear" onClick={this.props.onClear}>
        {this.props.children}
      </div>
    );
  }
}

export default Clear;
