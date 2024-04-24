const { Router } = require('express');

const { validateJWT } = require('../middlewares/validate-jwt');
const { createAppointment, getAppointments, deleteAppointment, updateAppointment } = require('../controller/agenda');
const { validateFields } = require('../middlewares/validate-fields');
const { check } = require('express-validator');
const { isDate } = require('../helpers/isDate');

const router = Router();

// todas las peticiones de aqui requieren el JWT
router.use( validateJWT )

router.post(
    '/',
    [
        check('title', 'El nombre es obligatorio').not().isEmpty(),
        check('appointmentType', 'El tipo de cita es obligatorio').not().isEmpty(),
        check('nameArtist', 'El nameArtist es obligatorio').not().isEmpty(),
        check('dateInit', 'La fecha de inicio es obligatorio').custom( isDate ),
        check('dateEnd', 'La fecha de final es obligatorio').custom( isDate ),
        validateFields
    ], 
    createAppointment
)

router.get(
    '/',
    getAppointments
)

router.delete(
    '/:id',
    deleteAppointment
)

router.put(
    '/:id',
    [
        check('title', 'El nombre es obligatorio').not().isEmpty(),
        check('nameArtist', 'El nameArtist es obligatorio').not().isEmpty(),
        check('dateInit', 'La fecha de inicio es obligatorio').custom( isDate ),
        check('dateEnd', 'La fecha de final es obligatorio').custom( isDate ),
        validateFields
    ], 
    updateAppointment
)

module.exports = router;