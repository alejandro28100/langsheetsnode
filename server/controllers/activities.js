const mongoose = require("mongoose");

const Activity = mongoose.model("Activity");

async function getPublicActivities(req, res) {
    const { user, query } = req;
    const { language, keywords } = query;

    try {
        const filters = {
            published: true,
            private: false,
            //Avoid fetching activities the user has created
            'author.id': {
                $ne: user.userID
            }
        }

        if (language) filters.language = language;
        if (keywords) filters.$text = { $search: keywords };
        console.log(filters);
        const activities = await Activity.find(filters);

        res.send(activities);
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
}

async function getActivities(req, res) {

    const { userID } = req.user;

    try {
        const activities = await Activity
            .find()
            .where("author.id")
            .equals(userID);

        res.send(activities);
    } catch (error) {
        res.send(error)
    }
}

async function getActivity(req, res) {
    const { id } = req.params;

    try {
        const document = await Activity.findById(id);
        if (!document) return res.status(404).send({
            message: "The activity requested does not exists"
        });

        res.send(document);
    } catch (error) {
        switch (error.name) {
            //cast error happens when a string does not match the MongoDB _id structure
            case "CastError":
                res.status(404).send({ message: "The activity requested does not exists" });
            default:
                res.send(error);
        }
    }

}

async function createActivity(req, res) {

    const activity = new Activity(req.body);

    try {
        await activity.validate();

        const result = await activity.save();
        res.status(201).json(result);
    } catch (error) {
        //Send error if validation fails
        res.status(400).json({
            code: error.name,
            message: error.message
        })
    }
}

async function updateActivity(req, res) {
    const { id } = req.params;
    const { property, value } = req.body;
    let modifications = {}

    //make sure only certains props can be modified from req.body 
    if (["title", "content", "lang", "published", "private"].includes(property)) {
        //make sure prop values are not undefined or null 
        if (value !== undefined || value !== null) {
            modifications[property] = value;
        }
    }

    if (Object.keys(modifications).length === 0) {
        res.status(401).send({ message: "Ningún dato fué enviado" });
        return;
    }

    // console.log("Update", modifications, "to ", id);
    try {
        const doc = await Activity.findOneAndUpdate({ _id: id }, modifications, { new: true, useFindAndModify: false });
        res.send(doc);

    } catch (error) {
        res.status(500).send(error);
    }
}

async function deleteActivity(req, res) {
    const { id } = req.params;

    try {
        await Activity.deleteOne({ _id: id })
        res.send({
            message: 'success'
        });
    } catch (error) {
        res.status(500).send(error);
    }

}


module.exports = {
    getPublicActivities,
    getActivity,
    getActivities,
    createActivity,
    updateActivity,
    deleteActivity
}