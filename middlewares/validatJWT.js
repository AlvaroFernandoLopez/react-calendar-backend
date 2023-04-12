const {response}= require('express')
var jwt = require('jsonwebtoken');



const validarJWT=(req, res=response, next)=>{
    const token= req.header('x-token');

    if(!token){
        return res.status(401).json({
            ok:false,
            msg:"no viene  el token"
        })
    }


    try {
        const {uid,name}= jwt.verify(
            token,
            process.env.SECRET_JWT_SEED
        );
        req.name=name;
        req.uid=uid;  // creamos estos valores en la request
    } catch (error) {
        
        console.log(error)
        return res.status(401).json({
            ok:false,
            msg:"token no valido"
        })
    }
    next();
}
module.exports={validarJWT}