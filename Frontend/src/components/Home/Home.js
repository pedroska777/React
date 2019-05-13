import React, { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import DisplayProperties from "../DisplayProperties/DisplayProperties";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import { saveSearchDetailsToStore } from "../../actions/homeAction";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchStartDate: moment(),
      searchEndDate: moment()
    };
    //bind
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleStartDateChange = this.handleStartDateChange.bind(this);
    this.handleEndDateChange = this.handleEndDateChange.bind(this);
    this.handleSearchClick = this.handleSearchClick.bind(this);
  }

  handleInputChange = event => {
    var target = event.target;
    var name = target.name;
    var value = target.value;

    this.setState({
      [name]: value
    });
  };

  handleStartDateChange = date => {
    this.setState({
      searchStartDate: date
    });
  };

  handleEndDateChange = date => {
    this.setState({
      searchEndDate: date
    });
  };

  handleSearchClick = () => {
    var data = {
      searchText: this.state.searchText,
      startDate: this.state.searchStartDate,
      endDate: this.state.searchEndDate,
      guests: this.state.guests
    };

    localStorage.setItem("searchText", this.state.searchText);
    localStorage.setItem("startDate", this.state.searchStartDate);
    localStorage.setItem("endDate", this.state.searchEndDate);
    localStorage.setItem("guests", this.state.guests);

    this.props.saveSearchDetailsToStore(data);
  };

  render() {
    let redrirectVar = null;
    // if(this.props.loginStateStore.result){
    //     if(!this.props.loginStateStore.result.isAuthenticated === true){
    //         redrirectVar = <Redirect to="/login" />
    //     }
    // }
    // else{
    //     redrirectVar = <Redirect to="/login" />
    // }

    return null;
  }
}

//
const mapStateToProps = state => ({
  homeStateStore: state.home,
  loginStateStore: state.login
});

//export default Profile;
export default connect(
  mapStateToProps,
  { saveSearchDetailsToStore }
)(Home);
