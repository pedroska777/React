import { gql } from "apollo-boost";

const signup = gql`
  mutation Signup(
    $FirstName: String
    $LastName: String
    $Email: String
    $Password: String
    $Role: String
    $UserID: String
  ) {
    signup(
      FirstName: $FirstName
      LastName: $LastName
      Email: $Email
      Password: $Password
      Role: $Role
      UserID: $UserID
    ) {
      success
      duplicateUser
    }
  }
`;

const createCourse = gql`
  mutation createCourse(
    $courseID: String
    $course_name: String
    $course_dept: String
    $course_description: String
    $course_room: String
    $course_capacity: String
    $waitlist_capacity: String
    $course_term: String
    $instructorID: String
    $instructor_name: String
  ) {
    createCourse(
      courseID: $courseID
      course_name: $course_name
      course_dept: $course_dept
      course_description: $course_description
      course_room: $course_room
      course_capacity: $course_capacity
      waitlist_capacity: $waitlist_capacity
      course_term: $course_term
      instructorID: $instructorID
      instructor_name: $instructor_name
    ) {
      success
    }
  }
`;

const updateProfile = gql`
  mutation updateProfile(
    $FirstName: String
    $LastName: String
    $Email: String
    $PhoneNumber: String
    $Aboutme: String
    $Country: String
    $City: String
    $Gender: String
    $School: String
    $Hometown: String
    $Language: String
    $Company: String
    $UserID: String
  ) {
    updateProfile(
      FName: $FirstName
      LName: $LastName
      email: $Email
      phone_number: $PhoneNumber
      about_me: $Aboutme
      country: $Country
      city: $City
      gender: $Gender
      school: $School
      hometown: $Hometown
      languages: $Language
      company: $Company
      userID: $UserID
    ) {
      success
    }
  }
`;

export { signup, updateProfile, createCourse };
