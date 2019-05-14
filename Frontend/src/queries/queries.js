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

const search = gql`
  query search($searchText: String, $startDate: String, $endDate: String) {
    search(searchText: $searchText, startDate: $startDate, endDate: $endDate) {
      properties {
        PropertyId
        Headline
        Description
        Country
        StreetAddress
        City
        State
        ZipCode
        PropertyType
        Bedrooms
        Accomodates
        Bathrooms
        Photos
        Currency
        Baserate
        AvailabilityStartDate
        AvailabilityEndDate
        MinStay
        Ownername
        OwnerId
      }
    }
  }
`;

const property = gql`
  query property($propertyId: String) {
    property(propertyId: $propertyId) {
      PropertyId
      Headline
      Description
      Country
      StreetAddress
      City
      State
      ZipCode
      PropertyType
      Bedrooms
      Accomodates
      Bathrooms
      Photos
      Currency
      Baserate
      AvailabilityStartDate
      AvailabilityEndDate
      MinStay
      Ownername
      OwnerId
    }
  }
`;
const tripDetails = gql`
  query tripDetails($Email: String) {
    tripDetails(Email: $Email) {
      trips {
        PropertyId
        Bookingstartdate
        Bookingenddate
        TotalCost
        Ownername
        Travelername
        Headline
        PropertyType
        PropertyBedrooms
        PropertyBathrooms
        PropertyAccomodates
      }
    }
  }
`;

var postedProperties = gql`
  query postedProperties($Email: String) {
    postedProperties(Email: $Email) {
      postedProperties {
        PropertyId
        AvailabilityStartDate
        AvailabilityEndDate
        Baserate
        Headline
        PropertyType
      }
    }
  }
`;
export {
  login,
  profile,
  search,
  property,
  tripDetails,
  postedProperties,
  courses
};
