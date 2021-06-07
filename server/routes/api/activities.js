const router = require('express').Router();
const jwt = require("jsonwebtoken");
const { authenticate } = require("../../utils/permissions");

const { getActivity, getActivities, createActivity, updateActivity, deleteActivity } = require("../../controllers/activities");


router.post("/", [authenticate], createActivity);
router.get("/", [authenticate], getActivities);
router.get("/:id", getActivity);
router.put("/:id", [authenticate], updateActivity);
router.delete("/:id", [authenticate], deleteActivity);

module.exports = router;
