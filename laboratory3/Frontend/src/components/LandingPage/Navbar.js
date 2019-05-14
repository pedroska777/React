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

  handleLogout = () => {
    localStorage.clear();
    cookie.remove("cookie", { path: "/" });
  };
  render() {
    var isStudent = false;
    var isFaculty = false;

    if (localStorage.getItem("Role") == "student") {
      console.log("Navbar is here in student");
      isStudent = true;
    } else if (localStorage.getItem("Role") == "faculty") {
      isFaculty = true;
    }

    //if Cookie is set render Logout Button
    let navLogin = null;
    if (localStorage.getItem("isAuthenticated")) {
      console.log("Able to read login in navbar");
      navLogin = (
        <ul class="nav nav-pills navbar-right  ">
          <li>
            <Link class="nav-link" to="/courseList">
              <span class="glyphicon glyphicon-user" />
              Course List
            </Link>
          </li>
          <li>
            <Link class="nav-link" to="/profile">
              <span class="glyphicon glyphicon-user" />
              Profile
            </Link>
          </li>
          <li>
            <Link class="nav-link" to="/" onClick={this.handleLogout}>
              <span class="glyphicon glyphicon-user" />
              Logout
            </Link>
          </li>
        </ul>
      );
    } else {
      //Else display login button
      navLogin = (
        <ul class="nav navbar-nav navbar-right">
          <li>
            <Link class="nav-link" to="/signup">
              <span class="glyphicon glyphicon-log-in" /> Sing up
            </Link>
          </li>
          <li>
            <Link class="nav-link" to="/login">
              <span class="glyphicon glyphicon-log-in" /> Login
            </Link>
          </li>
        </ul>
      );
    }

    let navLeft = null;

    if (isStudent) {
      let id = localStorage.getItem("userID");
      navLeft = (
        <ul class="nav navbar-nav ">
          <li class="nav-item active">
            <Link class="nav-link" to="/home">
              Home
            </Link>
          </li>
          <li class="nav-item">
            <Link class="nav-link" to={`/messages/${id}`}>
              Messages
            </Link>
          </li>
          <li class="nav-item">
            <Link class="nav-link" to="/search">
              Search
            </Link>
          </li>
        </ul>
      );
    } else if (isFaculty) {
      let id = localStorage.getItem("userID");
      navLeft = (
        <ul class="navbar-nav">
          <li class="nav-item active">
            <Link class="nav-link" to="/home">
              Home
            </Link>
          </li>
          <li class="nav-item">
            <Link class="nav-link" to={`/messages/${id}`}>
              Messages
            </Link>
          </li>
          <li class="nav-item">
            <Link class="nav-link" to="/create">
              Create
            </Link>
          </li>
        </ul>
      );
    } else {
      let id = localStorage.getItem("userID");
      navLeft = <ul class="nav navbar-nav" />;
    }

    return (
      <div>
        <nav class="navbar navbar-expand-sm bg-light navbar-light ">
          <div class="container-fluid">
            <div class="navbar-header">
              <a class="navbar-brand" href="/home">
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
