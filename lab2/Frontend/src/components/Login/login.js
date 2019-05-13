import React, { Component } from "react";
import axios from "axios";
import cookie from "react-cookies";
import { Redirect } from "react-router";

import { connect } from "react-redux";
import { submitLogin } from "../../Action/loginActions";
import { Field, reduxForm } from "redux-form";

class Login extends Component {
  constructor() {
    super();

    this.state = {
      userID: "",
      password: "",
      formValidationFailure: false,
      isValidationFailure: true,
      errorRedirect: false
    };

    //Bind events
  }

  //Define component to be rendered
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

  //
  onSubmit(values) {
    axios.defaults.withCredentials = true;
    var data = {
      userID: values.userID,
      password: values.password
    };

    this.props.submitLogin(data);
  }

  render() {
    let redrirectVar = null;

    if (this.props.loginStateStore.result) {
      if (this.props.loginStateStore.result.isAuthenticated === true) {
        redrirectVar = <Redirect to="/home" />;
      }
    }

    if (this.state.errorRedirect) {
      redrirectVar = <Redirect to="/error" />;
    }

    let errorPanel = null;
    if (this.props.loginStateStore.result) {
      if (this.props.loginStateStore.result.isAuthenticated === false) {
        errorPanel = (
          <div>
            <div className="alert alert-danger" role="alert">
              <strong>Validation Error!</strong> Username and Password doesn't
              match!
            </div>
          </div>
        );
      }
    }
    let formErrorPanel = null;
    if (this.state.formValidationFailure) {
      formErrorPanel = (
        <div>
          <div className="alert alert-danger" role="alert">
            <strong>Validation Error!</strong> Username and Password are
            required!
          </div>
        </div>
      );
    }
    const { handleSubmit } = this.props;
    return (
      <div>
        <div className="container fill-graywhite">
          {redrirectVar}
          <div className="container content">
            <div className="login-container">
              <div>
                <h2>Log in</h2>
              </div>

              <div className="login-form-container col-lg-4 col-md-4 col-sm-12 offset-lg-4 offset-md-4 border">
                <div className="login-form-heading input-group pad-top-10 input-group-lg" />
                <hr />
                {errorPanel}
                {formErrorPanel}
                <form
                  name="loginForm"
                  onSubmit={handleSubmit(this.onSubmit.bind(this))}
                >
                  <Field
                    name="userID"
                    id="userID"
                    type="text"
                    placeholder="ID"
                    component={this.renderField}
                  />
                  <Field
                    name="password"
                    id="password"
                    type="password"
                    placeholder="Password"
                    component={this.renderField}
                  />

                  <div className="form-group login-form-control">
                    <button
                      className="btn btn-login col-lg-12 col-md-12 col-sm-12"
                      type="submit"
                    >
                      Login{" "}
                    </button>
                  </div>
                  <div>
                    <p>
                      Need an account? <a href="/sign-up">Sign Up</a>
                    </p>
                  </div>
                </form>
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
  if (!values.userID) {
    errors.userID = "Enter ID";
  }
  if (!values.password) {
    errors.password = "Enter Password";
  }
  return errors;
}
//export default Login;
export default reduxForm({
  validate,
  form: "loginForm"
})(
  connect(
    mapStateToProps,
    { submitLogin }
  )(Login)
);
