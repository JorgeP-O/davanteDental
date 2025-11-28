
                    //Codigo JS para la aplicacion WEB DavanteDent

//Archivo JS cargado
console.log('Archivo javaScript cargado');

//Cargar página HTML antes de empezar
document.addEventListener('DOMContentLoaded', function(){
    console.log('DOM listo');

//Funcion limpiar errores
function limpiarErrores() {
    const inputConError = document.querySelectorAll('.is-invalid');
    inputConError.forEach(function(input){
        input.classList.remove('is-invalid');
    });

}

//Se captura el envío de cualquier formulario
document.addEventListener('submit', function(event){
    if (event.target.closest('#formCita')){
        event.preventDefault();
        limpiarErrores();
        //validaciones
        //Validar nombre
        const nombre = document.getElementById('nombre').value;
        if (nombre.trim()=== ''){
            document.getElementById('nombre').classList.add('is-invalid');
            return;
        }
        //Validar apellidos
        const apellidos = document.getElementById('apellidos').value;
        if (apellidos.trim()=== ''){
            document.getElementById('apellidos').classList.add('is-invalid');
            return;
        }
        //Validar DNI
        const dni = document.getElementById('dni').value;
        const dniRegex = /^[0-9]{8}[A-Za-z]$/;
        if (!dniRegex.test(dni)){
            document.getElementById('dni').classList.add('is-invalid');
            return;
        }
        //Validar teléfono
        const telefono = document.getElementById('telefono').value;
        const telefonoRegex = /^[0-9]+$/;
        if (!telefonoRegex.test(telefono)){
            document.getElementById('telefono').classList.add('is-invalid');
            return;       
        }
        //Validar fecha nacimiento
        const fechaNacimiento = document.getElementById('fechaNacimiento').value;
        const fechaNac = new Date(fechaNacimiento);
        const hoy = new Date();
        if (fechaNacimiento.trim()=== ''){
            document.getElementById('fechaNacimiento').classList.add('is-invalid');
            return;
        }
        if (fechaNac > hoy) {
            document.getElementById('fechaNacimiento').classList.add('is-invalid');
            return;
        }

        //Validar fecha de la cita
        const fechaCita = document.getElementById('fechaCita').value;
        const fechaCitaObj = new Date(fechaCita);
        const ahora = new Date();
        if (fechaCita.trim() === ''){
            document.getElementById('fechaCita').classList.add('is-invalid');
            return;
        }
        if (fechaCitaObj <= ahora){
            document.getElementById('fechaCita').classList.add('is-invalid');
            return;
        }

        console.log('Campos válidos');
        //Creación de citas
        const cita = {
            id: Date.now(),
            nombre: nombre,
            apellidos: apellidos,
            dni: dni,
            telefono: telefono,
            fechaNacimiento: fechaNacimiento,
            fechaCita: fechaCita,
            observaciones: document.getElementById('observaciones').value
        };
        console.log('Cita creada: ', cita);
        //Comprobamos las citas disponibles
        const citasGuardadas = localStorage.getItem('citasDavante');
        const todasLasCitas = citasGuardadas ? JSON.parse(citasGuardadas) : [];
        console.log('Citas guardadas:', citasGuardadas);
    
        //Añadimos la nueva cita al array
        todasLasCitas.push(cita);

        //Guardamos el array
        localStorage.setItem('citasDavante', JSON.stringify(todasLasCitas));
        console.log('Cita guardada correctamente');
    
        //Se cierra el modal y se limpia el formulario para una mejor experiencia de usuario
        const modal = bootstrap.Modal.getInstance(document.getElementById('modalCita'));
        modal.hide();

        document.getElementById('formCita').reset();
        console.log('Formulario cerrado y limpio');

        //Alerta temporal para verificar la creación de la cita
        const alerta = document.createElement('div');
        alerta.className = 'alert alert-success position-fixed top-0 start-50 translate-middle-x mt-3 z-3 text-center fw-bold rounded w-auto';
        alerta.textContent = 'Cita creada correctamente';
        document.body.appendChild(alerta);

        //Se elimina 3 segundos después
        setTimeout(() =>{
            alerta.remove();
        }, 3000);

    }

});
});

//Limpiar errores al escribir

document.querySelectorAll('#formCita input, #formCita textarea')
.forEach(campo => {
    campo.addEventListener('input', function(){
        if (this.classList.contains('is-invalid')) {
            this.classList.remove('is-invalid');
        }
    });
});

   
    //Cargamos las citas en la tabla
    function cargarCitasTabla() {
        console.log('Cargando las citas en la tabla');
        const tbody = document.getElementById('tbody-citas');
        const citasGuardadas = localStorage.getItem('citasDavante');
        if (!citasGuardadas || JSON.parse(citasGuardadas).length === 0){
            tbody.innerHTML = '<tr><td colspan = "6" class="text-center">No hay citas guardadas</td></tr>';
            console.log('No hay citas guardadas');
            return;
        }

        //Ahora convertimos texto JSON a array de objetos
        const citas= JSON.parse(citasGuardadas);
        console.log('Citas encontradas:', citas);
        
        //Limpiamos la tabla para evitar duplicados y añadimos nuevas filas
        tbody.innerHTML ='';
        citas.forEach(function(cita, index){
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${index + 1}</td>
            <td>${cita.nombre} ${cita.apellidos}</td>
            <td>${cita.dni}</td>
            <td>${cita.telefono}</td>
            <td>${new Date(cita.fechaCita).toLocaleString()}</td>
            <td>
                <button class="btn btn-warning btn-sm">Editar</button>
                <button class="btn btn-danger btn-sm">Eliminar</button>
            </td>
        `;
        tbody.appendChild(fila);
        //Funcionalidades botones eliminar y editar
        fila.querySelector('.btn-danger').addEventListener('click', function(){
            const citasGuardadas = localStorage.getItem('citasDavante');
            const citas = JSON.parse(citasGuardadas);

            const citasActualizadas = citas.filter(function(citaFiltro){
                return citaFiltro.id !== cita.id;
            });
            localStorage.setItem('citasDavante', JSON.stringify(citasActualizadas));
            cargarCitasTabla();
            console.log('Cita eliminada');
        });
        fila.querySelector('.btn-warning').addEventListener('click', function(){
            console.log('Editar cita', cita.id);
        });

        });

    }
//Botón listado de citas
document.addEventListener('DOMContentLoaded', function() {
document.getElementById('listadoCitas').addEventListener('click', function(){
    console.log('Botón listado funcionando');

    //Llamamos a las citas
    cargarCitasTabla();


});
}); 





