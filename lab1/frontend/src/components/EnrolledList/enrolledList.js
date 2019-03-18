import React, { Component } from "react";
import axios from "axios";

import { Link } from "react-router-dom";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import SecondNavbar from "../LandingPage/secondNavbar";
class EnrolledList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courseID: this.props.match.params.courseID,
      registration_data: [],
      users: []
    };
  }
  async componentDidMount() {
    axios.get("http://localhost:3001/registrationAll").then(response => {
      //update the state with the response data
      console.log("inside didmount enrol down3,courseID", this.state.courseID);
      this.setState({
        registration_data: response.data
      });
      console.log("All registration classes:", this.state.registration_data);
    });
    axios.get("http://localhost:3001/user").then(response => {
      //update the state with the response data
      console.log("inside didmount enrol down4,courseID", this.state.courseID);
      this.setState({
        users: response.data
      });
      console.log("All users:", this.state.users);
    });
  }

  render() {
    var studentList = [];

    studentList = this.state.registration_data.map(course => {
      console.log("course=", course, typeof course);

      if (
        course.courses_courseID === this.state.courseID &&
        course.waitlisted === 0
      ) {
        console.log("the classes are not empty");

        var element = this.state.users.find(user => {
          return user.userID === course.user_userID;
        });
        console.log("element", element);
        return (
          <tr>
            <td>{course.user_userID}</td>
            <td>{element.FName}</td>
            <td>{element.LName}</td>
          </tr>
        );
      }
    });
    return (
      <div>
        <div>
          <div class="container">
            <h2>List of student in {this.state.courseID}</h2>
            <table class="table">
              <thead>
                <tr>
                  <th>Student ID</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                </tr>
              </thead>
              <tbody>
                {/*Display the Tbale row based on data recieved*/}
                {studentList}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default EnrolledList;
