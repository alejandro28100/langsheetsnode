const mongoose = require("mongoose");
const User = mongoose.model("User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

async function getUsers(req, res) {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(400).send({
            code: error.name,
            message: error.message
        })
    }
}

async function getUserInfo(req, res) {
    const { userID } = req.user;
    try {
        const user = await User.findById(userID);
        res.json(getPublicInfo(user));
    } catch (error) {
        res.status(401).json(error);
    }
}

async function createUser(req, res) {
    try {
        const user = new User(req.body);
        user.createHashedPassword(user.password);
        await user.validate();
        const document = await user.save()
        res.status(201).send(document);
    } catch (error) {
        //Send error if validation fails
        res.status(400).send({
            code: error.name,
            message: error.message
        })
    }
}

async function deleteUser(req, res) {
    const { id } = req.params;

    try {
        const document = await User.findOneAndDelete({ _id: id })
        if (!document) {
            throw { message: "El usuario no existe", code: "inexistent-user" };
        }
        res.send({
            message: 'success'
        });
    } catch (error) {
        res.status(500).send(error);
    }

}

async function loginUser(req, res) {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email: email });
        if (!user) throw { code: 'inexistent-user', message: "No existe ninguna cuenta asociada con el correo brindado.\n Verifique su correo" };

        const isCorrect = bcrypt.compareSync(password, user.password);
        if (!isCorrect) throw { code: 'wrong-password', message: "La contraseña es incorrecta" };

        const publicUser = getPublicInfo(user);
        const token = jwt.sign({ userID: publicUser.id }, process.env.SECRET_TOKEN);
        res.json({
            ...publicUser,
            token
        });

    } catch (error) {
        res.status(401).json(error);
    }
}

function getPublicInfo(user) {
    return {
        id: user._id,
        name: user.name,
        lastName: user.lastName,
        activities: user.activities,
        email: user.email,
        createdAt: user.createdAt
    }
}
module.exports = {
    // getUser,
    getUserInfo,
    getUsers,
    createUser,
    deleteUser,
    loginUser
    // updateUser,
}