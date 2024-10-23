window.onload = () => {
    let carga = document.getElementById('main_loader');
    carga.style.visibility = 'hidden';
    carga.style.opacity = '0';
};
  
/* document.addEventListener("DOMContentLoaded", () =>{
    let altura = document.getElementById('menu').offsetTop;
    window.addEventListener("scroll", () => {
        if (window.scrollY  > altura) {
           document.getElementById('menu').classList.add('menu-fixed');
        } else {
           document.getElementById('menu').classList.remove('menu-fixed');
        }
    });

}); */

window.onscroll = () => {
    if(document.documentElement.scrollTop > 100 ) {
        $('.go-top-container').addClass('show');
        $('#subir').removeClass('d-none');
    }else{
        $('.go-top-container').removeClass('show');
        $('#subir').addClass('d-none');
    }
}

class Interfaz {

    constructor(){
    }

    start_loader (){
        const carga = document.getElementById('main_loader');
        carga.style.visibility = 'visible';
        carga.style.opacity = '100';
    }
    end_loader (){
        const carga = document.getElementById('main_loader');
        carga.style.visibility = 'hidden';
        carga.style.opacity = '0';
    }
    
    msj_error (msj){
        swal({
            title: `Error!`,
            text: msj,
            icon: `warning`,
            button: `Aceptar`,
        });
    }
    
    msj_exito (msj){
        swal({
            title: `Correcto!`,
            text: msj,
            icon: `success`,
            button: `Aceptar`,
        });
    }

    cifrar_img (img){
        const xhr = new XMLHttpRequest();
        xhr.open('GET',img);
        xhr.responseType = 'arraybuffer';
        xhr.onload = (e) =>{
            let blob = new Blob([xhr.response]);
            let url = URL.createObjectURL(blob);
        }
        xhr.send(); 
    }      
}

class Validacion extends Interfaz{
    static restriccion = {
        "vacios": {
            "expresion": /(?!(^$))/,
            "msj": "No puedes dejar vacio el campo "
        },
        "letras": {
            "expresion": /^([a-zA-Záéíóú]+[\s]?)/i,
            "msj": "Solo puedes ingresar letras en el campo "
        },
        "numeros": {
            "expresion": /^([0-9])+$/,
            "msj": "Solo puedes ingresar numeros en el campo "
        },
        "email": {
            "expresion": /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/,
            "msj": "Estructura de correo no valida! en campo "
        },
        "curp": {
            "expresion": /^([A-Z][AEIOUX][A-Z]{2}\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])[HM](?:AS|B[CS]|C[CLMSH]|D[FG]|G[TR]|HG|JC|M[CNS]|N[ETL]|OC|PL|Q[TR]|S[PLR]|T[CSL]|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[A-Z\d])(\d)$/,
            "msj": "Estructura de CURP no valida! en campo "
        },
        "rfc": {
            "expresion": /^[A-ZÑ&]{4}[0-9]{6}[A-Z0-9]{3}$/,
            "msj": "Estructura de RFC no valida! en campo "
        },
        "password": {
            "expresion": /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!\.\-_%*?&])([A-Za-z\d$@$\.\-_!%*?&]|[^ ]){8,15}$/,
            "msj": "Estructura de Contraseña no valida! en campo contraseña!\n\nRequisitos para una contraseña:\n-Minimo 8 caracteres\n-Maximo 15 caracteres\n-Al menos una letra mayuscula\n-Al menos una letra minuscula\n-Al menos un dígito\n-No espacios en blanco\n-Al menos 1 caracter especial : @ $ ! % * ? &"
        }
    };

    limpiar_cadena = (cadena, caracter_busqueda, caracter_remplazo) => {
        return cadena.replace(`${caracter_busqueda}`, `${caracter_remplazo}`);
    }

    /**
     * 
     * @param {string[]||String} input lista de input a validar
     * @param {String[]||String} tipo_validacion nombre de la validacion a realizar
     * @param {String} msj texto que se mostrara en caso de no cumplirse la valicion en caso de no ingresar alguno se generara de manera automatica
     * @returns {boolean} devuelve un false en caso de cumplirse la condicion en alguno de los inputs
     */
    validar_campo (input, tipo_validacion, mensaje = ""){
        let resultado = true;
        let error = "";
        let msj_final = "";
        const incorrecto = (nombre, msj) => {
            error = (error == "") ? nombre : error;
            msj_final = (msj_final == "") ? msj : msj_final;
            return false
        }
        if (Array.isArray(input)) {
            if (Array.isArray(tipo_validacion)) {
                tipo_validacion.map(validacion => {
                    let {expresion,msj} = Validacion.restriccion[validacion];
                    input.map(nombre => {
                        resultado = expresion.test(document.getElementsByName(`${nombre}`)[0].value) ? resultado : incorrecto(document.querySelector('[for="'+nombre+'"]').textContent, msj);
                    });
                });
            } else {
                const {expresion, msj} = Validacion.restriccion[tipo_validacion];
                input.map(nombre => {
                    resultado = expresion.test(document.getElementsByName(`${nombre}`)[0].value) ? resultado : incorrecto(document.querySelector('[for="'+nombre+'"]').textContent, msj);
                });
            }
        }
        error != "" ? this.msj_error(mensaje != "" ? mensaje : `${msj_final} ${error}`) : error;
        return resultado;
    }
    /**
     * 
     * @param {String} input recibe el nombre del input a convertir su contenido a mayusculas 
     */
    caracter_mayus = (input) => {
        document.getElementsByName(`${input}`)[0].addEventListener("input", () => {
            document.getElementsByName(`${input}`)[0].value = document.getElementsByName(`${input}`)[0].value.toUpperCase();
        });
    }
    
    /**
     * 
     * @param {String} input recibe el nombre del input a convertir su contenido a minusculas
     */
    caracter_minus = (input) => {
        document.getElementsByName(`${input}`)[0].addEventListener("input", () => {
            document.getElementsByName(`${input}`)[0].value = document.getElementsByName(`${input}`)[0].value.toLowerCase();
        });
    }
    /**
     * 
     * @param {String} input recibe el nombre del input para admitir solo caracteres numericos
     */
    caracter_numeros = (input) => {
        document.getElementsByName(`${input}`)[0].addEventListener("input", () => {
            document.getElementsByName(`${input}`)[0].value = document.getElementsByName(`${input}`)[0].value.replace(/[^0-9]/g, '');
        });
    }
    /**
     * 
     * @param {String} input recibe el nombre del input para admitir solo letras
     */
    caracter_letras = (input) => {
        document.getElementsByName(`${input}`)[0].addEventListener("input", () => {
            document.getElementsByName(`${input}`)[0].value = document.getElementsByName(`${input}`)[0].value.replace(/([^a-zA-Záéíóú\s])/i, '');
        });
    }

    caracter_varios = (input) => {
        document.getElementsByName(`${input}`)[0].addEventListener("input", () => {
            document.getElementsByName(`${input}`)[0].value = document.getElementsByName(`${input}`)[0].value.replace(/([^A-Za-z0-9ñÑ])/g, '');
        });
    }

    primer_mayuscula = (input) => {
        document.getElementsByName(`${input}`)[0].addEventListener("input", () => {
            document.getElementsByName(`${input}`)[0].value = document.getElementsByName(`${input}`)[0].value.charAt(0).toUpperCase() + document.getElementsByName(`${input}`)[0].value.slice(1);
        });
    }

    limitar_valor = (input, inicio, fin, msj) => {
        return document.getElementsByName(`${input}`)[0].value > inicio && document.getElementsByName(`${input}`)[0].value < fin ? true : this.msj_error(msj);
    }

    longitud_campo = (input, inicio, fin, msj) => {
        let campo = document.getElementsByName(`${input}`)[0].value;
        return campo.length > inicio && campo.lenght < fin ? true : this.msj_error(msj);
    }

    longitud_campo_exacta = (input, longitud, msj) => {
        let campo = document.getElementsByName(`${input}`)[0].value;
        return campo.length == longitud ? true : this.msj_error(msj);
    }
}

class Consultas extends Interfaz{
	/**
	 * @param {String} modelo nombre del modelo al que se le enviaran los datos
	 * @param {FormData} formulario objeto con la informacion del formulario correspondiente
	 * @param {String} tipo de metodo que se usara para el envio de informacion POST o GET por defecto se insertara POST
	 */
	constructor(modelo, formulario, metodo = 'POST') {
        super();
		this.modelo = modelo;
		this.formulario = formulario;
		this.metodo = metodo;
	}

	sesion() {
		this.start_loader();
		fetch(this.modelo, {
				method: `${this.metodo}`,
				body: this.formulario
			}).then(respuesta => respuesta.json())
			.then(respuesta => {
				this.end_loader();
				if (respuesta[0] === "1") {
					swal({
						icon: `success`,
						title: `${respuesta[1]}`,
						html: true,
						text: `\n\n Estas siendo redirigido automaticamente...`,
						closeOnClickOutside: false,
						closeOnEsc: false,
						value: true,
						buttons: false,
						timer: 1500
					}).then((value) => {
						window.location = `home`;
					});				
				}else {
					this.msj_error(`Se ha producido un error!\n${respuesta[1]}`);
				}
			}).catch(error => {
				this.end_loader();
				console.log(`${error}`);
			});
	}

	insercion() {
		this.start_loader();
		fetch(`${this.modelo}`, {
				method: `${this.metodo}`,
				body: this.formulario
			}).then(respuesta => respuesta.json())
			.then(respuesta => {
				this.end_loader();
				if (respuesta[0] == "1") {
					this.msj_exito(`Proceso finalizado correctamente!\n${respuesta[1]}`);					
				} else {
					this.msj_error(`Se ha prensentado un error:\n${respuesta[1]}\nPor favor intentalo de nuevo.`);
				}
			}).catch(error => {
				this.end_loader();
				console.log(`${error}`);
			});
	}

	insertar = async () => {
		try {
			const respuesta = await fetch(`${this.modelo}`, {
				method: `${this.metodo}`,
				body: this.formulario
			});
			const datos = await respuesta.json();
			return await datos;
		}catch(error){
			console.log(error);
		}
	}

	consulta = async () => {
		try {
			const respuesta = await fetch(`${this.modelo}`, {
				method: `${this.metodo}`,
				body: this.formulario
			});
			const datos = await respuesta.json();
			return await datos;
		}catch(error){
			console.log(error);
		}		
	}
	catalogo(input, accion) {
		const funciones = {
			"codigo_html": (input, codigo) => {
				$(`[name=${input}]`).html(`${codigo}`);
			},
			"valor_input": (input, valor) => {
				$(`[name=${input}]`).val(`${valor}`);
			},
			"valor_inputs": (input, valor) => {
				input.map(() => {
	
				});
			}	
		};		
		fetch(`app/Controllers/${this.modelo}.php`, {
			method: `${this.metodo}`,
			body: this.formulario
		}).then(respuesta => respuesta.text())
		.then(respuesta => {
			funciones[`${accion}`](input,respuesta);
		}).catch(error => {
			console.log(error);
		});
	}
}

const validate = new Validacion();
const interfaz = new Interfaz();