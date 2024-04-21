const { Router } = require('express');

const { validateJWT } = require('../middlewares/validate-jwt');
const { addEvent } = require('../controller/agenda');

const router = Router();

// todas las peticiones de aqui requieren el JWT
router.use( validateJWT )

router.post(
    '/',
    addEvent
)

module.exports = router;