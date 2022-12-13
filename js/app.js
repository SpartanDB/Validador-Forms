let validarConfig = {
    items: {
        usuario: {
            expresion: 'nombreEspecial',
            select: false,
            texto: 'El usuario tiene que ser de 4 a 16 dígitos y solo puede contener numeros, letras y guion bajo.',
        },
        nombre: {
            expresion: 'nombre',
            select: false,
            texto: 'El nombre tiene que ser de maximo 16 dígitos y solo puede contener numeros, letras y guion bajo.',
        },
    },
    idMensaje: 'formulario__mensaje',
    idBoton: 'btnSubmit',
};

let validarFormulario = new ValidadorForms(validarConfig);

let validarConfig2 = {
    items: {
        usuario2: {
            expresion: 'nombreEspecial',
            select: false,
            texto: 'El usuario tiene que ser de 4 a 16 dígitos y solo puede contener numeros, letras y guion bajo.',
        },
    },
    idMensaje: 'formulario__mensaje2',
    idBoton: 'btnSubmit2',
};

let validarFormulario2 = new ValidadorForms(validarConfig2);

document.addEventListener('DOMContentLoaded', function () {
    let f = document.getElementById('formulario');
    f.addEventListener('submit', (e) => {
        e.preventDefault();
        console.log('hizo click 1');
    });
    let f2 = document.getElementById('formulario2');
    f2.addEventListener('submit', (e) => {
        e.preventDefault();
    });

    validarFormulario.iniciar();
    validarFormulario2.iniciar();

    let boton = document.getElementById('boton');
    boton.addEventListener('click', (e) => {
        console.log(validarFormulario.esValido);
        console.log(validarFormulario2.esValido);
    });
});
