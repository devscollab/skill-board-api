const mongoose = require("mongoose");

// Not Sure how to use Timestamps in Mongoose ,so please check it
const schemaOptions = {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  };

const superUserSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  Login: {
    email: {
      type: String,
      required: true,
      match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      match: /^[0-9]{10}$/,
      required: true,
    },
    linkedin: {
      type: String,
      required: true,
      match: /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi,
    },
    github: {
      type: String,
      required: true,
      match: /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi,
    },
    name: {
      type: String,
      required: true,
    },
  },
  Optionals: {
    introduction: {
      type: String,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      required: true
    },
    age: {
      type: Number,
      min: 10,
      max: 100,
      required: true
    },
    mother_tongue: {
      type: String,
    },
    languages_known: [{ type:String }],
  },
  MetaData: {
    timestamp: {
      type: Date,
      default: Date.now()
    },
    hasAdminAccess: {
        type: Boolean,
        required: true
    },
    github_metadata_object: {
        type: Object,
    },
  },
},schemaOptions);

module.exports = mongoose.model("SuperUser", superUserSchema);


// I have made a few changes in types I have mentioned them below

// Required fields for SuperUser
// ----------------------Login
// Email: str
// password: str
// phone: Number/str           -> Number
// Name: str
// linkedIn: str
// github: str
// --------------------------Optionals
// introduction - str
// gender - str             -> String, added enum, req true
// age - number             -> Number, added min/max, req true
// mother tongue - str
// languages known - str    -> Array of Strings
// -------------------------Meta Data
// timestamp - str
// hasAdminAccess - boolean
// github metadata object - object
