const { Router } = require('express');

const { createUser, loginUser, RenewToken } = require('../controller/auth');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();

router.post('/',
    [
        check('email', 'El email es obligatorio').not().isEmpty(),
        check('password', 'El password debe ser mayor a 5 caracteres').isLength({ min: 6}),
        validateFields
    ], 
    loginUser
)

router.post('/register', 
    [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('lastName', 'El apellido es obligatorio').not().isEmpty(),
        check('numberPhone', 'El teléfono es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').not().isEmpty(),
        check('document', 'El documento es obligatorio').not().isEmpty().isLength({ min: 10}),
        check('password', 'La contraseña es obligatorio y debe ser mayor a 5 caracteres').not().isEmpty().isLength({ min: 6}),
        validateFields
    ], 
    createUser
)

router.get('/renew',
    [
        validateJWT
    ],
    RenewToken
)

module.exports = router;