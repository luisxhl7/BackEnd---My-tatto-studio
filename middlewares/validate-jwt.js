const {response} = require('express')
const jwt = require('jsonwebtoken')

const validateJWT = (req, res = response, next) => {
    try {
        const token = req.header('x-token')
        if (!token) {
            return res.status(401).json({
                status: 401,
                message: 'no hay token en la petición'
            })
        }

        const payload = jwt.verify(
            token,
            process.env.SECRET_JWT_SEED
        )

        req.uid = payload.uid;
        req.name = payload.name;

    } catch (error) {
        return res.status(401).json({
            status: 401,
            message: 'token no valido'
        })
    }
    next()
}

module.exports ={
    validateJWT
}