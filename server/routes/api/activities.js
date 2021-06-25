const router = require('express').Router();
const { authenticate } = require("../../utils/permissions");

const { getActivity, getPublicActivities, getActivities, createActivity, updateActivity, deleteActivity } = require("../../controllers/activities");

//Get all the public activities
router.get("/public", authenticate, getPublicActivities);

//Get the activities of a user
router.get("/", authenticate, getActivities);

router.get("/:id", getActivity);
router.post("/", authenticate, createActivity);
router.put("/:id", authenticate, updateActivity);
router.delete("/:id", authenticate, deleteActivity);

module.exports = router;
