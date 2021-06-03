const router = require('express').Router();

const { createUser, deleteUser, getUsers } = require("../../controllers/users");


router.get("/", getUsers);
router.post("/", createUser);
router.delete("/:id", deleteUser);
// router.get("/", getActivities);
// router.get("/:id", getActivity);
// router.put("/:id", updateActivity);

module.exports = router;
