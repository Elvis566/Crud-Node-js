const express = require('express')
const router = express.Router()

const conexion = require('./database/db')

router.get('/', (req, res)=>{
   res.render('index')
   // conexion.query('SELECT ')
})

// ruta para acceder a la viste de crear registro 
router.get('/create',(rep, res)=>{
   res.render('empleados');
})

const crud = require('./controllers/crud');
router.post('/save', crud.save);


module.exports = router