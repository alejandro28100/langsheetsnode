const router = require('express').Router();
const { authenticate, verifyPermission } = require("../../utils/permissions");

const { createUser, deleteUser, getUsers, getUser, loginUser } = require("../../controllers/users");

router.get("/", getUsers);

router.post("/login", loginUser);

router.post("/", createUser);
router.get("/:id", [authenticate, verifyPermission], getUser);
router.delete("/:id", [authenticate, verifyPermission], deleteUser);





module.exports = router;
