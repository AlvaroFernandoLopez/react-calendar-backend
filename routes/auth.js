
const {Router}= require('express');
const {login, registro, renew}= require('../controllers/auth');
const {check} = require('express-validator');
const {validarCampos}= require('../middlewares/validarCampos');
const{validarJWT}=require('../middlewares/validatJWT')
const router= Router(); 



// router.post('/', (req, resp)=>{ resp.json({ok:true}) })
router.post('/',
    [check('email',' el email es obligatorio').isEmail(),
    check('password',' el password es obligatorio').isLength({min:6}),
    validarCampos
    ],
    login); 
router.post('/new',
    [check('email',' el email es obligatorio').isEmail(),
    check('password',' el password es obligatorio').isLength({min:6}),
    check('name',' el nombre es obligatorio').not().isEmpty(),
    validarCampos

]
,registro);
router.get('/renew',validarJWT, renew);

module.exports= router;