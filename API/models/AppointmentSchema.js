var mongoose = require("mongoose");

let Schema = mongoose.Schema

let appointmentSchema = new Schema (
    {
        username : {
            type : String,
        },
        registeredCourses : [{
            tutorName : {type : String,},
            time : {type :String,}

        }]
    }
)

let AppointmentSchema = mongoose.model("appPost", appointmentSchema,'appointment');

module.exports = AppointmentSchema;