import React, { Component } from "react";
import "../../App.css";
import axios from "axios";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
//import Card from "react-bootstrap/Card";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button
} from "reactstrap";

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
      selectedMessage: undefined,
      position: ""
    };
  }

  componentDidMount() {
    if (cookie.load("Role") === "student") {
      axios.get("http://localhost:3001/registration").then(response => {
        //update the state with the response data
        console.log("inside didmount home down2", response);
        this.setState({
          allData: response.data
        });
        console.log("All Registration:", this.state.allData);
      });
    } else {
      axios.get("http://localhost:3001/courses").then(response => {
        //update the state with the response data
        console.log("inside didmount home down3,response:", response);
        console.log(
          "inside didmount home down3,response.data.courseID:",
          response.data.courseID
        );

        this.setState({
          allData: response.data
        });
        console.log("All classes:", this.state.allData);
      });
    }
  }

  handlegotoCourse = course => {
    this.setState({
      selectedMessage: course
    });
  };

  render() {
    var courseAns = [];
    let courseID = "";
    let instructor = "";
    let waitlisted = 0;

    courseAns = this.state.allData.map(course => {
      console.log("course=", course, typeof course);
      console.log("Role", cookie.load("Role"));
      if (cookie.load("Role") === "student") {
        console.log("ctrl0", course.courseID);

        courseID = course.courseID;
        instructor = course.instructor_name;
        waitlisted = course.waitlisted;
        console.log("ctrl-1", courseID, instructor, waitlisted);
      } else {
        console.log("ctrl");

        courseID = course.courseID;
        instructor = course.instructor_name;
        waitlisted = 0;
      }

      let button = (
        <Link to={`/courseHome/${courseID}`}>GO to Course</Link>
        // <button onClick={() => this.handlegotoCourse(course)}>Go To</button>
      );
      let courseList = null;
      console.log("waitlisted", waitlisted);

      if (waitlisted == 0) {
        console.log("waitlisted true");

        courseList = (
          <Card>
            <CardImg
              top
              width="50%"
              src="https://s18670.pcdn.co/wp-content/uploads/cool-math-games.jpeg"
              alt="Card image cap"
            />
            <CardBody>
              <CardTitle>{courseID}</CardTitle>
              <CardSubtitle>{instructor}</CardSubtitle>
              <CardText>the course is</CardText>
              <Button>{button}</Button>
              <Button>MOVe UP</Button>
              <Button>MOVe Down</Button>
            </CardBody>
          </Card>
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
    /*     if (this.state.selectedMessage) {
      return <Course course={this.state.selectedMessage} />;
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
