import React, { Component } from "react";

import axios from "axios";
import cookie from "react-cookies";
import { Redirect } from "react-router";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      course_term: "spring19",
      course_dept: "cmpe",
      course_number: "273",
      search_condition: "E",
      search_answer: [],
      user_registration_data: [],
      registration_data: [],
      authFlag: true,
      redirectError: false
    };
  }

  //get the registered course of a user from backend
  async componentDidMount() {
    console.log("inside didmount up");

    axios.get("http://localhost:3001/registration").then(response => {
      //update the state with the response data
      console.log("inside didmount down");
      this.setState({
        user_registration_data: response.data
      });
      console.log("user classes:", this.state.user_registration_data);
    });
    axios.get("http://localhost:3001/registrationAll").then(response => {
      //update the state with the response data
      console.log("inside didmount registration ALL down");
      this.setState({
        registration_data: response.data
      });
      console.log("All registration classes:", this.state.registration_data);
    });
  }

  handleStateUpdate = () => {
    console.log("inside updateState up");

    axios.get("http://localhost:3001/registration").then(response => {
      //update the state with the response data
      console.log("inside updateState down");
      this.setState({
        user_registration_data: response.data
      });
      console.log("user classes:", this.state.user_registration_data);
    });
    axios.get("http://localhost:3001/registrationAll").then(response => {
      //update the state with the response data
      console.log("inside updateState registration ALL down");
      this.setState({
        registration_data: response.data
      });
      console.log("All registration classes:", this.state.registration_data);
    });
  };

  handleChange = e => {
    e.preventDefault();

    console.log("target:", e.target.value);

    this.setState({
      [e.target.name]: e.target.value
    });
    console.log("state:", this.state);
  };

  submitSearch = e => {
    //prevent page from refresh
    e.preventDefault();
    const data = {
      course_term: this.state.course_term,
      course_dept: this.state.course_dept,
      course_number: this.state.course_number,
      search_condition: this.state.search_condition
    };

    //set the with credentials to true
    axios.defaults.withCredentials = true;
    //make a post request with the user data
    axios
      .post("http://localhost:3001/search", data)
      .then(response => {
        console.log("Status Code : ", response.status);
        if (response.status === 200) {
          this.setState({
            authFlag: true
          });
          this.setState({
            search_answer: response.data
          });

          console.log("search response:" + JSON.stringify(response.data));
          response.data.map(course => console.log(course.courseID));
        } else {
          this.setState({
            authFlag: false
          });
        }
      })
      .catch(err => {
        if (err) {
          if (err) {
            this.setState({
              authFlag: false
            });
            console.log("Error message catch1:", err);
          } else {
            console.log("Error message catch2:", err);

            this.setState({
              redirectError: true
            });
          }
        }
      });
  };

  handleAddCourse = course => {
    //prevent page from refresh
    console.log("course", course);
    //set the with credentials to true
    axios.defaults.withCredentials = true;
    //make a post request with the user data
    axios
      .post("http://localhost:3001/addCourse", course)
      .then(response => {
        console.log("Status Code : ", response.status);
        if (response.status === 200) {
          this.setState({
            authFlag: true
          });

          console.log("response:", response);
          this.handleStateUpdate();
        } else {
          this.setState({
            authFlag: false
          });
        }
      })
      .catch(err => {
        if (err) {
          if (err) {
            this.setState({
              authFlag: false
            });
            console.log("Error message catch1:", err);
          } else {
            console.log("Error message catch2:", err);

            this.setState({
              redirectError: true
            });
          }
        }
      });
  };

  handleWaitlist = course => {
    //prevent page from refresh
    console.log("course", course);
    //set the with credentials to true
    axios.defaults.withCredentials = true;
    //make a post request with the user data
    axios
      .post("http://localhost:3001/addWaitlist", course)
      .then(response => {
        console.log("Status Code : ", response.status);
        if (response.status === 200) {
          this.setState({
            authFlag: true
          });
          this.handleStateUpdate();

          console.log("response:" + response);
        } else {
          this.setState({
            authFlag: false
          });
        }
      })
      .catch(err => {
        if (err) {
          if (err) {
            this.setState({
              authFlag: false
            });
            console.log("Error message catch1:", err);
          } else {
            console.log("Error message catch2:", err);

            this.setState({
              redirectError: true
            });
          }
        }
      });
  };

  handleDropCourse = course => {
    //prevent page from refresh
    console.log("course", course);
    //set the with credentials to true
    axios.defaults.withCredentials = true;
    //make a post request with the user data
    axios
      .post("http://localhost:3001/dropCourse", course)
      .then(response => {
        console.log("Status Code : ", response.status);
        if (response.status === 200) {
          this.setState({
            authFlag: true
          });
          this.handleStateUpdate();

          console.log("response:" + response);
        } else {
          this.setState({
            authFlag: false
          });
        }
      })
      .catch(err => {
        if (err) {
          if (err) {
            this.setState({
              authFlag: false
            });
            console.log("Error message catch1:", err);
          } else {
            console.log("Error message catch2:", err);

            this.setState({
              redirectError: true
            });
          }
        }
      });
  };

  render() {
    var courseAns = [];
    if (this.state.search_answer.length > 0) {
      courseAns = this.state.search_answer.map(course => {
        console.log("course=", course, typeof course);
        console.log("state of all reg:", this.state.registration_data);

        let countWaitlist = 0;
        let countRegistered = 0;
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

        this.state.registration_data.map(element => {
          console.log("element=", element, typeof element);
          if (
            element.courses_courseID == course.courseID &&
            element.courses_instructor == course.instructor &&
            element.waitlisted == "0"
          ) {
            countRegistered += 1;
          } else if (
            element.courses_courseID == course.courseID &&
            element.courses_instructor == course.instructor &&
            element.waitlisted == "1"
          ) {
            countWaitlist += 1;
          }
        });
        let button;
        if (hasClass) {
          button = (
            <button onClick={() => this.handleDropCourse(course)}>DROP</button>
          );
        } else {
          if (countRegistered < course.course_capacity) {
            button = (
              <button onClick={() => this.handleAddCourse(course)}>ADD</button>
            );
          } else if (countWaitlist < course.waitlist_capacity) {
            button = (
              <button onClick={() => this.handleWaitlist(course)}>
                Waitlist
              </button>
            );
          } else {
            button = (
              <div className="alert alert-danger" role="alert">
                <strong>FULL</strong>
              </div>
            );
          }
        }
        return (
          <tr>
            <td>{course.courseID}</td>
            <td>{course.course_name}</td>
            <td>{course.course_room}</td>
            <td>{course.instructor}</td>
            <td>{button}</td>
          </tr>
        );
      });
    }
    let redirectVar = null;
    if (!cookie.load("cookie")) {
      redirectVar = <Redirect to="/login" />;
    }

    return (
      <div>
        {redirectVar}
        <div>
          <div>
            <h2 align="center">
              Search Courses
              <br />
              <br />
            </h2>
          </div>
          <div>
            <form>
              <label>
                Select Department:
                <select
                  name="course_dept"
                  value={this.state.course_dept}
                  onChange={this.handleChange}
                >
                  <option value="cmpe">CMPE</option>
                  <option value="cs">CS</option>
                  <option value="ee">EE</option>
                  <option value="bus">BUS</option>
                </select>
              </label>
              <label>
                Select Semester:
                <select
                  name="course_term"
                  value={this.state.course_term}
                  onChange={this.handleChange}
                >
                  <option value="spring19">Spring 19</option>
                  <option value="fall18">Fall 18</option>
                  <option value="spring18">Spring 18</option>
                </select>
              </label>
            </form>
            <form>
              <label>
                Select Range:
                <select
                  name="search_condition"
                  value={this.state.search_condition}
                  onChange={this.handleChange}
                >
                  <option value="E">is exactly</option>
                  <option value="G">greater than or equal to</option>
                </select>
              </label>
              <label>
                <input
                  type="text"
                  name="course_number"
                  placeholder="Course Number"
                  onChange={this.handleChange}
                  //value={this.state.course_number}
                />
              </label>
            </form>
          </div>
          <div className="col-md-1">
            <button onClick={this.submitSearch} class="btn btn-primary">
              search
            </button>
          </div>
        </div>

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

export default Search;
