let ValidadorForms = class {
    flag = false;
    #expresiones = {
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
    #campos = {};
    #idBtnCopia = '';

    constructor(configuracion) {
        this.configuracion = configuracion;
        this.items = configuracion.items;
        this.idMensaje = configuracion.idMensaje;
        this.idBoton = configuracion.idBoton;
    }
    // Getter
    get esValido() {
        this.#hacerFocus();
        this.#verificarValidar();

        let comprobar = Object.values(this.#campos);

        if (!comprobar.includes(false)) {
            this.flag = true;
            document
                .querySelectorAll('.formulario__grupo-correcto')
                .forEach((icono) => {
                    icono.classList.remove('formulario__grupo-correcto');
                });
        } else {
            this.flag = false;
            document
                .getElementById(this.idMensaje)
                .classList.add('formulario__mensaje-activo');
            setTimeout(() => {
                document
                    .getElementById(this.idMensaje)
                    .classList.remove('formulario__mensaje-activo');
            }, 5000);
        }
        return this.flag;
    }

    #insertarClaseMensajeError() {
        let msjNoValido = document.getElementById(`${this.idMensaje}`);
        msjNoValido.classList.add('formulario__mensaje');
    }

    #copiarBorrarBoton() {
        let btnOriginal = document.getElementById(`${this.idBoton}`);
        // let btnCopia = btnOriginal.cloneNode(true);
        let btnCopia = document.createElement('input');
        btnCopia.id = btnOriginal.id + 'copia';
        btnCopia.classList.value = btnOriginal.classList.value;
        btnCopia.type = 'button';
        btnCopia.value = btnOriginal.innerHTML;

        btnOriginal.insertAdjacentElement('beforebegin', btnCopia);
        btnOriginal.style = 'display: none;';
        // btnOriginal.setAttribute('disabled', '');
        this.#idBtnCopia = btnCopia.id;
    }

    #insertarElementos(key) {
        /* agregar clases */
        let label = document.querySelector(`#validar__${key} label`);
        label.classList.add('formulario__label');

        let div = document.querySelector(`#validar__${key} div`);
        div.classList.add('formulario__grupo-input');

        let item = document.getElementById(`${key}`);
        item.classList.add('formulario__input');

        /* Icono de validacion */
        let icono = document.createElement('i');
        // creando el atributo class:
        const iconoClass = document.createAttribute('class');
        // agregando clases al tributo:
        iconoClass.value = 'formulario__validacion-estado fa fa-times-circle';
        icono.setAttributeNode(iconoClass);
        div.appendChild(icono);

        /* Parrafo de error */
        let msjError = document.createElement('p');
        // creando el atributo class:
        const att = document.createAttribute('class');
        // agregando clases al tributo:
        att.value = 'formulario__input-error';
        msjError.setAttributeNode(att);

        msjError.innerHTML = `${this.items[key].texto}`;

        if (typeof this.items[key].texto !== 'undefined') {
            document.getElementById(`validar__${key}`).appendChild(msjError);
        }
    }

    #validarCampo(key) {
        let expresion = this.#expresiones[this.items[key].expresion];
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
            this.#campos[input.id] = true;
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
            this.#campos[input.id] = false;
        }
    }

    #validarSelects(key) {
        // funcion para validar select razor
        validarCampo(key);
    }

    #validarFormulario(e) {
        let key = e.target.id;
        this.items[key].select
            ? this.#validarSelects(key)
            : this.#validarCampo(key);
    }

    #hacerFocus() {
        for (const [key, element] of Object.entries(this.items)) {
            document.getElementById(key).focus();
            document.getElementById(key).blur();
            // this.validarCampo(key);
        }
    }

    #verificarValidar() {
        for (const [key, element] of Object.entries(this.items)) {
            // document.getElementById(key).focus();
            // document.getElementById(key).blur();
            this.#validarCampo(key);
        }
    }

    iniciar() {
        for (const [key, element] of Object.entries(this.items)) {
            let input = document.getElementById(key);

            this.#campos[key] = false;

            this.#insertarElementos(key);

            input.addEventListener('keyup', this.#validarFormulario.bind(this));
            input.addEventListener('blur', this.#validarFormulario.bind(this));
        }

        this.#insertarClaseMensajeError();
        this.#copiarBorrarBoton();

        let boton = document.getElementById(this.#idBtnCopia);
        boton.addEventListener('click', (e) => {
            this.#hacerFocus();
            this.#verificarValidar();

            let comprobar = Object.values(this.#campos);

            if (!comprobar.includes(false)) {
                this.flag = true;
                document
                    .querySelectorAll('.formulario__grupo-correcto')
                    .forEach((icono) => {
                        icono.classList.remove('formulario__grupo-correcto');
                    });
                document.getElementById(this.idBoton).click();
            } else {
                this.flag = false;
                document
                    .getElementById(this.idMensaje)
                    .classList.add('formulario__mensaje-activo');
                setTimeout(() => {
                    document
                        .getElementById(this.idMensaje)
                        .classList.remove('formulario__mensaje-activo');
                }, 5000);
            }
        });
    }
};
