let flag = false;
let expresiones = {
    usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
    nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    nombre2: /^[a-zA-Z\s]{1,40}$/, // Letras y espacios.
    nombreEspecial: /^[a-zA-ZÀ-ÿ0-9\_\-\s]{1,40}$/,
    password: /^.{4,12}$/, // 4 a 12 digitos.
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    telefono: /^[0-9\+]{7,14}$/, // 7 a 14 numeros.
    seleccion: /^[a-zA-Z0-9\_\-]{1,100}/, // letras y numeros sin maximo
    texto: /^[a-zA-ZÀ-ÿ0-9\s\-\_]{0,200}$/, // letras, numeros, especio, guio y guion bajo , de 0 a 200 caracteres
    alfa: /^[a-zA-Z0-9]{1,40}$/, // alfanumerico  1 a 40 caracteres
    numero: /^[0-9]{1,40}$/, // numeros  1 a 40 caracteres
    tarjeta: /^[0-9]{4,40}$/, // numeros  4 a 40 caracteres
    rut: /^(\d{2}\.\d{3}\.\d{3}-)([kK]{1}$|\d{1}$)/, // rut chileno
    genero: /^[a-zA-Z0-9\_\-]{0,2}/, // de cero a 2 caracteres
    blanco: /^$/, // en blanco
};
let campos = {};
let items = {};

let validarCampo = (key) => {
    let expresion = expresiones[items[key].expresion];
    let input = document.getElementById(key);

    if (expresion.test(input.value)) {
        document
            .getElementById(`validar__${input.id}`)
            .classList.remove('formulario__grupo-incorrecto');
        document
            .getElementById(`validar__${input.id}`)
            .classList.add('formulario__grupo-correcto');
        document
            .querySelector(`#validar__${input.id} i`)
            .classList.add('fa-check-circle');
        document
            .querySelector(`#validar__${input.id} i`)
            .classList.remove('fa-times-circle');
        document
            .querySelector(`#validar__${input.id} .formulario__input-error`)
            .classList.remove('formulario__input-error-activo');
        campos[input.id] = true;
    } else {
        document
            .getElementById(`validar__${input.id}`)
            .classList.add('formulario__grupo-incorrecto');
        document
            .getElementById(`validar__${input.id}`)
            .classList.remove('formulario__grupo-correcto');
        document
            .querySelector(`#validar__${input.id} i`)
            .classList.add('fa-times-circle');
        document
            .querySelector(`#validar__${input.id} i`)
            .classList.remove('fa-check-circle');
        document
            .querySelector(`#validar__${input.id} .formulario__input-error`)
            .classList.add('formulario__input-error-activo');
        campos[input.id] = false;
    }
};

let validarSelects = (key) => {
    // funcion para validar select razor
    validarCampo(key);
};

let validarFormulario = (e) => {
    let key = e.target.id;
    items[key].select ? validarSelects(key) : validarCampo(key);
};

let hacerFocus = () => {
    for (const [key, element] of Object.entries(items)) {
        document.getElementById(element.id).focus();
        document.getElementById(element.id).blur();
    }
};

var formsValidador = (idMensaje, idBtn, itemsF) => {
    // ------------------------
    items = itemsF;

    let boton = document.getElementById(idBtn);

    for (const [key, element] of Object.entries(items)) {
        input = document.getElementById(element.id);

        campos[element.id] = false;

        input.addEventListener('keyup', validarFormulario);
        input.addEventListener('blur', validarFormulario);
    }

    boton.addEventListener('click', (e) => {
        hacerFocus();

        let comprobar = Object.values(campos);

        if (!comprobar.includes(false)) {
            flag = true;

            document
                .querySelectorAll('.formulario__grupo-correcto')
                .forEach((icono) => {
                    icono.classList.remove('formulario__grupo-correcto');
                });
        } else {
            flag = false;

            document
                .getElementById(idMensaje)
                .classList.add('formulario__mensaje-activo');
            setTimeout(() => {
                document
                    .getElementById(idMensaje)
                    .classList.remove('formulario__mensaje-activo');
            }, 5000);
        }
    });
};

var esValido = () => {
    hacerFocus();

    // let comprobar = Object.values(campos);

    // if (!comprobar.includes(false)) {
    //     flag = true;

    //     document
    //         .querySelectorAll('.formulario__grupo-correcto')
    //         .forEach((icono) => {
    //             icono.classList.remove('formulario__grupo-correcto');
    //         });
    // } else {
    //     flag = false;

    //     document
    //         .getElementById(idMensaje)
    //         .classList.add('formulario__mensaje-activo');
    //     setTimeout(() => {
    //         document
    //             .getElementById(idMensaje)
    //             .classList.remove('formulario__mensaje-activo');
    //     }, 5000);
    // }
    console.log('hace algo ');
    // console.log(flag);
    return flag;
};
