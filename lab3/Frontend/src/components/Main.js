import React, { Component } from "react";
import { Route } from "react-router-dom";

import Login from "./Login/Login";
import Home from "./Home/Home";
import Create from "./Create/Create";
import Navbar from "./LandingPage/Navbar";
import Signup from "./Signup/Signup";
import Error from "./Error/Error";
import Profile from "./Profile/Profile";
//import Search from "./Search/search";
import Course from "./Course/course";
import EnrolledList from "./EnrolledList/enrolledList";
import courseList from "./CourseList/courseList";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

const client = new ApolloClient({
  uri: "http://localhost:8080/graphql"
});

class Main extends Component {
  render() {
    return (
      <div>
        <Navbar />
        {/* <Sidebar />*/}
        {/*Render Different Component based on Route*/}
        <Route path="/signup" component={Signup} />
        <Route path="/courseList" component={courseList} />
        <Route path="/login" component={Login} />
        <Route path="/home" component={Home} />
        <Route path="/create" component={Create} />
        <Route path="/error" component={Error} />
        <Route path="/profile" component={Profile} />
        <Route path="/courseHome/:courseID" exact component={Course} />
        <Route path="/enrolledList/:courseID" exact component={EnrolledList} />
      </div>
    );
  }
}
//Export The Main Component
export default Main;
