
export function valida(input) {
    const tipoInput = input.dataset.tipo;
    if (validadores[tipoInput]) {
        validadores[tipoInput](input)
    }
    console.log(input.parentElement)
    if (input.validity.valid) {
        input.parentElement.classList.remove('input-container--invalid');
        input.parentElement.querySelector('.input-message-error').innerHTML = ''
    } else {
        input.parentElement.classList.add('input-container--invalid');
        input.parentElement.querySelector('.input-message-error').innerHTML = mostrarError(tipoInput, input)
    }
}

const tipoDeErrores = [
    'valueMissing',
    'typeMismatch',
    'patternMismatch',
    'customError'
]


const mensajesError = {
    name: {
        valueMissing: 'Este campo no pude estar vacío'
    },

    email: {
        valueMissing: 'Este campo no pude estar vacío',
        typeMismatch: 'El correo es incorrecto'
    }, 

    password: {
        valueMissing: 'Este campo no pude estar vacío',
        patternMismatch: 'Al menos 6 caracteres, máximo 12'
    },

    nacimiento: {
        valueMissing: 'Este campo no pude estar vacío',
        customError: 'Debes tener al menos 18 años'
    },

    number: {
        valueMissing: 'Este campo no puede estar vacío',
        patternMismatch: 'El formato requerido es XXXXXXXXXX 10 números'
    },

    direccion: {
        valueMissing: 'Este campo no puede estar vacío',
        patternMismatch: 'La dirección debe contener entre 10 a 40 caracteres.'
    },

    ciudad: {
        valueMissing: 'Este campo no puede estar vacío',
        patternMismatch: 'La ciudad debe contener entre 10 a 40 caracteres.'
    },

    estado: {
        valueMissing: 'Este campo no puede estar vacío',
        patternMismatch: 'El estado debe contener entre 10 a 40 caracteres.'
    },
}

const validadores = {
    nacimiento: input => validarNacimiento(input),
}

function mostrarError(tipoInput, input) {
    let mensaje = ''
    tipoDeErrores.forEach( error => {
        if(input.validity[error]) {
            console.log(input.validity[error])
            mensaje = mensajesError[tipoInput][error]
        }
    })
    return mensaje;
}

function validarNacimiento (input) {
    const fechaCliente = new Date(input.value);
    let mensaje = "";
    
    if (!mayorEdad(fechaCliente)) {
        mensaje = 'Debes tener al menos 18 años'
    }

    input.setCustomValidity(mensaje);
}

function mayorEdad (fecha) {
    const fechaActual = new Date();
    const diferenciaFechas = new Date(
    fecha.getUTCFullYear() + 18, 
    fecha.getUTCMonth(), 
    fecha.getUTCDate()
    );
    return diferenciaFechas <= fechaActual;
}