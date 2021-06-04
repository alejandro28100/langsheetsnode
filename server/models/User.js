const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const { String, Boolean, Date, Array } = Schema.Types;

const UserSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        email: {
            type: String,
            unique: true,
            required: true,
            // regex para formato email
            match: [/\S+@\S+\.\S+/, "Email invalido"]
        },
        password: {
            type: String,
            required: true
        },
        activities: Array
    },
    {
        timestamps: true,
        collection: "Users",
    }
);

UserSchema.methods.createHashedPassword = function (password) {
    const salt = bcrypt.genSaltSync();
    this.password = bcrypt.hashSync(password, salt);
}

UserSchema.methods.validatePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
}

UserSchema.methods.getPublicInfo = function (token) {
    // console.log(this);
    return this;
    // return {
    //     id: this._id,
    //     username: this.username,
    //     lastName: this.lastName,
    //     activities: this.activities,
    //     token,
    // }
}

UserSchema.plugin(uniqueValidator, { message: "It already exists" });

mongoose.model("User", UserSchema);