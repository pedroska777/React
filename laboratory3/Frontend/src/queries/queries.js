import { gql } from "apollo-boost";

const login = gql`
  query login($UserID: String, $Password: String) {
    login(UserID: $UserID, Password: $Password) {
      result
      userData {
        userID
        username
        email
        FName
        LName
        about_me
        country
        city
        gender
        hometown
        school
        company
        languages
        phone_number
        role
      }
    }
  }
`;

const profile = gql`
  query profile($UserID: String) {
    profile(UserID: $UserID) {
      userID
      username
      email
      FName
      LName
      about_me
      country
      city
      gender
      hometown
      school
      company
      languages
      phone_number
    }
  }
`;

const Sregistrate = gql`
  query Sregistrations($UserID: String) {
    Sregistrations(UserID: $UserID) {
      courseID

      instructor_name

      waitlisted
    }
  }
`;
const Fregistrate = gql`
  query Fregistrations($instructor_name: String) {
    Fregistrations(instructor_name: $instructor_name) {
      courseID
      instructorID
      instructor_name
      userID
      waitlisted
    }
  }
`;
const courses = gql`
  query courses {
    courses {
      courseID
      course_name
      course_dept
      course_description
      course_room
      course_capacity
      waitlist_capacity
      course_term
      instructorID
      instructor_name
    }
  }
`;

export { login, profile, courses, Sregistrate, Fregistrate };
