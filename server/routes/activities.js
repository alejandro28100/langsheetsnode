const router = require('express').Router();

const { getActivity, getActivities, createActivity, updateActivity, deleteActivity } = require("../controllers/activities");


router.post("/", createActivity);
router.get("/", getActivities);
router.get("/:id", getActivity);
router.put("/:id", updateActivity);
router.delete("/:id", deleteActivity);

module.exports = router;
