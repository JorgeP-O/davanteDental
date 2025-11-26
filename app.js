
                    //Codigo JS para la aplicacion WEB DavanteDent

//Archivo JS cargado
console.log('Archivo javaScript cargado');

//Cargar página HTML antes de empezar
document.addEventListener('DOMContentLoaded', function(){
    console.log('DOM listo');

//Funcion para mostrar los errores
function mostrarError(campoId, mensaje){
    const input = document.getElementById(campoId);
    input.classList.add('is-invalid');
    const feedback = input.nextSibling;
    feedback.textContent = mensaje;
}
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
            mostrarError('nombre', 'El nombre es obligatorio');
            return;
        }
        //Validar apellidos
        const apellidos = document.getElementById('apellidos').value;
        if (apellidos.trim()=== ''){
            mostrarError('apellidos','Los apellidos son obligatorios');
            return;
        }
        //Validar DNI
        const dni = document.getElementById('dni').value;
        const dniRegex = /^[0-9]{8}[A-Za-z]$/;
        if (!dniRegex.test(dni)){
            mostrarError('dni','DNI inválido - deben ser 8 números seguidos de 1 letra');
            return;
        }
        //Validar teléfono
        const telefono = document.getElementById('telefono').value;
        const telefonoRegex = /^[0-9]+$/;
        if (!telefonoRegex.test(telefono)){
            mostrarError('telefono','El teléfono solo puede contener números');
            return;       
        }
        //Validar fecha nacimiento
        const fechaNacimiento = document.getElementById('fechaNacimiento').value;
        const fechaNac = new Date(fechaNacimiento);
        const hoy = new Date();
        if (fechaNacimiento.trim()=== ''){
            mostrarError('fechaNacimiento','La fecha de nacimiento no puede ser futura');
            return;
        }
        if (fechaNac > hoy) {
            mostrarError('fechaNacimiento','La fecha de nacimiento no puede ser futura');
            return;
        }

        //Validar fecha de la cita
        const fechaCita = document.getElementById('fechaCita').value;
        const fechaCitaObj = new Date(fechaCita);
        const ahora = new Date();
        if (fechaCita.trim() === ''){
            mostrarError('fechaCita','La cita debe de ser diferente al día de hoy');
            return;
        }
        if (fechaCitaObj <= ahora){
            mostrarError('fechaCita','La cita debe de ser diferente al día de hoy');
            return;
        }

        console.log('Campos válidos');
    }
});
});




