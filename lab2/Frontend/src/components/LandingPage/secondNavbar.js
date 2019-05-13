import React, { Component } from "react";
import { Link } from "react-router-dom";
import cookie from "react-cookies";
import { Redirect } from "react-router";
class SecondNavbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courseID: this.props.courseID
    };
    console.log("secondNavigator: ", this.props.courseID);
  }

  state = {
    courseID: this.props.courseID
  };
  render() {
    let navLeft = null;

    if (cookie.load("Role") === "student") {
      console.log("Able to read cookie sidenavbar", cookie.load("Role"));
      navLeft = (
        <ul class="nav navbar-nav">
          <li class="active">
            <Link to="/courseHome">Course Home</Link>
          </li>
          <li>
            <Link to={`/enrolledList/${this.state.courseID}`} S>
              Students
            </Link>
          </li>
          <li>
            <Link to="/assignment">Assignments</Link>
          </li>
        </ul>
      );
    } else if (cookie.load("Role") === "faculty") {
      navLeft = (
        <ul class="nav navbar-nav">
          <li class="active">
            <Link to="/courseHome">Course Home</Link>
          </li>
          <li>
            <Link to="/create">Create a Course</Link>
          </li>
          <li>
            <Link to="/createassignment">Create Assignment</Link>
          </li>
        </ul>
      );
    }

    return <div>{navLeft}</div>;
  }
}

export default SecondNavbar;
