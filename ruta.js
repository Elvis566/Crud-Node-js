const express = require('express')
const router = express.Router()

const conexion = require('./database/db')

router.get('/', (req, res)=>{
   const buscar = req.query.buscar;

   // Verifica si hay un valor en el campo de búsqueda
   if (buscar) {
       // Si hay un valor, realiza la consulta con filtro
       conexion.query(`SELECT * FROM empleados WHERE departamento LIKE '%${buscar}%'`, (err, resultados) => {
           if (err) {
               throw err;
           } else {
               res.render('index', { resultados: resultados, buscar: buscar });
           }
       });
   } else {
       // Si no hay un valor, muestra todos los empleados
       conexion.query('SELECT * FROM empleados', (err, resultados) => {
           if (err) {
               throw err;
           } else {
               res.render('index', { resultados: resultados });
           }
       });
   }
   
})



// ruta para acceder a la viste de crear registro 
router.get('/create',(rep, res)=>{
   res.render('empleados');
})

const crud = require('./controllers/crud');
router.post('/save', crud.save);


module.exports = router