const router = require('express').Router();
const { authenticate, verifyPermission } = require("../../utils/permissions");

const { createUser, deleteUser, getUsers, getUserInfo, loginUser } = require("../../controllers/users");

router.get("/", getUsers);

router.post("/login", loginUser);

router.post("/", createUser);
router.get("/userInfo", authenticate, getUserInfo);
router.delete("/:id", [authenticate, verifyPermission], deleteUser);





module.exports = router;
