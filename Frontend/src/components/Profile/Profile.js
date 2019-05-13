import React, { Component } from "react";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import axios from "axios";
import { rooturl } from "../../config/settings";

import {
  getProfileDetails,
  updateProfileDetails
} from "../../actions/profileActions";
import { connect } from "react-redux";

import { graphql, compose } from "react-apollo";
import { profile } from "../../queries/queries";
import { updateProfile } from "../../mutations/mutations";
import { withApollo } from "react-apollo";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorRedirect: false
    };

    //Bind
    this.handleChange = this.handleChange.bind(this);
    this.saveChanges = this.saveChanges.bind(this);
    //this.loadProfile =this.loadProfile.bind(this);
  }

  componentwillreceiveprops(nextProps) {
    console.log("componentWillRecieve", nextProps);
  }

  async componentDidMount() {
    console.log("profile", localStorage.getItem("userID"));
    console.log("props:", this.props);
    await this.props.client
      .query({
        query: profile,
        variables: {
          UserID: localStorage.getItem("userID")
        }
      })
      .then(response => {
        console.log("Response profile", response);
        const result = response.data.profile;
        var keyArray = Object.keys(response.data.profile);

        for (var i = 0; i < keyArray.length; i++) {
          console.log("keyArr", keyArray[i]);
          var name = keyArray[i];
          console.log("result[i]", result[name]);
          this.setState({
            [name]: result[name]
          });
        }
        console.log("state", this.state);
      });

    console.log("data:", this.props.data);
  }

  handleChange = e => {
    console.log("name", e.target.name);
    const target = e.target;
    const name = target.name;
    const value = target.value;
    this.setState({
      [name]: value
    });
  };

  saveChanges = e => {
    e.preventDefault();

    this.props.client.mutate({
      mutation: updateProfile,
      variables: {
        FirstName: this.state.FName,
        LastName: this.state.LName,
        Email: this.state.email,
        PhoneNumber: this.state.phone_umber,
        Aboutme: this.state.about_me,
        Country: this.state.country,
        City: this.state.city,
        Gender: this.state.gender,
        School: this.state.school,
        Hometown: this.state.hometown,
        Language: this.state.languages,
        Company: this.state.company
      }
    });
  };

  render() {
    let redrirectVar = null;

    console.log(localStorage.getItem("isAuthenticated"));
    if (localStorage.getItem("isAuthenticated") == true) {
      redrirectVar = <Redirect to="/login" />;
    }

    var profileImageData = "";
    profileImageData = (
      <img
        src="https://cobdoglaps.sa.edu.au/wp-content/uploads/2017/11/placeholder-profile-sq.jpg"
        alt="logo"
      />
    );

    var profilePageContent = null;
    if (this.state.FName) {
      profilePageContent = (
        <div>
          <div className="center-content profile-heading">
            {profileImageData}
            <h3>
              {this.state.FirstName} {this.state.LastName}
            </h3>
          </div>
          <div className="container profile-content">
            <div className="row">
              <div className="col-8 border">
                <div className="headline-text">
                  <h4>
                    <strong>Profile Information</strong>
                  </h4>
                </div>
                <div className="profile-form-content">
                  <div className="form-group">
                    <input
                      type="text"
                      name="FName"
                      id="firstname"
                      className="form-control form-control-lg"
                      placeholder="First name"
                      onChange={this.handleChange}
                      value={this.state.FName}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      name="LName"
                      id="lastname"
                      className="form-control form-control-lg"
                      placeholder="Last name"
                      onChange={this.handleChange}
                      value={this.state.LName}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      name="email"
                      id="email"
                      className="form-control form-control-lg"
                      placeholder="Email address"
                      onChange={this.handleChange}
                      value={this.state.email}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      name="phone_number"
                      id="phonenumber"
                      className="form-control form-control-lg"
                      placeholder="Phone Number"
                      onChange={this.handleChange}
                      value={this.state.phone_number}
                    />
                  </div>
                  <div className="form-group">
                    <textarea
                      type="text"
                      name="about_me"
                      id="aboutme"
                      className="form-control form-control-lg"
                      placeholder="About me"
                      onChange={this.handleChange}
                      value={this.state.about_me}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      name="country"
                      id="country"
                      className="form-control form-control-lg"
                      placeholder="Country"
                      onChange={this.handleChange}
                      value={this.state.country}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      name="city"
                      id="city"
                      className="form-control form-control-lg"
                      placeholder="City"
                      onChange={this.handleChange}
                      value={this.state.city}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      name="gender"
                      id="gender"
                      className="form-control form-control-lg"
                      placeholder="Gender"
                      onChange={this.handleChange}
                      value={this.state.gender}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      name="company"
                      id="company"
                      className="form-control form-control-lg"
                      placeholder="Company"
                      onChange={this.handleChange}
                      value={this.state.company}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      name="school"
                      id="school"
                      className="form-control form-control-lg"
                      placeholder="School"
                      onChange={this.handleChange}
                      value={this.state.school}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      name="hometown"
                      id="hometown"
                      className="form-control form-control-lg"
                      placeholder="Hometown"
                      onChange={this.handleChange}
                      value={this.state.hometown}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      name="languages"
                      id="language"
                      className="form-control form-control-lg"
                      placeholder="Language"
                      onChange={this.handleChange}
                      value={this.state.languages}
                    />
                  </div>

                  <div className="form-group">
                    <button
                      className="btn btn-lg btn-primary"
                      onClick={this.saveChanges}
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div>
        <div className="container">
          {redrirectVar}

          {/* {this.LoadProfileData()} */}
          {profilePageContent}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  profileStateStore: state.profile,
  loginStateStore: state.login
});

export default withApollo(Profile);
