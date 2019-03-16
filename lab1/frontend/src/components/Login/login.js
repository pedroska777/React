import React, { Component } from "react";
import "../../App.css";
import axios from "axios";
import cookie from "react-cookies";
import { Redirect } from "react-router";

//Define a Login Component
class Login extends Component {
  //call the constructor method
  constructor(props) {
    //Call the constrictor of Super class i.e The Component
    super(props);
    //maintain the state required for this component
    this.state = {
      userID: "",
      password: "",
      authFlag: true,
      redirectsignup: false,
      validationError: false,
      redirectError: false
    };
    //Bind the handlers to this class - Not necessary cuz of arrow function
    /*     this.usernameChangeHandler = this.usernameChangeHandler.bind(this);
    this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
    this.submitLogin = this.submitLogin.bind(this); */
  }
  componentWillMount() {
    console.log("component currently mounting");
  }

  componentDidMount() {
    console.log("component has mounted");
  }
  //Call the Will Mount to set the auth Flag to false
  /*   componentWillMount() {
    this.setState({
      authFlag: false
    });
  } */
  //username change handler to update state variable with the text entered by the user
  idChangeHandler = e => {
    this.setState({
      userID: e.target.value
    });
  };
  //password change handler to update state variable with the text entered by the user
  passwordChangeHandler = e => {
    this.setState({
      password: e.target.value
    });
  };
  //submit Login handler to send a request to the node backend
  submitLogin = e => {
    this.setState(() => ({
      validationError: false
    }));

    var headers = new Headers();
    //prevent page from refresh
    e.preventDefault();
    const data = {
      userID: this.state.userID,
      password: this.state.password
    };
    if (this.state.userID === "" || this.state.password === "") {
      this.setState(() => ({
        validationError: true
      }));
      console.log("Form validation Error!");
    } else {
      //set the with credentials to true
      axios.defaults.withCredentials = true;
      //make a post request with the user data
      axios
        .post("http://localhost:3001/login", data)
        .then(response => {
          console.log("Status Code : ", response.status);
          if (response.status === 200) {
            this.setState({
              authFlag: true,
              validationError: false
            });
          } else {
            this.setState({
              authFlag: false
            });
          }
        })
        .catch(err => {
          if (err) {
            if (err.response.status === 401) {
              this.setState({
                authFlag: false
              });
              console.log("Error message catch1:", err.response.status);
            } else {
              console.log("Error message catch2:", err.response.status);

              this.setState({
                redirectError: true
              });
            }
          }
        });
    }
  };

  submitSignup = e => {
    var headers = new Headers();
    //prevent page from refresh
    e.preventDefault();
    this.setState({ redirectsignup: true });
  };

  render() {
    //redirect based on successful login
    let redirectVar = null;
    if (cookie.load("cookie")) {
      redirectVar = <Redirect to="/home" />;
    } else if (this.state.errorRedirect) {
      redirectVar = <Redirect to="/error" />;
    } else if (this.state.redirectsignup) {
      redirectVar = <Redirect to="/signup" />;
    }

    let errorAuth = null;

    let errorAlert = null;
    if (this.state.validationError) {
      console.log("login here3");

      errorAlert = (
        <div>
          <div className="alert alert-danger" role="alert">
            <strong>Error!</strong> Please fill all the fields!
          </div>
        </div>
      );
    } else if (!this.state.authFlag) {
      console.log("login here8");

      errorAuth = (
        <div>
          <div className="alert alert-danger" role="alert">
            <strong>Error!</strong> ID or Password is Wrong!
          </div>
        </div>
      );
    }

    return (
      <div>
        {redirectVar}
        <div class="container">
          <div class="login-form">
            <div class="main-div">
              <div class="panel">
                <h2>User Login</h2>
                {errorAuth}
                {errorAlert}
                <p>Please enter your ID and password</p>
              </div>

              <div class="form-group">
                <input
                  onChange={this.idChangeHandler}
                  type="text"
                  class="form-control"
                  name="userID"
                  placeholder="User ID"
                />
              </div>
              <div class="form-group">
                <input
                  onChange={this.passwordChangeHandler}
                  type="password"
                  class="form-control"
                  name="password"
                  placeholder="Password"
                />
              </div>
              <button onClick={this.submitLogin} class="btn btn-primary">
                Login
              </button>
              <button onClick={this.submitSignup} class="btn btn-primary">
                Sign up
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
//export Login Component
export default Login;
