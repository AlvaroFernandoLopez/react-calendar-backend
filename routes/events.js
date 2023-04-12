const {Router, response}= require('express');
const { obtenerEvento, createEvent, deleteEvent, actualizarEvent } = require('../controllers/events');
const router= Router(); 
const {check} = require('express-validator');
const { validarCampos } = require('../middlewares/validarCampos');
const {isDate}= require('../helpers/isDate');
const { validarJWT } = require('../middlewares/validatJWT');


router.use(validarJWT);
router.get('/obtener',obtenerEvento );

router.post('/create',[
    check('title',' el titulo es obligatorio').not().isEmpty(), 
    check('start',' fecha de inicio es obligatoria').custom(isDate),
    validarCampos
], createEvent);

router.put('/:id', actualizarEvent );

router.delete('/:id',deleteEvent );

module.exports= router;