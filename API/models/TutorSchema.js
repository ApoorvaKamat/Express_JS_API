
const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let postSchema = new Schema(
  {
    tutorName : {
      type: String,
    },
    tutorDescription: {
      type: String,
    },
    tutorRating : {
      type: Number,
    },
    tutorLevel : {
        type: Number,
    },
    tutorExpertise: {
        type: String,
    },
    tutorNumOfChats :{
        type: Number,
    },
    noOfHrsPerDay: {
        type: Number,
    },
	noOfAppointmentsAvailable : {
        type: Number,
    },
    workingHours : {
        type: String,
    },
    tutorCity : {
        type: String,
      },
      tutorState : {
        type: String,
      },
      tutorCountry : {
        type: String,
      },
  }
);

let Tutor = mongoose.model("post", postSchema,"tutors");

module.exports = Tutor;