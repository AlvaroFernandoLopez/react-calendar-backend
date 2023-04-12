

var jwt = require('jsonwebtoken');

const generarJwt=(uid, name)=>{
    const payload= {uid, name};
    return new Promise((resolve, reject)=>{

        jwt.sign(payload, process.env.SECRET_JWT_SEED,{
            expiresIn:'2h'
        }, (err, token)=>{

            if (err){
                console.log(err)
                reject('Error al generar token')
            }
            resolve(token);
        });


        

    })
}

module.exports={generarJwt};