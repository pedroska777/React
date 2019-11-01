import React, { Component } from "react";
import "react-datepicker/dist/react-datepicker.css";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";

import Draggable, { DraggableCore } from "react-draggable"; // Both at the same time
import { withApollo } from "react-apollo";

import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button
} from "reactstrap";
import { Sregistrate } from "../../queries/queries";
import { Fregistrate } from "../../queries/queries";

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

  async componentDidMount() {
    if (localStorage.getItem("Role") === "student") {
      console.log("here in home student, props", this.props);
      await this.props.client
        .query({
          query: Sregistrate,
          variables: { UserID: localStorage.getItem("userID") }
        })
        .then(response => {
          console.log("Response", response);
          this.setState({
            allData: response.data.Sregistrations
          });
          console.log("all data:", this.state.allData);
        });
    } else {
      await this.props.client
        .query({
          query: Fregistrate,
          variables: { instructor_name: localStorage.getItem("ProfileName") }
        })
        .then(response => {
          console.log("Response", response);
          this.setState({
            allData: response.data.Fregistrations
          });
          console.log("all data:", this.state.allData);
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
      if (localStorage.getItem("Role") === "student") {
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
              <CardImg top width="30%" src="" alt="Card image cap" />
              <CardBody>
                <CardTitle>{courseID}</CardTitle>
                <CardSubtitle>{instructor}</CardSubtitle>
                <CardText>Go to the course</CardText>
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

    /*     if (this.state.selectedMessage) {
      return <Course course={this.state.selectedMessage} />;
    } */

    return <div>{courseAns}</div>;
  }
}

export default withApollo(Home);
