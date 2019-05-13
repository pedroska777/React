import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import cookie from "react-cookies";
import { Redirect } from "react-router";
import SecondNavbar from "../LandingPage/secondNavbar";
class Course extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courseID: this.props.match.params.courseID,
      topic: "",
      body: "",
      announcement: [],
      authFlag: true
    };
  }

  async componentDidMount() {
    axios.get("http://localhost:3001/announcement").then(response => {
      //update the state with the response data
      this.setState({
        announcement: response.data
      });
      console.log("announcement:", this.state.announcement);
    });
  }

  handleStateUpdate = () => {
    console.log("inside updateState up");
    axios.get("http://localhost:3001/announcement").then(response => {
      //update the state with the response data
      this.setState({
        announcement: response.data
      });
      console.log("announcement:", this.state.announcement);
    });
  };

  topicChangeHandler = e => {
    this.setState({
      topic: e.target.value
    });
  };
  //password change handler to update state variable with the text entered by the user
  bodyChangeHandler = e => {
    this.setState({
      body: e.target.value
    });
  };

  submit = e => {
    e.preventDefault();
    const data = {
      courseID: this.state.courseID,
      topic: this.state.topic,
      body: this.state.body
    };

    //set the with credentials to true
    axios.defaults.withCredentials = true;
    //make a post request with the user data
    axios
      .post("http://localhost:3001/announcement", data)
      .then(response => {
        console.log("Status Code : ", response.status);
        if (response.status === 200) {
          this.handleStateUpdate();
          this.setState({
            authFlag: true
          });
        } else {
          this.setState({
            authFlag: false
          });
        }
      })
      .catch(err => {
        if (err) {
          this.setState({
            authFlag: false
          });
          console.log("Error message catch1:", err);
        }
      });
  };

  render() {
    let authorFaculty = null;
    if (cookie.load("Role") === "faculty") {
      authorFaculty = (
        <div class="panel">
          <h2>New Announcement</h2>

          <p>Please enter Topic and Description</p>
          <div className="form-group">
            <input
              type="text"
              name="Topic"
              id="Topic"
              className="form-control form-control-lg"
              placeholder="Topic"
              onChange={this.topicChangeHandler}
            />
          </div>
          <div className="form-group">
            <textarea
              type="text"
              name="body"
              id="body"
              className="form-control form-control-lg"
              placeholder="Description"
              onChange={this.bodyChangeHandler}
            />
          </div>

          <button onClick={this.submit} class="btn btn-primary">
            Submit
          </button>
        </div>
      );
    }
    let announcementList = null;

    announcementList = this.state.announcement.map(ans => {
      if (ans.courses_courseID === this.state.courseID) {
        return (
          <tr>
            <td>{ans.topic}</td>
            <td>{ans.body}</td>
          </tr>
        );
      }
    });

    return (
      <div>
        <ul class="nav navbar-nav">
          <li class="active">
            <Link to="/courseHome">Course Home</Link>
          </li>
          <li>
            <Link to={`/enrolledList/${this.state.courseID}`}>Students</Link>
          </li>
          <li>
            <Link to={`/assignment/${this.state.courseID}`}>Assignments</Link>
          </li>
        </ul>
        <div class="container">
          <h2>Announcment for {this.state.courseID}</h2>
          <table class="table">
            <thead>
              <tr>
                <th>Topic</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {/*Display the Tbale row based on data recieved*/}
              {announcementList}
            </tbody>
          </table>
        </div>
        {authorFaculty}
      </div>
    );
  }
}

export default Course;
