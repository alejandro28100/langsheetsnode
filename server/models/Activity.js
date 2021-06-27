const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const { String, Boolean, Date } = Schema.Types;

const AuthorInfo = new Schema({
    name: String,
    lastName: String,
    id: String
}, { _id: false });

const ActivitySchema = new Schema({
    createdAt: {
        type: Date,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    lang: {
        type: String,
        required: true
    },
    published: {
        type: Boolean,
        required: true
    },
    private: {
        type: Boolean,
        required: true
    },
    author: {
        type: AuthorInfo,
        required: true
    }
},
    {
        timestamps: true,
        collection: "Activities"
    }
);
ActivitySchema.index({ content: "text" });
ActivitySchema.plugin(uniqueValidator, { message: "It already exists" });

mongoose.model("Activity", ActivitySchema);