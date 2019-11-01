import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router";
import cookie from "react-cookies";
import { rooturl } from "../../config/settings";
import { createCourse } from "../../mutations/mutations";
import { graphql } from "react-apollo";

class Create extends Component {
  constructor(props) {
    //Call the constrictor of Super class i.e The Component
    super(props);
    //maintain the state required for this component
    this.state = {
      courseID: "",
      course_name: "",
      course_dept: "",
      course_description: "",
      course_room: "",
      course_capacity: "",
      waitlist_capacity: "",
      course_term: "",
      redirectError: true,
      isNewCourseCreated: false
    };
  }

  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  saveChanges = e => {
    e.preventDefault();
    this.props
      .createCourse({
        variables: {
          courseID: this.state.courseID,
          course_name: this.state.course_name,
          course_dept: this.state.course_dept,
          course_description: this.state.course_description,
          course_room: this.state.course_room,
          course_capacity: this.state.course_capacity,
          waitlist_capacity: this.state.waitlist_capacity,
          course_term: this.state.course_term,
          instructor_name: localStorage.getItem("ProfileName"),
          instructorID: localStorage.getItem("userID")
        }
      })
      .then(response => {
        console.log("Resposne", response.data);
        if (response.data.createCourse.success == true) {
          this.setState({
            isNewCourseCreated: true
          });
        }
      });
  };

  render() {
    let redirectVar = null;
    if (this.state.isNewCourseCreated == true) {
      redirectVar = <Redirect to="/home" />;
    }
    if (localStorage.getItem("Role") !== "faculty") {
      redirectVar = <Redirect to="/error" />;
    } else if (!this.state.redirectError) {
      redirectVar = <Redirect to="/home" />;
    }
    return (
      <div>
        {redirectVar}

        <br />

        <div class="container">
          <form>
            <div style={{ width: "30%" }} class="form-group">
              <input
                required
                onChange={this.changeHandler}
                type="text"
                class="form-control"
                name="courseID"
                placeholder="Course ID"
              />
            </div>
            <br />
            <div style={{ width: "30%" }} class="form-group">
              <input
                required
                onChange={this.changeHandler}
                type="text"
                class="form-control"
                name="course_name"
                placeholder="Course Name"
              />
            </div>
            <br />
            <div style={{ width: "30%" }} class="form-group">
              <input
                onChange={this.changeHandler}
                type="text"
                class="form-control"
                name="course_dept"
                placeholder="Course Department"
                required
              />
            </div>
            <br />
            <div style={{ width: "30%" }} class="form-group">
              <input
                required
                onChange={this.changeHandler}
                type="text"
                class="form-control"
                name="course_description"
                placeholder="Course Description"
              />
            </div>
            <br />{" "}
            <div style={{ width: "30%" }} class="form-group">
              <input
                required
                onChange={this.changeHandler}
                type="text"
                class="form-control"
                name="course_room"
                placeholder="Course Room"
              />
            </div>
            <br />
            <div style={{ width: "30%" }} class="form-group">
              <input
                required
                onChange={this.changeHandler}
                type="text"
                class="form-control"
                name="course_capacity"
                placeholder="Course Capacity"
              />
            </div>
            <br />
            <div style={{ width: "30%" }} class="form-group">
              <input
                required
                onChange={this.changeHandler}
                type="text"
                class="form-control"
                name="waitlist_capacity"
                placeholder="Waitlist Capacity"
              />
            </div>
            <br />
            <div style={{ width: "30%" }} class="form-group">
              <input
                required
                onChange={this.changeHandler}
                type="text"
                class="form-control"
                name="course_term"
                placeholder="Course Term"
              />
            </div>
            <br />
            <div style={{ width: "30%" }}>
              <button
                onClick={this.saveChanges}
                class="btn btn-success"
                type="submit"
              >
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default graphql(createCourse, { name: "createCourse" })(Create);
