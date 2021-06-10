const router = require('express').Router();
const { authenticate, verifyOwnership } = require("../../utils/permissions");

const { getActivity, getActivities, createActivity, updateActivity, deleteActivity } = require("../../controllers/activities");


router.post("/", [authenticate], createActivity);
router.put("/:id", [authenticate, verifyOwnership], updateActivity);
router.get("/", [authenticate], getActivities);
router.get("/:id", getActivity);
// router.put("/:id", [authenticate], updateActivity);
router.delete("/:id", [authenticate, verifyOwnership], deleteActivity);

module.exports = router;
