import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router";

import { signup } from "../../mutations/mutations";
import { graphql } from "react-apollo";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      userID: "",
      role: "",
      isNewUserCreated: false,
      isDuplicateUser: false
    };

    //bind
    this.submitSignup = this.submitSignup.bind(this);
  }

  handleChange = e => {
    const target = e.target;
    const name = target.name;
    const value = target.value;
    this.setState({
      [name]: value
    });
  };

  //Define component to be rendered
  renderField(field) {
    console.log(field);
    const {
      meta: { touched, error }
    } = field;
    const className =
      touched && error
        ? "form-control form-control-lg is-invalid"
        : "form-control form-control-lg";
    console.log("filef name", field.placeholder);
    const inputType = field.type;
    const inputPlaceholder = field.placeholder;
    const errorMessageStyling = touched && error ? "text-danger" : "";
    var divClassName = "";
    if (field.id === "firstname") {
      divClassName = "form-group login-form-control pad-top-20";
    } else {
      divClassName = "form-group login-form-control";
    }

    return (
      <div className={divClassName}>
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

  //Submit
  onSubmit(values) {
    var data = {
      FirstName: values.firstname,
      LastName: values.lastname,
      Email: values.email,
      Password: values.password,
      UserName: values.username,
      UserID: values.userID,
      Role: values.role
    };

    // e.preventDefault();
    this.props.signup(data);
  }

  submitSignup = () => {
    // e.preventDefault();
    this.props
      .signup({
        variables: {
          FirstName: this.state.firstname,
          LastName: this.state.lastname,
          Email: this.state.email,
          Password: this.state.password,
          Role: this.state.role,
          UserID: this.state.userID
        }
      })
      .then(response => {
        console.log("Resposne", response.data);
        if (response.data.signup.success == true) {
          this.setState({
            isNewUserCreated: true
          });
        }
        if (response.data.signup.duplicateUser == true) {
          this.setState({
            isDuplicateUser: true
          });
        }
      });
  };

  render() {
    let redirectVar = null;
    let errorPanel = null;

    if (this.state.isNewUserCreated == true) {
      redirectVar = <Redirect to="/login" />;
    }

    if (this.state.isDuplicateUser == true) {
      errorPanel = (
        <div>
          <div className="alert alert-danger" role="alert">
            <strong>Validation Error!</strong> User Already exists!
          </div>
        </div>
      );
    }

    return (
      <div>
        <div className="container fill-graywhite">
          {redirectVar}
          <div className="container content">
            <div className="login-container">
              <div>
                <p>Sign up</p>
                <p>
                  Already have an account? <a href="/login">Login</a>
                </p>
              </div>

              <div className="login-form-container col-lg-6 col-md-6 col-sm-12 offset-lg-3 offset-md-3 border">
                {errorPanel}

                <div className="form-group mt-3">
                  <input
                    type="text"
                    name="userID"
                    id="userID"
                    className="form-control form-control-lg"
                    placeholder="User ID"
                    onChange={this.handleChange}
                  />
                </div>

                <div className="form-group">
                  <input
                    type="text"
                    name="email"
                    id="email"
                    className="form-control form-control-lg"
                    placeholder="Email"
                    onChange={this.handleChange}
                  />
                </div>

                <div className="form-group mt-3">
                  <input
                    type="text"
                    name="firstname"
                    id="firstname"
                    className="form-control form-control-lg"
                    placeholder="First Name"
                    onChange={this.handleChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    name="lastname"
                    id="lastname"
                    className="form-control form-control-lg"
                    placeholder="Last Name"
                    onChange={this.handleChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    name="role"
                    id="role"
                    className="form-control form-control-lg"
                    placeholder="Role"
                    onChange={this.handleChange}
                  />
                </div>

                <div className="form-group">
                  <input
                    type="password"
                    name="password"
                    id="password"
                    className="form-control form-control-lg"
                    placeholder="Password"
                    onChange={this.handleChange}
                  />
                </div>
                <div className="form-group login-form-control">
                  <button
                    className="btn btn-login col-lg-12 col-md-12 col-sm-12"
                    type="submit"
                    onClick={this.submitSignup}
                  >
                    Sign up{" "}
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
  signupStateStore: state.signup
});

function validate(values) {
  console.log("inside vaidate");
  const errors = {};
  if (!values.firstname) {
    errors.firstname = "Enter your Firstname";
  }
  if (!values.lastname) {
    errors.lastname = "Enter your Lastname";
  }
  if (!values.email) {
    errors.email = "Enter E-mail";
  }
  if (!values.password) {
    errors.password = "Enter Password";
  }
  if (!values.role) {
    errors.role = "Enter Role";
  }
  if (!values.userID) {
    errors.userID = "Enter ID";
  }

  return errors;
}

// export default (graphql(signup, { name: "signup" }))(reduxForm({
//     validate,
//     form: "signupForm"
// }))(connect(mapStateToProps, {})(Signup));

export default graphql(signup, { name: "signup" })(Signup);
