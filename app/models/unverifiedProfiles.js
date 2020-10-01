const mongoose = require("mongoose");
// Using mongoose-float for cgpa
var Float2 = require("mongoose-float").loadType(mongoose, 2);

// Not Sure how to use Timestamps in Mongoose ,so please check it
const schemaOptions = {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
};

const profilesSchema = new mongoose.Schema({
        _id: mongoose.Schema.Types.ObjectId,
        email: {
            type: String,
            required: true,
            match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
        },
        password: {
            type: String,
            required: true,
        },
        personal: {
            name: {
                type: String,
                required: true,
            },
            college: {
                type: String,
                required: true,
            },
            department: {
                type: String,
                required: true,
            },
            year: {
                type: String,
                required: true,
            },
            division: {
                type: String,
                // required: true,
                // Was not sure to keep it mandatory
            },
            rollno: {
                type: String,
                required: true,
            },
        },
        social: {
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
            personalwebsite: {
                type: String,
                match: /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi,
            },
            resume: {
                type: String,
                match: /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi,
            },
            iswhatsapp: {
                type: Boolean,
                required: true,
            },
        },
        // All required
        skills: {
            skill: [{
                type: String,
                required: true,
            }, ],
            projectsforskills: [{
                type: String,
                match: /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi,
                required: true,
            }, ],
            primaryskill: {
                type: String,
                required: true,
            },
            secondaryskill: {
                type: String,
                required: true,
            },
            cgpa: {
                type: Float2,
                required: true,
            },
        },
        rating: {
            type: Number,
            required: true
        },
        optionals: {
            introduction: {
                type: String,
            },
            gender: {
                type: String,
                enum: ["Male", "Female", "Other"],
                required: true,
            },
            age: {
                type: Number,
                min: 10,
                max: 100,
                required: true,
            },
            mother_tongue: {
                type: String,
            },
            languages_known: [{ type: String }],
        },
        metaData: {
            hasAdminAccess: {
                type: Boolean,
                required: true,
            },
            github_metadata_object: {
                type: Object,
            },
        },
    },
    schemaOptions
);

module.exports = mongoose.model('Profile', profilesSchema);