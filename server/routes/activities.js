const router = require('express').Router();

const { getActivity, createActivity, updateActivity, deleteActivity } = require("../controllers/activities");

router.post("/", createActivity);
router.get("/:id", getActivity);
router.put("/:id", updateActivity);
router.delete("/:id", deleteActivity);

module.exports = router;
