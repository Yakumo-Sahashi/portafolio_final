validate.primer_mayuscula('nombre');
validate.primer_mayuscula('asunto');
validate.primer_mayuscula('mensaje');

const enviar_email = async() =>{
    interfaz.start_loader();
    let datos = new FormData($('#frm_contacto')[0]);
    const ejecucion = new Consultas("contacto", datos);
    let respuesta = await ejecucion.insertar();
    interfaz.end_loader();
    $('#frm_contacto')[0].reset();
    interfaz.msj_exito('Se ha enviado el correo electronico con exito\nEn breve me pondre en contacto.');
}

$(document).ready(() => {
    $('#frm_contacto').on('submit', (e) => {
        e.preventDefault();
        if(validate.validar_campo(['nombre','correo_electronico','asunto','mensaje'],'vacios')){
            if(validate.validar_campo(['correo_electronico'],'email')){
                enviar_email();
            }            
        }
    });

    $('#btn_correo').on('click',() => {
        let aux = document.createElement("input");
        aux.setAttribute("value", document.getElementById('mi_email').value);
        document.body.appendChild(aux);
        aux.select();
        document.execCommand("copy");
        document.body.removeChild(aux);

        $('#btn_correo').html("¡Correo copiado!");
        setTimeout(() => {
            $('#btn_correo').html(`<i class="fa-solid fa-envelope me-2"></i>${$('[name=mi_email]').val()}`);
        }, 2000);
    });
});