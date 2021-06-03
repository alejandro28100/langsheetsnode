const mongoose = require("mongoose");

const User = mongoose.model("User");

// async function getActivities(req, res) {
//     try {
//         const activities = await Activity.find({});
//         console.log(activities);
//         res.send(activities);
//     } catch (error) {
//         res.send(error)
//     }
// }

// async function getActivity(req, res) {
//     const { id } = req.params;

//     try {
//         const document = await Activity.findById(id);
//         if (!document) return res.status(404).send({
//             message: "The activity requested does not exists"
//         });

//         res.send(document);
//     } catch (error) {
//         switch (error.name) {
//             //cast error happens when a string does not match the MongoDB _id structure
//             case "CastError":
//                 res.status(404).send({ message: "The activity requested does not exists" });
//             default:
//                 res.send(error);
//         }
//     }
// }
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

// async function updateActivity(req, res) {
//     const { id } = req.params;

//     let modifications = {}

//     //make sure only certains props can be modified from req.body 
//     Object.keys(req.body).forEach(prop => {
//         if (["title", "content", "lang", "published"].includes(prop)) {
//             let value = req.body[prop];
//             //make sure props are not undefined or null 
//             if (value !== undefined || value !== null) {
//                 modifications[prop] = value;
//             }
//         }
//     })

//     try {
//         const doc = await Activity.findOneAndUpdate({ _id: id }, modifications, { new: true, useFindAndModify: false });
//         res.send(doc);

//     } catch (error) {
//         res.status(500).send(error);
//     }
// }

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

module.exports = {
    // getUser,
    getUsers,
    createUser,
    deleteUser
    // updateUser,
}