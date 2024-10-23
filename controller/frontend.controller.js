let cambio = 0;

$(document).ready(() =>{
  $('.go-top-container').on('click', () => {
    $('html, body').animate({
      scrollTop: 0
    }, 800, () => {
      
    });
  });

});

const dirigir = (ruta) => {
  $('html, body').animate({
    scrollTop: $(ruta).offset().top
  }, 800, () => {
    window.location.hash = ruta;
  });
}

$('#menu_sm').on('click',() => {
  if(cambio %= 2){
    $('.side-nav').css({'display':'none','transition': 'width 0.5s'});  
    $('#menu_sm').html(`<i class="fa-solid fa-bars"></i>`);
  }else{
    $('.side-nav').css({'display':'flex','transition': 'width 0.5s'});  
    $('#menu_sm').html(`<i class="fa-solid fa-xmark"></i>`);
  }
  cambio++;
});