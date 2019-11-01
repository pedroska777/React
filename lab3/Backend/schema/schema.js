const graphql = require("graphql");
//const _ = require('lodash');
var Model = require("../DatabaseConnection");
var bcrypt = require("bcrypt-nodejs");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLBoolean,
  GraphQLDate
} = graphql;

const ProfileType = new GraphQLObjectType({
  name: "ProfileType",
  fields: () => ({
    userID: { type: GraphQLString },
    role: { type: GraphQLString },
    username: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    FName: { type: GraphQLString },
    LName: { type: GraphQLString },
    profile_image: { type: GraphQLString },
    phone_number: { type: GraphQLString },
    about_me: { type: GraphQLString },
    city: { type: GraphQLString },
    country: { type: GraphQLString },
    company: { type: GraphQLString },
    school: { type: GraphQLString },
    hometown: { type: GraphQLString },
    languages: { type: GraphQLString },
    gender: { type: GraphQLString }
  })
});

const Course = new GraphQLObjectType({
  name: "Course",
  fields: () => ({
    courseID: { type: GraphQLString },
    course_name: { type: GraphQLString },
    course_dept: { type: GraphQLString },
    course_description: { type: GraphQLString },
    course_room: { type: GraphQLString },
    course_capacity: { type: GraphQLString },
    waitlist_capacity: { type: GraphQLString },
    course_term: { type: GraphQLString },
    instructorID: { type: GraphQLString },
    instructor_name: { type: GraphQLString }
  })
});

const Registration = new GraphQLObjectType({
  name: "Registration",
  fields: () => ({
    courseID: { type: GraphQLString },
    instructorID: { type: GraphQLString },
    instructor_name: { type: GraphQLString },
    userID: { type: GraphQLString },
    waitlisted: { type: GraphQLString }
  })
});

const loginResult = new GraphQLObjectType({
  name: "loginResult",
  fields: () => ({
    result: { type: GraphQLBoolean },
    userData: { type: ProfileType }
  })
});

const signupResult = new GraphQLObjectType({
  name: "signupResult",
  fields: () => ({
    success: { type: GraphQLBoolean },
    duplicateUser: { type: GraphQLBoolean }
  })
});

const createCourseResult = new GraphQLObjectType({
  name: "createCourseResult",
  fields: () => ({
    success: { type: GraphQLBoolean }
  })
});

const courseResult = new GraphQLObjectType({
  name: "courseResult",
  fields: () => ({
    success: { type: GraphQLBoolean }
  })
});

const registration = new GraphQLObjectType({
  name: "registration",
  fields: () => ({
    courseID: { type: GraphQLString },
    instructorID: { type: GraphQLString },
    instructor_name: { type: GraphQLString },
    userID: { type: GraphQLString },
    waitlisted: { type: GraphQLString }
  })
});

const registrationResult = new GraphQLObjectType({
  name: "registrationResult",
  fields: () => ({
    registrations: { type: new GraphQLList(registration) }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: () => ({
    login: {
      type: loginResult,
      args: {
        UserID: {
          type: GraphQLString
        },
        Password: {
          type: GraphQLString
        }
      },
      async resolve(parent, args) {
        console.log("args for login: ", args);
        var isAuthenticated = false;
        var profileData = {};

        await Model.userDetail.findOne(
          {
            userID: args.UserID
          },
          (err, user) => {
            if (err) {
              isAuthenticated = false;
            } else {
              console.log("result2", user);

              if (!bcrypt.compareSync(args.Password, user.password)) {
                console.log("Invalid Credentials!");
                //callback(null, null);
                isAuthenticated = false;
              } else {
                console.log("Corect Credentials!");
                isAuthenticated = true;

                profileData = user;
              }
            }
          }
        );

        console.log("isauth", isAuthenticated);
        console.log("Profile Data in login", profileData);
        if (isAuthenticated == true) {
          var result = {
            result: true,
            userData: profileData
          };
        } else {
          var result = {
            result: false
          };
        }
        return result;
      }
    },
    profile: {
      type: ProfileType,
      args: {
        UserID: {
          type: GraphQLString
        }
      },
      async resolve(parent, args) {
        console.log("args for profile: ", args);
        var profileData = await Model.userDetail
          .findOne({
            userID: args.UserID
          })
          .catch(err => {});

        return profileData;
      }
    },
    courses: {
      type: new GraphQLList(Course),
      args: {},
      async resolve(parent, args) {
        let courseList = await Model.courses.find({}).catch(err => {});
        console.log("courseList", courseList);

        return courseList || [];
      }
    },
    Sregistrations: {
      type: new GraphQLList(Registration),
      args: {
        UserID: {
          type: GraphQLString
        }
      },
      async resolve(parent, args) {
        console.log("args for Sregistration: ", args);

        let user = await Model.registration
          .find({ userID: args.UserID })
          .catch(errr => {});
        return user || [];
      }
    },
    Fregistrations: {
      type: new GraphQLList(Registration),
      args: {
        instructor_name: {
          type: GraphQLString
        }
      },
      async resolve(parent, args) {
        console.log("args for Fregistration: ", args);

        let registrationList = await Model.registration
          .find({ instructor_name: args.instructor_name })
          .catch(err => {});

        return registrationList || [];
      }
    }
  })
});

const updateProfileResult = new GraphQLObjectType({
  name: "updateProfileResult",
  fields: () => ({
    success: { type: GraphQLBoolean }
  })
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: () => ({
    createCourse: {
      type: createCourseResult,
      args: {
        courseID: { type: GraphQLString },
        course_name: { type: GraphQLString },
        course_dept: { type: GraphQLString },
        course_description: { type: GraphQLString },
        course_room: { type: GraphQLString },
        course_capacity: { type: GraphQLString },
        waitlist_capacity: { type: GraphQLString },
        course_term: { type: GraphQLString },
        instructorID: { type: GraphQLString },
        instructor_name: { type: GraphQLString }
      },

      async resolve(parent, args) {
        console.log("args for createCourse: ", args);
        return new Promise(async (resolve, reject) => {
          var successResult = false;

          const data = {
            courseID: args.courseID,
            course_name: args.course_name,
            course_dept: args.course_dept,
            course_description: args.course_description,
            course_room: args.course_room,
            course_capacity: args.course_capacity,
            waitlist_capacity: args.waitlist_capacity,
            course_term: args.course_term,
            instructorID: args.userID,
            instructor_name: args.instructor_name
          };
          Model.courses.create(data, (err, result) => {
            if (err) {
              console.log("Error in creating connection!");
            } else {
              console.log("Course created!");
              successResult = true;
              var resultData = {
                success: successResult
              };
              resolve(resultData);
            }
          });
        });
      }
    },

    signup: {
      type: signupResult,
      args: {
        UserID: {
          type: GraphQLString
        },
        FirstName: {
          type: GraphQLString
        },
        LastName: {
          type: GraphQLString
        },
        Email: {
          type: GraphQLString
        },
        Password: {
          type: GraphQLString
        },
        Role: {
          type: GraphQLString
        }
      },

      async resolve(parent, args) {
        console.log("args for signup: ", args);
        return new Promise(async (resolve, reject) => {
          var successResult = false;
          var duplicateUserResult = false;
          await Model.userDetail.findOne(
            {
              userID: args.UserID
            },
            (err, user) => {
              if (err) {
              } else {
                if (user) {
                  console.log("User Exists!", user);

                  console.log("Duplicate user");
                  duplicateUserResult = true;

                  var resultData = {
                    success: successResult,
                    duplicateUser: duplicateUserResult
                  };
                  resolve(resultData);
                } else {
                  const hashedPassword = bcrypt.hashSync(args.Password);
                  var user = new Model.userDetail({
                    userID: args.UserID,
                    username: args.Email,
                    password: hashedPassword,
                    FName: args.FirstName,
                    LName: args.LastName,
                    email: args.Email,
                    role: args.Role
                  });
                  console.log("User saving..");
                  user.save().then(doc => {
                    console.log("User saved successfully.", doc);
                    successResult = true;
                    console.log("EOF");
                    var resultData = {
                      success: successResult,
                      duplicateUser: duplicateUserResult
                    };
                    resolve(resultData);
                  });
                }
              }
            }
          );
        });
      }
    },

    updateProfile: {
      type: updateProfileResult,
      args: {
        FName: { type: GraphQLString },
        LName: { type: GraphQLString },
        email: { type: GraphQLString },
        phone_number: { type: GraphQLString },
        about_me: { type: GraphQLString },
        country: { type: GraphQLString },
        city: { type: GraphQLString },
        gender: { type: GraphQLString },
        school: { type: GraphQLString },
        hometown: { type: GraphQLString },
        languages: { type: GraphQLString },
        company: { type: GraphQLString },
        userID: { type: GraphQLString }
      },

      async resolve(parent, args) {
        console.log("update progile args", args);
        await Model.userDetail.findOne(
          {
            userID: args.userID
          },
          (err, user) => {
            if (err) {
              console.log("Unable to fetch user details.", err);
            } else {
              console.log("Userdetails", user);

              user.FName = args.FName;
              user.LName = args.LName;
              user.email = args.Email;
              user.about_me = args.about_me;
              user.country = args.country;
              user.city = args.city;
              user.gender = args.gender;
              user.hometown = args.hometown;
              user.school = args.school;
              user.company = args.company;
              user.languages = args.languages;
              user.phone_number = args.phone_number;

              user.save().then(
                doc => {
                  console.log("User details updated successfully.", doc);
                  //callback(null, doc);
                },
                err => {
                  console.log("Unable to save user details.", err);
                  callback(err, null);
                }
              );
            }
          }
        );

        var resultData = {
          success: true
        };

        return resultData;
      }
    }
  })
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
