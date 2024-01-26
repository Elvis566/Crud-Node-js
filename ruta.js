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

router.get('/tareas',(rep, res)=>{
    let con =false;
    let aux=rep.query.con;
    if(aux){
        con=true;
    }
   conexion.query('SELECT * FROM empleados', (err, resultados,con)=>{
      if(err){
         throw err
      }else{
         res.render('tareas', {con:con, resultados:resultados});
      }
   })
})

router.get('/empleadosPagados',(rep, res)=>{
    conexion.query(`SELECT *
    FROM empleados
    WHERE pagado = ${1}
    ORDER BY fechacontratacion;`, (err, resultados) => {
        if (err) {
            throw err;
        } else {
            conexion.query(`SELECT SUM(salario) AS total FROM empleados WHERE pagado = ${1};`,(error, results)=>{
                if (error) {
                    throw error;
                } else {
                  res.render('empleadosPagados', {resultados:resultados, user:results[0]})
                }
            })
           
        }
    });
    
})



const crud = require('./controllers/crud');
router.post('/save', crud.save);
router.post('/saveTareas', crud.tareas);


module.exports = router