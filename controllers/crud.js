const conexion = require('../database/db');

exports.save = (req, res)=>{
    const nombre = req.body.nombre;
    const departamento = req.body.departamento;
    const fechacontratacion = req.body.fechacontratacion;
    const salario = req.body.salario;
    const horastrabajo = req.body.horastrabajo;
    conexion.query('INSERT INTO empleados SET ?',{nombre:nombre, departamento:departamento,salario:salario, fechacontratacion:fechacontratacion, horastrabajo:horastrabajo},(error, results)=>{
        if(!nombre || !departamento || !fechacontratacion){
            console.log(error);
        }else{
            res.redirect('/')
        }
    })
}

exports.tareas = (req, res) =>{
    const nombreTarea = req.body.nombreTarea;
    const horasDispuestas = req.body.horas;
    const idEmpleado= req.body.id_empleado;
    const con=true;
    conexion.query('SELECT horastrabajo FROM  empleados WHERE id = ?',[idEmpleado],(error, resultados,con)=>{
        if(error){
            console.log(error);
            res.redirect('/');
        }

        const horasDeTrabajo = resultados[0].horastrabajo;
        if(horasDeTrabajo<horasDispuestas){
            console.log(con);
            res.redirect(`/tareas?${con}`);
        }else{
            conexion.query('INSERT INTO tareas SET?',{tarea:nombreTarea,horasdispuestas:horasDispuestas,id_empleado:idEmpleado}, (error)=>{
                if(error){
                    console.log(error);
                    return res.redirect('/');
                }
                conexion.query('SELECT * FROM empleados',(error, results)=>{
                    if(error){
                        console.log(error);
                    return res.redirect('/');
                    }

                    res.render(`tareas`, {con, resultados:results})
                    // res.redirect('/tareas')
                })
                
            })
        }

    })
}
