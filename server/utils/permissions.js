const jwt = require("jsonwebtoken");

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
    try {
        const user = jwt.verify(token, process.env.SECRET_TOKEN);
        //Make user available in the request object
        req.user = user;

        next();
    } catch (error) {
        res.status(401).json({
            message: "El token es inválido",
            name: "invalid-token"
        });
    }
}


//Make sure the user id form req.user is the same as the one used to perform certain operations (UPDATE, DELETE, GET)
function verifyPermission(req, res, next) {
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

//Make sure an activity belongs to the person is triying to update it
function verifyOwnership(req, res, next) {
    const { user } = req;
    const { id } = activity.author;

    if (id !== user.userID) {
        res.json({
            code: 'forbidden',
            message: "No tienes los permisos para realizar esta acción"
        })
        return;
    }
    next();
}

module.exports = {
    verifyOwnership,
    verifyPermission,
    authenticate
}