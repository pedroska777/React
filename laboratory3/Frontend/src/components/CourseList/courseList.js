import React, { Component } from "react";
import { graphql } from "react-apollo";
import { courses } from "../../queries/queries";
import { Redirect } from "react-router";
import { withApollo } from "react-apollo";

class courseList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: []
    };
  }
  componentDidMount() {
    this.props.client
      .query({
        query: courses,
        variables: {}
      })
      .then(response => {
        console.log("Response", response);
        this.setState({
          courses: response.data.courses
        });
      });
  }
  /* displayBooks() {

    var data = this.props.data;
    if (data.loading) {
      return <div>Loading books...</div>;
    } else {
      return data.books.map(book => {
        return <li key={book.id}>{book.name}</li>;
      });
    }
  } */

  render() {
    var List = [];

    List = this.state.courses.map(course => {
      return (
        <tr>
          <td>{course.courseID}</td>
          <td>{course.course_name}</td>
          <td>{course.instructor_name}</td>
        </tr>
      );
    });

    return (
      <div>
        <div>
          <div class="container">
            <h2>List of courses </h2>
            <table class="table">
              <thead>
                <tr>
                  <th>Course ID</th>
                  <th>Course Name</th>
                  <th>Instructor Name</th>
                </tr>
              </thead>
              <tbody>
                {/*Display the Tbale row based on data recieved*/}
                {List}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default withApollo(courseList);
