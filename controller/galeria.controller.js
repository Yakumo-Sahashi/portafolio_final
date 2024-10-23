
const precargar_galeria = (id,total) => {
    interfaz.start_loader();
    let contenido = ``;
    for (let i = 1; i <= total; i++) {
        contenido += `
            <div class="prev-img">
                <span type="button" onclick="visualizar(${id},${i})">
                    <img src="./public/img/proyectos/${id}/proyecto${id}_${i}.webp">
                </span>
            </div>
        `;
    }    
    $('#img_view').attr('src',`./public/img/proyectos/${id}/proyecto${id}_1.webp`);
    $('#prev_galeria').html(contenido);
    $('#galeria_img').modal('show');
    interfaz.end_loader();
}

const visualizar = (id,num) => {
    console.log('prueba')
    $('#img_view').attr('src',`./public/img/proyectos/${id}/proyecto${id}_${num}.webp`);
}


/* const efecto = (id,total,act) =>{
    for(let i = 1; i <= total; i++){
        $(`#${id}${i}`).removeClass("active");
    }
    $(`#${id}${act}`).addClass("active");    
} */