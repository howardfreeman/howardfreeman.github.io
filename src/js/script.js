$(document).ready(function() {

    $('#text-rotating').Morphext({
        animation: "animate__pulse",
        speed: 5000
    });

    const slider = tns({
        container: '.preview__inner',
        items: 1,
        slideBy: 'page',
        autoplay: true,
        stop: false,
        controls: false,
        nav: false,
        speed: 800,
        autoplayTimeout: 8000
      });
    
      document.querySelector('.prev').onclick = function () {
        slider.goTo('prev');
      };
    
      document.querySelector('.next').onclick = function () {
        slider.goTo('next');
      };

});