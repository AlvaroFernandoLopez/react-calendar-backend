
const express= require('express');
require('dotenv').config();
// crear servidor de express

const {dbConnection}=require('./database/db_config');

const app= express();
dbConnection();


app.use(express.static('public'));
app.use(express.json());


app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));

// db_user:mern_user  db-password: U3SHiTqu5MKPncIE

//lectura y parseo del body

;
//rutas
/*app.get('/', (req, response)=>{
    console.log('se requiere /')
    response.json({
      nombre:'fernando',
      apellido:'lopez'
    })
})
*/
//escuchar peticiones

app.listen(process.env.PORT, ()=>{
    console.log(`servidor corriendo en puero ${process.env.PORT}`)
})