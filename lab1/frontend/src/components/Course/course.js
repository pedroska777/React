import React, { Component } from "react";
import { Link } from "react-router-dom";
import cookie from "react-cookies";
import { Redirect } from "react-router";
class Course extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courseID: this.props.course.courses_courseID
    };
  }
  state = {};
  render() {
    let navLeft = null;

    if (cookie.load("Role") === "student") {
      console.log("Able to read cookie", cookie.load("Role"));
      navLeft = (
        <ul class="nav navbar-nav">
          <li class="active">
            <Link to="/home">Home</Link>
          </li>
          <li>
            <Link to="/search">Search</Link>
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
            <Link to="/home">Home</Link>
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

    return (
      <div>
        <div>{navLeft}</div>

        <div> {this.state.courseID}</div>
      </div>
    );
  }
}

export default Course;
