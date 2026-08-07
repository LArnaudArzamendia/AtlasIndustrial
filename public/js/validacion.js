// document.addEventListener('DOMContentLoaded', () => {
//     const formulario = document.querySelector('.form-column');
    
//     if (!formulario) return;

//     formulario.addEventListener('submit', (e) => {
//         // Detiene el envío automático para procesar la validación
//         e.preventDefault();

//         // Captura de campos
//         const nombre = document.getElementById('nombre');
//         const correo = document.getElementById('correo');
//         const celular = document.getElementById('celular');
//         const mensaje = document.getElementById('mensaje');

//         let formularioValido = true;

//         // Limpiar errores previos antes de validar
//         limpiarErrores(formulario);

//         // 1. Validación de Nombre (Mínimo 3 letras, sin números)
//         const regexNombre = /^[A-Za-zÁÉÍÓÚáéíóúÑñ' -]{3,50}$/;
//         if (!regexNombre.test(nombre.value.trim())) {
//             mostrarError(nombre, 'Por favor, ingresa un nombre válido (mínimo 3 letras, sin números).');
//             formularioValido = false;
//         }

//         // 2. Validación de Correo electrónico
//         const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         if (!regexCorreo.test(correo.value.trim())) {
//             mostrarError(correo, 'Ingresa un formato de correo electrónico válido (ejemplo@dominio.com).');
//             formularioValido = false;
//         }

//         // 3. Validación de Celular (Opcional, pero si se escribe debe ser formato chileno de 9 dígitos)
//         if (celular.value.trim() !== '') {
//             const regexCelular = /^(\+?56)?\s?9\s?[0-9]{4}\s?[0-9]{4}$/;
//             if (!regexCelular.test(celular.value.trim())) {
//                 mostrarError(celular, 'El número debe tener 9 dígitos (ej: 9 1234 5678 o con +56).');
//                 formularioValido = false;
//             }
//         }

//         // 4. Validación de Mensaje (Mínimo 10 caracteres para evitar spam)
//         if (mensaje.value.trim().length < 10) {
//             mostrarError(mensaje, 'El mensaje es demasiado corto (mínimo 10 caracteres).');
//             formularioValido = false;
//         }

//         // Si todo está correcto, procesa el envío
//         if (formularioValido) {
//             const mensaje=document.getElementById('mensaje-formulario');

//             mensaje.innerHTML=`
//                 <div class="form-message form-success">
//                     ¡Mensaje enviado correctamente! Nos comunicaremos contigo a la brevedad.
//                 </div>
//             `;

//             formulario.reset(); // Limpia los campos del formulario

//             setTimeout(() => {
//                 mensaje.innerHTML = '';
//             }, 5000);
//         }
//     });
// });

// // Función para inyectar los mensajes de error dinámicamente debajo del input
// function mostrarError(elemento, mensaje) {
//     elemento.style.borderColor = '#e53e3e'; // Borde rojo de advertencia
    
//     const mensajeError = document.createElement('span');
//     mensajeError.className = 'error-feedback';
//     mensajeError.style.color = '#e53e3e';
//     mensajeError.style.fontSize = '0.8rem';
//     mensajeError.style.marginTop = '4px';
//     mensajeError.style.fontWeight = '500';
//     mensajeError.innerText = mensaje;
    
//     // Inserta el error dentro del .input-group correspondiente
//     elemento.closest('.input-group').appendChild(mensajeError);
// }

// // Función para remover los estilos de error anteriores
// function limpiarErrores(formulario) {
//     const campos = formulario.querySelectorAll('input, textarea');
//     campos.forEach(campo => {
//         campo.style.borderColor = ''; // Restaura el color de borde original
//     });

//     const erroresExistentes = formulario.querySelectorAll('.error-feedback');
//     erroresExistentes.forEach(error => error.remove());
// }

// ============================================================
// Configuración de EmailJS
// Reemplaza estos 3 valores con los que te entrega tu cuenta
// en https://www.emailjs.com (Email Services / Email Templates
// / Account > General > Public Key).
// ============================================================
const EMAILJS_PUBLIC_KEY = 'sDaOqJ0jBPaq-HACg';
const EMAILJS_SERVICE_ID = 'service_qfp1cqo';
const EMAILJS_TEMPLATE_ID = 'template_aczakjq';

if (typeof emailjs !== 'undefined') {
    emailjs.init(EMAILJS_PUBLIC_KEY);
}

document.addEventListener('DOMContentLoaded', () => {
    const formulario = document.querySelector('.form-column');
    
    if (!formulario) return;

    formulario.addEventListener('submit', (e) => {
        // Detiene el envío automático para procesar la validación
        e.preventDefault();

        // Captura de campos
        const nombre = document.getElementById('nombre');
        const correo = document.getElementById('correo');
        const celular = document.getElementById('celular');
        const mensaje = document.getElementById('mensaje');

        let formularioValido = true;

        // Limpiar errores previos antes de validar
        limpiarErrores(formulario);

        // 1. Validación de Nombre (Mínimo 3 letras, sin números)
        const regexNombre = /^[A-Za-zÁÉÍÓÚáéíóúÑñ' -]{3,50}$/;
        if (!regexNombre.test(nombre.value.trim())) {
            mostrarError(nombre, 'Por favor, ingresa un nombre válido (mínimo 3 letras, sin números).');
            formularioValido = false;
        }

        // 2. Validación de Correo electrónico
        const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regexCorreo.test(correo.value.trim())) {
            mostrarError(correo, 'Ingresa un formato de correo electrónico válido (ejemplo@dominio.com).');
            formularioValido = false;
        }

        // 3. Validación de Celular (Opcional, pero si se escribe debe ser formato chileno de 9 dígitos)
        if (celular.value.trim() !== '') {
            const regexCelular = /^(\+?56)?\s?9\s?[0-9]{4}\s?[0-9]{4}$/;
            if (!regexCelular.test(celular.value.trim())) {
                mostrarError(celular, 'El número debe tener 9 dígitos (ej: 9 1234 5678 o con +56).');
                formularioValido = false;
            }
        }

        // 4. Validación de Mensaje (Mínimo 10 caracteres para evitar spam)
        if (mensaje.value.trim().length < 10) {
            mostrarError(mensaje, 'El mensaje es demasiado corto (mínimo 10 caracteres).');
            formularioValido = false;
        }

        // Si todo está correcto, procesa el envío
        if (formularioValido) {
            enviarFormulario(formulario);
        }
    });
});

// Envía el formulario mediante EmailJS y muestra el resultado al usuario
function enviarFormulario(formulario) {
    const mensajeDiv = document.getElementById('mensaje-formulario');
    const botonEnviar = formulario.querySelector('.btn-submit');

    if (typeof emailjs === 'undefined') {
        mensajeDiv.innerHTML = `
            <div class="form-message form-error">
                No se pudo cargar el servicio de envío. Intenta más tarde o escríbenos directamente a 2jarnaud@gmail.com.
            </div>
        `;
        return;
    }

    botonEnviar.disabled = true;
    botonEnviar.textContent = 'Enviando...';

    emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, formulario)
        .then(() => {
            mensajeDiv.innerHTML = `
                <div class="form-message form-success">
                    ¡Mensaje enviado correctamente! Nos comunicaremos contigo a la brevedad.
                </div>
            `;
            formulario.reset();
        })
        .catch((error) => {
            console.error('Error al enviar el formulario:', error);
            mensajeDiv.innerHTML = `
                <div class="form-message form-error">
                    Ocurrió un problema al enviar tu mensaje. Intenta nuevamente o escríbenos a 2jarnaud@gmail.com.
                </div>
            `;
        })
        .finally(() => {
            botonEnviar.disabled = false;
            botonEnviar.textContent = 'Enviar mensaje';

            setTimeout(() => {
                mensajeDiv.innerHTML = '';
            }, 5000);
        });
}

// Función para inyectar los mensajes de error dinámicamente debajo del input
function mostrarError(elemento, mensaje) {
    elemento.style.borderColor = '#e53e3e'; // Borde rojo de advertencia
    
    const mensajeError = document.createElement('span');
    mensajeError.className = 'error-feedback';
    mensajeError.style.color = '#e53e3e';
    mensajeError.style.fontSize = '0.8rem';
    mensajeError.style.marginTop = '4px';
    mensajeError.style.fontWeight = '500';
    mensajeError.innerText = mensaje;
    
    // Inserta el error dentro del .input-group correspondiente
    elemento.closest('.input-group').appendChild(mensajeError);
}

// Función para remover los estilos de error anteriores
function limpiarErrores(formulario) {
    const campos = formulario.querySelectorAll('input, textarea');
    campos.forEach(campo => {
        campo.style.borderColor = ''; // Restaura el color de borde original
    });

    const erroresExistentes = formulario.querySelectorAll('.error-feedback');
    erroresExistentes.forEach(error => error.remove());
}