import React, { Component } from "react";
import axios from "axios";
import cookie from "react-cookies";
import { Redirect } from "react-router";

import { connect } from "react-redux";
import { Field, reduxForm, propTypes } from "redux-form";
import { login } from "../../queries/queries";

import { graphql } from "react-apollo";

import { withApollo } from "react-apollo";
import Navbar from "../LandingPage/Navbar";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userID: "",
      Password: "",
      formValidationFailure: false,
      isValidationFailure: true,
      errorRedirect: false,
      isAuthenticated: false,
      validationFailure: false
    };

    this.submitLoginData = this.submitLoginData.bind(this);
  }

  handleChange = e => {
    const target = e.target;
    const name = target.name;
    const value = target.value;
    this.setState({
      [name]: value
    });
  };

  renderField(field) {
    const {
      meta: { touched, error }
    } = field;
    const className =
      touched && error
        ? "form-control form-control-lg is-invalid"
        : "form-control form-control-lg";
    const inputType = field.type;
    const inputPlaceholder = field.placeholder;
    const errorMessageStyling = touched && error ? "text-danger" : "";

    return (
      <div className="form-group">
        <label>{field.label}</label>
        <input
          className={className}
          type={inputType}
          placeholder={inputPlaceholder}
          {...field.input}
        />
        <div className={errorMessageStyling}>
          <div>{touched ? error : ""}</div>
        </div>
      </div>
    );
  }

  async submitLoginData() {
    axios.defaults.withCredentials = true;
    console.log("states", this.state.userID, this.state.Password);

    await this.props.client
      .query({
        query: login,
        variables: {
          UserID: this.state.userID,
          Password: this.state.Password
        }
      })
      .then(response => {
        console.log("Response", response.data);
        console.log("UserData", response.data.login.userData);
        if (response.data.login.result == true) {
          localStorage.setItem(
            "ProfileName",
            response.data.login.userData.FName +
              " " +
              response.data.login.userData.LName
          );
          localStorage.setItem("Role", response.data.login.userData.role);
          localStorage.setItem("isAuthenticated", true);
          localStorage.setItem("userID", response.data.login.userData.userID);

          this.setState({
            isAuthenticated: true
          });
        } else {
          this.setState({
            validationFailure: true
          });
        }
      });
  }

  render() {
    let redrirectVar = null;

    if (this.state.isAuthenticated === true) {
      redrirectVar = <Redirect to="/home" />;
    }

    if (this.state.errorRedirect) {
      redrirectVar = <Redirect to="/error" />;
    }

    let errorPanel = null;

    if (this.state.validationFailure === true) {
      errorPanel = (
        <div>
          <div className="alert alert-danger" role="alert">
            <strong>Validation Error!</strong> Username and Password doesn't
            match!
          </div>
        </div>
      );
    }

    let formErrorPanel = null;

    return (
      <div>
        <div className="container fill-graywhite">
          {redrirectVar}
          <div className="container content">
            <div className="login-container">
              <div>
                <p>Log in to Canvas</p>
              </div>

              <div className="login-form-container col-lg-4 col-md-4 col-sm-12 offset-lg-4 offset-md-4 border">
                <div className="login-form-heading input-group pad-top-10 input-group-lg">
                  login
                </div>
                <hr />
                {errorPanel}
                {formErrorPanel}

                <div className="form-group">
                  <input
                    type="text"
                    name="userID"
                    id="email"
                    className="form-control form-control-lg"
                    placeholder="User ID"
                    onChange={this.handleChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    name="Password"
                    id="password"
                    className="form-control form-control-lg"
                    placeholder="Password"
                    onChange={this.handleChange}
                  />
                </div>
                <div className="form-group login-form-control">
                  <a href="" className="">
                    Forgot Password?
                  </a>
                </div>

                <div className="form-group login-form-control">
                  <button
                    className="btn btn-login col-lg-12 col-md-12 col-sm-12"
                    type="submit"
                    onClick={this.submitLoginData}
                  >
                    Login{" "}
                  </button>
                </div>
                {/* </form> */}
                <hr />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

//This method provides access to redux store
const mapStateToProps = state => ({
  loginStateStore: state.login
});

function validate(values) {
  const errors = {};
  if (!values.email) {
    errors.email = "Enter E-mail";
  }
  if (!values.password) {
    errors.password = "Enter Password";
  }

  return errors;
}

export default withApollo(Login);
