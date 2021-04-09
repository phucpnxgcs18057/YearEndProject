const jwt = require('jsonwebtoken');
// const User = require('../../api/models/user');

const key = "adgytrdvcxvnncngfh";

const createToken= (user) => {
    return jwt.sign(user, key);
}

const checkToken = (req, res, next) => {
    const checkHeader = req.headers['x-auth-token'];
    const token = checkHeader;
    if (token == null) 
        return res.json({
            status: 401,
            success: false,
            data: null,
            message: `Unauthorized Access`
        })

    jwt.verify(token, key, (err, user) => {
        if (err) 
            return res.json({
                status: 403,
                success: false,
                data: null,
                message: `Forbidden`
            })
        req.user = user
        next()
    })
}

module.exports = {
    createToken,
    checkToken
}