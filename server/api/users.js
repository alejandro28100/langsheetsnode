const router = require('express').Router();

const { createUser, deleteUser } = require("../controllers/users");


router.post("/", createUser);
router.delete("/:id", deleteUser);
// router.get("/", getActivities);
// router.get("/:id", getActivity);
// router.put("/:id", updateActivity);

module.exports = router;
