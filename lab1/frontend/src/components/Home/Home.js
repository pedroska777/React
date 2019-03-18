import React, { Component } from "react";
import "../../App.css";
import axios from "axios";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";

import Course from "../Course/course";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      role: "",
      courseID: "",
      instructor: "",
      allData: [],
      waitlisted: 0,
      selectedCourse: undefined
    };
  }

  componentDidMount() {
    if (cookie.load("Role") === "student") {
      axios.get("http://localhost:3001/registration").then(response => {
        //update the state with the response data
        console.log("inside didmount home down2");
        this.setState({
          allData: response.data,
          instructor: response.data.courses_instructor,
          courseID: response.data.courses_courseID,
          waitlisted: response.data.waitlisted
        });
        console.log("All Registration:", this.state.allData);
      });
    } else {
      axios.get("http://localhost:3001/courses").then(response => {
        //update the state with the response data
        console.log("inside didmount home down3");
        this.setState({
          allData: response.data,
          instructor: response.data.instructor,
          courseID: response.data.courseID
        });
        console.log("All classes:", this.state.allData);
      });
    }
  }

  handlegotoCourse = course => {
    this.setState({
      selectedCourse: course
    });
  };

  render() {
    var courseAns = [];
    let courseID = "";
    let instructor = "";
    let waitlisted = 0;

    courseAns = this.state.allData.map(course => {
      console.log("course=", course, typeof course);
      if (cookie.load("Role") === "student") {
        courseID = course.courses_courseID;
        instructor = course.courses_instructor;
        waitlisted = course.waitlisted;
      } else {
        courseID = course.courseID;
        instructor = course.instructor;
        waitlisted = 0;
      }

      let button = (
        <Link to={`/courseHome/${courseID}`}>GO</Link>
        // <button onClick={() => this.handlegotoCourse(course)}>Go To</button>
      );
      let courseList = null;
      if (waitlisted === 0) {
        courseList = (
          <tr>
            <td>{courseID}</td>
            <td>{instructor}</td>
            <td>{button}</td>
          </tr>
        );
      } else {
        courseList = null;
      }
      console.log("courseList:", courseList);

      return courseList;
    });
    console.log("courseAns:", courseAns);

    let redirectVar = null;
    if (!cookie.load("cookie")) {
      redirectVar = <Redirect to="/login" />;
    }
    /*     if (this.state.selectedCourse) {
      return <Course course={this.state.selectedCourse} />;
    } */

    return (
      <div>
        {redirectVar}

        <div class="container">
          <h2>List of courses</h2>
          <table class="table">
            <thead>
              <tr>
                <th>Course ID</th>
                <th>Instructor</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {/*Display the Tbale row based on data recieved*/}
              {courseAns}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
//export Home Component
export default Home;
