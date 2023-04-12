
const {response}= require('express');
const Evento= require('../models/eventos');
const res = require('express/lib/response');

const obtenerEvento= async(req, resp= response)=>{

    try {
        const eventos=await Evento.find()
                                  .populate('user','name')
        resp.json({
            ok:true,
            eventos
        })

    } catch (error) {
        console.log(error);
        resp.json({
            ok:false,
            msg:"error para obtener eventos"
        })
    }
  
        
}

const createEvent= async(req, resp= response)=>{

   
    const evento= new Evento(req.body);
    

    try {
        evento.user= req.uid;
        const eventoGuardado= await evento.save();

        resp.json({
            ok:true,
            evento:eventoGuardado
        })
    } catch (error) {
        console.log(error)
        resp.json({
            ok:false,
            msg:"hable con el admin"
        })
    }

}

const actualizarEvent= async(req, resp= response)=>{


    const eventoId= req.params.id;
    const uid=req.uid;   

  

    try {
       const evento= await Evento.findById(eventoId);
        
       if(!evento){
            return resp.status(404).json({
                ok:false,
                msg:"el evento no existe"
            })
        }

        if(evento.user.toString()!==uid){
           return resp.status(401).json({
                ok:false,
                msg:"no tiene permiso para actualizar eventos"
            })
        }

        const nuevoEvento={
            ...req.body,
             user:uid
        }
   
       const eventoActualizado= await Evento.findByIdAndUpdate(eventoId,nuevoEvento);
        resp.json({
            ok:true,
            evento:eventoActualizado
        });

    } catch (error) {
        console.log(error);
        resp.status(500).json({
            ok:false,
            msg:"hable con el administrador"
        })
    }
    
}


const deleteEvent=async(req, resp= response)=>{
    console.log(req)// viene el uid y el name del user
    const eventoId= req.params.id;
    const uid=req.uid;   

    try {
        const evento= await Evento.findById(eventoId);

        if(!evento){
            return resp.status(401).json({
                ok:false,
                msg:'el evento no existe'
            })
        }

        if(evento.user.toString()!==uid){
            return resp.status(401).json({
                ok:false,
                msg:"no tiene permiso para eliminar eventos"
            })
        }

        await Evento.findByIdAndDelete(eventoId)
        resp.json({
            ok:true,
            msg:'Evento eliminado'
        })

    } catch (error) {
        console.log(error)
        resp.status(500).json({
            ok:false,
            msg:'hable con el administrador'
        })
    }

   
}
module.exports={
    obtenerEvento,
    createEvent,
    actualizarEvent,
    deleteEvent
}