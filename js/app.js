// let validarCampos = () => {
//     let items = {
//         usuario: {
//             id: 'usuario',
//             expresion: 'nombreEspecial',
//             select: false,
//         },
//     };

//     formsValidador('formulario__mensaje', 'btnSubmit', items);
// };

let validarConfig = {
    items: {
        usuario: {
            id: 'usuario',
            expresion: 'nombreEspecial',
            select: false,
        },
        nombre: {
            expresion: 'nombre',
            select: false,
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
    });
    let f2 = document.getElementById('formulario2');
    f2.addEventListener('submit', (e) => {
        e.preventDefault();
    });

    // console.log(validarFormulario.area);

    validarFormulario.iniciar('validarFormulario');
    validarFormulario2.iniciar();
});
