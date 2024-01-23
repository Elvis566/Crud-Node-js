const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const path=require('path');
const app = express();

// uso del motor de plantillas en el proyecto
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.set('port',process.env.PORT||3000)
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended:false}))
app.use(express.json())

// se establecio un llamado a las rutas dentro del proyecto
// utilizamos el router
app.use('/', require('./ruta'));

// app.listen(3000, ()=>{
//     console.log('El servidor esta corriendo en http://localhost:3000');
// })

app.listen(app.get('port'),()=>{
    console.log(`conexion exitosa con http://localhost:${app.get('port')}`)
})