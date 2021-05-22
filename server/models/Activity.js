const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const { String, Boolean, Date } = Schema.Types;

const ActivitySchema = new Schema(
    {
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
        }
    },
    {
        timestamps: true,
        collection: "Activities"
    }
);

ActivitySchema.plugin(uniqueValidator, { message: "It already exists" });

mongoose.model("Activity", ActivitySchema);