import React, { Component } from "react";
import { Route } from "react-router-dom";
import Login from "./Login/login";
import Home from "./Home/Home";
import Delete from "./Delete/Delete";
import Create from "./Create/Create";
import Navbar from "./LandingPage/Navbar";
import Signup from "./Signup/signup";
import Error from "./Error/error";
import Profile from "./Profile/profile";
import Search from "./Search/search";
import Sidebar from "./LandingPage/Sidebar";

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
        <Route path="/delete" component={Delete} />
        <Route path="/create" component={Create} />
        <Route path="/error" component={Error} />
        <Route path="/profile" component={Profile} />
        <Route path="/search" component={Search} />
      </div>
    );
  }
}
//Export The Main Component
export default Main;
