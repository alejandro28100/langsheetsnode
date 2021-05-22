const mongoose = require("mongoose");

const Activity = mongoose.model("Activity");

async function getActivity(req, res) {
    const { id } = req.params;

    try {
        const document = await Activity.findById(id);
        if (!document) return res.status(404).send();

        res.send(document);
    } catch (error) {
        res.status(500).send();
    }


}

async function createActivity(req, res) {

    const activity = new Activity(req.body);

    try {
        await activity.validate();

        activity
            .save()
            .then(result => {
                res.status(201).send(result);
            })
            .catch(err => {
                res.send(err);
            });
    } catch (error) {
        //Send error if validation fails
        res.status(400).send({
            code: error.name,
            message: error.message
        })
    }
}

async function updateActivity(req, res) {
    const { id } = req.params;

    let modifications = {}

    //make sure only certains props can be modified from req.body 
    Object.keys(req.body).forEach(prop => {
        if (["title", "content", "lang", "published"].includes(prop)) {
            let value = req.body[prop];
            //make sure props are not undefined or null 
            if (value !== undefined || value !== null) {
                modifications[prop] = value;
            }
        }
    })

    try {
        const doc = await Activity.findOneAndUpdate({ _id: id }, modifications, { new: true, useFindAndModify: false });
        res.send(doc);

    } catch (error) {
        res.send(error);
    }
}

async function deleteActivity(req, res) {
    const { id } = req.params;

    try {
        await Activity.deleteOne({ _id: id })
        res.send();
    } catch (error) {
        res.status(500).send(error);
    }

}


module.exports = {
    getActivity,
    createActivity,
    updateActivity,
    deleteActivity
}