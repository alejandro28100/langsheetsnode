const router = require('express').Router();
const jwt = require("jsonwebtoken");

const { createUser, deleteUser, getUsers, loginUser } = require("../../controllers/users");

router.get("/login", loginUser);
router.get("/", getUsers);
router.post("/", createUser);
router.delete("/:id", [authenticate, verifyPermisson], deleteUser);

//Make sure the user id form req.user is the same as the one used to perform certain operations (UPDATE, DELETE)
function verifyPermisson(req, res, next) {
    const { user } = req;
    const { id } = req.params;
    if (id !== user.userID) {
        res.json({
            code: 'forbidden',
            message: "No tienes los permisos para realizar esta acción"
        })
        return;
    }
    next();
}

function authenticate(req, res, next) {
    const token = req.get("Authentication");
    if (!token) {
        res.status(401).json({
            message: "El usuario no tiene un token",
            name: "inexistent-token"
        });
        return;
    }
    //Decrypt the token from the request Authentication header 
    const user = jwt.verify(token, process.env.SECRET_TOKEN);
    if (!user) {
        res.status(401).json({
            message: "El token es inválido",
            name: "invalid-token"
        });
        return;
    }
    //Make user available in the request object
    req.user = user;
    next();
}

module.exports = router;
