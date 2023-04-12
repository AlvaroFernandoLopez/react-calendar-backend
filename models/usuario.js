const {model, Schema} = require('mongoose');

const UsuarioSchema= Schema({

    name:{
        required:true,
        type: String,
    },
    email:{
        type: String,
        required:true,
        unique:true
    },
    password:{
        type: String,
        required:true,
        
    }
});

module.exports= model('Usuario',UsuarioSchema);