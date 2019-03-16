import React, { Component } from "react";
import { Link } from "react-router-dom";
import cookie from "react-cookies";
import { Redirect } from "react-router";

//create the Navbar Component
class Navbar extends Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }
  //handle logout to destroy the cookie
  handleLogout = () => {
    cookie.remove("cookie", { path: "/" });
  };
  render() {
    //if Cookie is set render Logout Button
    let navLogin = null;
    if (cookie.load("cookie")) {
      console.log("Able to read cookie", cookie.load("Role"));
      navLogin = (
        <ul class="nav navbar-nav navbar-right">
          <li>
            <Link to="/profile">
              <span class="glyphicon glyphicon-user" />
              Profile
            </Link>
          </li>
          <li>
            <Link to="/" onClick={this.handleLogout}>
              <span class="glyphicon glyphicon-user" />
              Logout
            </Link>
          </li>
        </ul>
      );
    } else {
      //Else display login button
      console.log("Not Able to read cookie");
      navLogin = (
        <ul class="nav navbar-nav navbar-right">
          <li>
            <Link to="/login">
              <span class="glyphicon glyphicon-log-in" /> Login
            </Link>
          </li>
        </ul>
      );
    }

    let navLeft = null;

    if (cookie.load("Role") === "student") {
      console.log("Able to read cookie", cookie.load("Role"));
      navLeft = (
        <ul class="nav navbar-nav">
          <li class="active">
            <Link to="/home">Home</Link>
          </li>
          <li>
            <Link to="/search">Search</Link>
          </li>
          <li>
            <Link to="/assignment">Assignments</Link>
          </li>
        </ul>
      );
    } else if (cookie.load("Role") === "faculty") {
      navLeft = (
        <ul class="nav navbar-nav">
          <li class="active">
            <Link to="/home">Home</Link>
          </li>
          <li>
            <Link to="/create">Create a Course</Link>
          </li>
          <li>
            <Link to="/createassignment">Create Assignment</Link>
          </li>
        </ul>
      );
    }

    let redirectVar = null;
    if (cookie.load("cookie")) {
      redirectVar = <Redirect to="/home" />;
    }
    return (
      <div>
        {redirectVar}
        <nav class="navbar navbar-inverse">
          <div class="container-fluid">
            <div class="navbar-header">
              <a class="navbar-brand" href="#">
                Canvas
              </a>
            </div>
            {navLeft}
            {navLogin}
          </div>
        </nav>
      </div>
    );
  }
}

export default Navbar;