const { Router } = require('express');

const { createUser, loginUser } = require('../controller/auth');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields');

const router = Router();

router.post(
    '/',
    [
        check('email', 'El email es obligatorio').not().isEmpty(),
        check('password', 'El password debe ser mayor a 6 caracteres').isLength({ min: 6}),
        validateFields
    ], 
    loginUser
)

router.post(
    '/register', 
    [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('lastName', 'El nombre es obligatorio').not().isEmpty(),
        check('numberPhone', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').not().isEmpty(),
        check('password', 'El password es obligatorio').not().isEmpty(),
        validateFields
    ], 
    createUser
)

module.exports = router;