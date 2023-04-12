
const {response}=require('express');
const {validationResult}= require('express-validator')
const Usuario= require('../models/Usuario');
const {genrarJwt, generarJwt}= require('../helpers/jwt');
// clave IJMpt5Nra5QYdkFF usuario: calendar_sopo
const login=async(req, res=response)=>{
   // manejo de errores
    const {email, password}= req.body; 
   
    try {
        const usuario= await Usuario.findOne({email}); // mira si existe un usuario en la base de datos
        //console.log(usuario)
        if(!usuario){ // si no hay un email igual al que escribe el usuario
           return res.status(400).json({
                ok:false,
                msg:' El email no existe'
            })
        }
        // validar que la contraseñas son iguales
        if(usuario.password !== password){ // valida que las contraseñas sean iguales, la de la base de datos con la que escribe el usuario
            return res.json({
                ok:false,
                msg:' contraseña incorrecta'
            })
        }

        // generar jwt
        const token= await generarJwt(usuario.id, usuario.name);

        res.status(201).json({
            ok:true,
            uid: usuario.id,
            token
            })



    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false,
            msg:'Error, hable con el administrador '
        })
    }


   
    

    
}


const registro=async(req, res=response)=>{ // name , email, password

    const {email}= req.body;
    try {

    // validacion de usuario
    let usuario= await Usuario.findOne({email}); //Busca en la base de datos el usuario

    if(usuario){
        res.status(400).json({
            ok:false,
            msg: 'Un usuario existe con ese correo'
        })
    }
    usuario= new Usuario(req.body); // grabacion en base de datos
    await usuario.save();
    // gwnerar jwt
    const token= await generarJwt(usuario.id, usuario.name);
    res.status(201).json({
        ok:true,
        uid: usuario.id,
        token
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false,
            msg:'Error, hable con el administrador '
        })
    }
    
    
    

    
}
const renew=async(req, res=response)=>{
  
    const {uid, name}= req;
    const token= await generarJwt(uid,name);
    res.json({
    ok:true,
    token
    
    })
}

module.exports={
    login,
    registro,
    renew,
}