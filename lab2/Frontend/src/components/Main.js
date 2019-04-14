import React, { Component } from "react";
import { Route } from "react-router-dom";
import Login from "./Login/login";
import Home from "./Home/Home";
import Create from "./Create/Create";
import Navbar from "./LandingPage/Navbar";
import Signup from "./Signup/signup";
import Error from "./Error/error";
import Profile from "./Profile/profile";
import Search from "./Search/search";
import Sidebar from "./LandingPage/Sidebar";
import Course from "./Course/course";
import EnrolledList from "./EnrolledList/enrolledList";
import Messages from "./Messages/messages";

//Create a Main Component
class Main extends Component {
  render() {
    return (
      <div>
        <Navbar />
        {/* <Sidebar />*/}
        {/*Render Different Component based on Route*/}
        <Route path="/signup" component={Signup} />
        <Route path="/login" component={Login} />
        <Route path="/home" component={Home} />
        <Route path="/create" component={Create} />
        <Route path="/error" component={Error} />
        <Route path="/profile" component={Profile} />
        <Route path="/search" component={Search} />
        <Route path="/courseHome/:courseID" exact component={Course} />
        <Route path="/enrolledList/:courseID" exact component={EnrolledList} />
        <Route path="/messages/:id" exact component={Messages} />
      </div>
    );
  }
}
//Export The Main Component
export default Main;
