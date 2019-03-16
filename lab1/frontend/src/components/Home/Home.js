import React, { Component } from "react";
import "../../App.css";
import axios from "axios";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import Course from "../Course/course";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      role: "",
      books: [],
      user_registration_data: [],
      registration_data: [],
      homeAnswer: [],
      selectedCourse: undefined
    };
  }
  //get the books data from backend
  componentDidMount() {
    console.log("inside didmount home up1");
    axios.get("http://localhost:3001/home").then(response => {
      //update the state with the response data
      console.log("inside didmount home  down1");
      this.setState({
        books: response.data
      });
      console.log("All registration classes:", this.state.registration_data);
    });

    axios.get("http://localhost:3001/registration").then(response => {
      //update the state with the response data
      console.log("inside didmount home down2");
      this.setState({
        user_registration_data: response.data
      });
      console.log("user classes:", this.state.user_registration_data);
    });
    axios.get("http://localhost:3001/registrationAll").then(response => {
      //update the state with the response data
      console.log("inside didmount home down3");
      this.setState({
        registration_data: response.data
      });
      console.log("All registration classes:", this.state.registration_data);
    });
  }

  handlegotoCourse = course => {
    this.setState({
      selectedCourse: course
    });
  };

  render() {
    var courseAns = [];
    courseAns = this.state.user_registration_data.map(course => {
      console.log("course=", course, typeof course);

      var hasClass = false;
      this.state.user_registration_data.map(element => {
        if (
          element.courses_courseID == course.courseID &&
          element.courses_instructor == course.instructor
        ) {
          hasClass = true;
        }
      });
      console.log("hasclass===", hasClass);

      let button;
      if (this.state.user_registration_data.length > 0) {
        button = (
          <button onClick={() => this.handlegotoCourse(course)}>Go To</button>
        );
      }

      return (
        <tr>
          <td>{course.courses_courseID}</td>
          <td>{course.courses_instructor}</td>
          <td>{button}</td>
        </tr>
      );
    });

    let redirectVar = null;
    if (!cookie.load("cookie")) {
      redirectVar = <Redirect to="/login" />;
    }
    if (this.state.selectedCourse) {
      return <Course course={this.state.selectedCourse} />;
    }

    // if this.state.select_course
    // return (
    // <Course course=this.state.selected_course />
    //)

    return (
      <div>
        {redirectVar}

        <div class="container">
          <h2>List of courses</h2>
          <table class="table">
            <thead>
              <tr>
                <th>Course ID</th>
                <th>Title</th>
                <th>Course Room</th>
                <th>Instructor</th>
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
