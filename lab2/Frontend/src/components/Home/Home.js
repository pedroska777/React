import React, { Component } from "react";
import "../../App.css";
import axios from "axios";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import Draggable, { DraggableCore } from "react-draggable"; // Both at the same time
import Course from "../Course/course";

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

  getInitialState = () => {
    return {
      activeDrags: 0,
      deltaPosition: {
        x: 0,
        y: 0
      },
      controlledPosition: {
        x: -400,
        y: 200
      }
    };
  };

  handleDrag = (e, ui) => {
    const { x, y } = this.state.deltaPosition;
    this.setState({
      deltaPosition: {
        x: x + ui.deltaX,
        y: y + ui.deltaY
      }
    });
  };

  onStart = () => {
    this.setState({ activeDrags: ++this.state.activeDrags });
  };

  onStop = () => {
    this.setState({ activeDrags: --this.state.activeDrags });
  };

  // For controlled component
  adjustXPos = e => {
    e.preventDefault();
    e.stopPropagation();
    const { x, y } = this.state.controlledPosition;
    this.setState({ controlledPosition: { x: x - 10, y } });
  };

  adjustYPos = e => {
    e.preventDefault();
    e.stopPropagation();
    const { controlledPosition } = this.state;
    const { x, y } = controlledPosition;
    this.setState({ controlledPosition: { x, y: y - 10 } });
  };

  onControlledDrag = (e, position) => {
    const { x, y } = position;
    this.setState({ controlledPosition: { x, y } });
  };

  onControlledDragStop = (e, position) => {
    this.onControlledDrag(e, position);
    this.onStop();
  };

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
    const dragHandlers = { onStart: this.onStart, onStop: this.onStop };
    const { deltaPosition, controlledPosition } = this.state;
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
          <Draggable {...dragHandlers}>
            <Card>
              <CardImg top width="50%" src="" alt="Card image cap" />
              <CardBody>
                <CardTitle>{courseID}</CardTitle>
                <CardSubtitle>{instructor}</CardSubtitle>
                <CardText>the course is</CardText>
                <Button>{button}</Button>
              </CardBody>
            </Card>
          </Draggable>
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

        {courseAns}
      </div>
    );
  }
}
//export Home Component
export default Home;
