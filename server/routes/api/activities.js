const router = require('express').Router();
const jwt = require("jsonwebtoken");

const { getActivity, getActivities, createActivity, updateActivity, deleteActivity } = require("../../controllers/activities");


router.post("/", [authenticate], createActivity);
router.get("/", [authenticate], getActivities);
router.get("/:id", getActivity);
router.put("/:id", [authenticate], updateActivity);
router.delete("/:id", [authenticate], deleteActivity);

function authenticate(req, res, next) {
    const token = req.get("Authentication") || req.cookies.token;
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
