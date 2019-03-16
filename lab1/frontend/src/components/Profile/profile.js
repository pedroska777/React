import React, { Component } from "react";
import cookie from "react-cookies";
import { Redirect } from "react-router";
//import Header from "../Header/Header";
import axios from "axios";

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      userID: "",
      role: "",
      username: "",
      email: "",
      password: "",
      FName: "",
      LName: "",
      profile_image: "",
      phone_number: "",
      about_me: "",
      city: "",
      country: "",
      company: "",
      school: "",
      hometown: "",
      languages: "",
      gender: "",
      ProfileImagePreview: undefined,
      redirectError: false,
      successUpdate: false
    };

    //Bind
    this.handleChange = this.handleChange.bind(this);
    this.saveChanges = this.saveChanges.bind(this);
  }

  componentDidMount() {
    axios.defaults.withCredentials = true;
    axios.get("http://localhost:3001/profile").then(response => {
      if (response.status === 200) {
        console.log(response.data);
        var data = response.data;
        this.setState({
          FName: data.FName,
          LName: data.LName,
          email: data.email,
          phone_number: data.phone_number,
          about_me: data.about_me,
          country: data.country,
          city: data.city,
          gender: data.gender,
          school: data.school,
          hometown: data.hometown,
          languages: data.languages,
          company: data.company,
          profile_image: data.profile_image
        });

        //Download Image
        console.log("Profile Photo Name: ", data.profile_image);

        //Download image
        axios
          .post("http://localhost:3001/download/" + data.profile_image)
          .then(response => {
            let imagePreview = "data:image/jpg;base64, " + response.data;
            this.setState({
              ProfileImagePreview: imagePreview
            });
          });
      }
    });
  }

  handleChange = e => {
    if (e.target.name === "profile_image") {
      console.log(e.target.files);
      var profilePhoto = e.target.files[0];
      var data = new FormData();
      data.append("photos", profilePhoto);
      axios.defaults.withCredentials = true;
      axios.post("http://localhost:3001/upload", data).then(response => {
        if (response.status === 200) {
          console.log("Profile Photo Name: ", profilePhoto.name);

          //Download image
          axios
            .post("http://localhost:3001/download/" + profilePhoto.name)
            .then(response => {
              let imagePreview = "data:image/jpg;base64, " + response.data;
              this.setState({
                profile_image: profilePhoto.name,
                ProfileImagePreview: imagePreview
              });
            })
            .catch(err => {
              if (err) {
                this.setState({
                  redirectError: true
                });
              }
            });
        }
      });
    } else {
      this.setState({
        [e.target.name]: e.target.value
      });
    }
  };

  saveChanges = e => {
    e.preventDefault();
    axios.defaults.withCredentials = true;

    const data = {
      FName: this.state.FName,
      LName: this.state.LName,
      email: this.state.email,
      phone_number: this.state.phone_number,
      school: this.state.school,
      hometown: this.state.hometown,
      languages: this.state.languages,
      company: this.state.company,
      profile_image: this.state.profile_image,
      about_me: this.state.about_me,
      country: this.state.country,
      city: this.state.city,
      gender: this.state.gender
    };

    console.log("Data in save profile: ", data);
    axios
      .post("http://localhost:3001/profile", data)
      .then(response => {
        if (response.status === 200) {
          console.log(" profile update successful");
          this.setState({ successUpdate: true });
        }
      })
      .catch(err => {
        if (err) {
          this.setState({
            redirectError: true
          });
        }
      });
  };

  render() {
    let redrirectVar = null;
    if (!cookie.load("cookie")) {
      redrirectVar = <Redirect to="/login" />;
    }

    if (this.state.redirectError === true) {
      redrirectVar = <Redirect to="/error" />;
    }

    let successUpdated = null;
    if (this.state.successUpdate) {
      successUpdated = (
        <div>
          <div className="alert alert-danger" role="alert">
            <strong>Profile updated successfuly!</strong>
          </div>
        </div>
      );
    }

    let profileImageData = (
      <img
        src="https://img.freepik.com/free-icon/user-filled-person-shape_318-74922.jpg?size=338c&ext=jpg"
        alt="logo"
      />
    );
    if (this.state.ProfileImagePreview) {
      profileImageData = (
        <img src={this.state.ProfileImagePreview} alt="logo" />
      );
    }
    return (
      <div>
        <div className="container">
          {redrirectVar}
          <div className="center-content profile-heading">
            {profileImageData}
            <h3>
              {this.state.FName} {this.state.LName}
            </h3>
            <p />
          </div>
          <div className="container profile-content">
            <div className="row">
              <div className="col-8 border">
                <div className="headline-text">
                  <h4>
                    <strong>Profile Information</strong>
                  </h4>
                  {successUpdated}
                </div>
                <div className="profile-form-content">
                  <div className="form-group">
                    <input
                      type="text"
                      name="FName"
                      id="firstname"
                      className="form-control form-control-lg"
                      placeholder="First Name"
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
                      placeholder="Last Name"
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
                      name="gender"
                      id="gender"
                      className="form-control form-control-lg"
                      placeholder="Gender"
                      onChange={this.handleChange}
                      value={this.state.gender}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="profile_image">
                      <strong>Profile Image : </strong>
                    </label>
                    <br />
                    <input
                      type="file"
                      name="profile_image"
                      id="profile_image"
                      className="btn btn-lg photo-upload-btn"
                      onChange={this.handleChange}
                      className="btn btn-lg photo-upload-btn"
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
      </div>
    );
  }
}

export default Profile;
