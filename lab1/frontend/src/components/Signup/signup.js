import React, { Component } from "react";
import "../../App.css";
import axios from "axios";
//import cookie from "react-cookies";
import { Redirect } from "react-router";

//Define a Login Component
class Signup extends Component {
  //call the constructor method
  constructor(props) {
    //Call the constrictor of Super class i.e The Component
    super(props);
    //maintain the state required for this component
    this.state = {
      firstname: "",
      lastname: "",
      username: "",
      password: "",
      email: "",
      id: "",
      role: "",
      authFlag: false,
      UserCreated: false,
      validationError: false
    };
    //Bind the handlers to this class - Not necessary cuz of arrow function
    /*     this.usernameChangeHandler = this.usernameChangeHandler.bind(this);
    this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
    this.submitLogin = this.submitLogin.bind(this); */
  }
  //Call the Will Mount to set the auth Flag to false
  componentWillMount() {
    this.setState({
      authFlag: false
    });
  }

  firstnameChangeHandler = e => {
    this.setState({
      firstname: e.target.value
    });
  };
  lastnameChangeHandler = e => {
    this.setState({
      lastname: e.target.value
    });
  };
  //username change handler to update state variable with the text entered by the user
  usernameChangeHandler = e => {
    this.setState({
      username: e.target.value
    });
  };
  //password change handler to update state variable with the text entered by the user
  passwordChangeHandler = e => {
    this.setState({
      password: e.target.value
    });
  };

  emailChangeHandler = e => {
    this.setState({
      email: e.target.value
    });
  };
  idChangeHandler = e => {
    this.setState({
      id: e.target.value
    });
  };
  roleChangeHandler = e => {
    this.setState({
      role: e.target.value
    });
  };

  //submit Sign up handler to send a request to the node backend
  submitSignup = e => {
    console.log("here0");
    if (
      this.state.firstName === "" ||
      this.state.lastName === "" ||
      this.state.email === "" ||
      this.state.password === "" ||
      this.state.username === "" ||
      this.state.role === "" ||
      this.state.id === ""
    ) {
      console.log("here-5");

      this.setState({
        validationError: true
      });
    } else {
      const data = {
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        username: this.state.username,
        password: this.state.password,
        email: this.state.email,
        id: this.state.id,
        role: this.state.role
      };
      console.log("here-1", data);

      e.preventDefault();

      axios.defaults.withCredentials = true;

      axios
        .post("http://localhost:3001/signup", data)
        .then(response => {
          if (response.status === 200) {
            this.setState({
              UserCreated: true
            });
          } else {
            this.setState({
              UserCreated: false
            });
          }
        })
        .catch(err => {
          if (err) {
            this.setState({
              authFlag: true
            });
          }
        });
    }
  };

  render() {
    let redirectVar = null;
    if (this.state.UserCreated === true) {
      console.log("here1");
      redirectVar = <Redirect to="/login" />;
    }

    if (this.state.authFlag === true) {
      console.log("here2");

      redirectVar = <Redirect to="/error" />;
    }

    let errorAlert = null;
    if (this.state.validationError) {
      console.log("here3");

      errorAlert = (
        <div>
          <div className="alert alert-danger" role="alert">
            <strong>Error!</strong> Please fill all the fields!
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
                <h2>Sign up</h2>
                {errorAlert}

                <p>Please enter all below information</p>
                <p>
                  Already have an account? <a href="/login">Login</a>
                </p>
              </div>

              <div class="form-group">
                <input
                  onChange={this.idChangeHandler}
                  type="text"
                  class="form-control"
                  name="id"
                  placeholder="ID"
                />
              </div>

              <div class="form-group">
                <input
                  onChange={this.roleChangeHandler}
                  type="text"
                  class="form-control"
                  name="role"
                  placeholder="Role"
                  required
                />
              </div>

              <div class="form-group">
                <input
                  onChange={this.firstnameChangeHandler}
                  type="text"
                  class="form-control"
                  name="firstname"
                  placeholder="First Name"
                />
              </div>

              <div class="form-group">
                <input
                  onChange={this.lastnameChangeHandler}
                  type="text"
                  class="form-control"
                  name="lastname"
                  placeholder="Last Name"
                />
              </div>

              <div class="form-group">
                <input
                  onChange={this.usernameChangeHandler}
                  type="text"
                  class="form-control"
                  name="username"
                  placeholder="Username"
                  required
                />
              </div>

              <div class="form-group">
                <input
                  onChange={this.passwordChangeHandler}
                  type="password"
                  class="form-control"
                  name="password"
                  placeholder="Password"
                  required
                />
              </div>

              <div class="form-group">
                <input
                  onChange={this.emailChangeHandler}
                  type="email"
                  class="form-control"
                  name="email"
                  placeholder="Email"
                  required
                />
              </div>

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
export default Signup;
