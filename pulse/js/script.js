$(document).ready(function(){

	$('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
		$(this)
		  .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
		  .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
	});

	function toggleSlide(item) {
		$(item).each(function(i) {
			$(this).on('click', function(e) {
				e.preventDefault();
				$('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
				$('.catalog-item__backside').eq(i).toggleClass('catalog-item__backside_active');
			});
		});
	}

	toggleSlide('.catalog-item__link');
	toggleSlide('.catalog-item__back');

	//modal

	$('[data-modal=consultation]').on('click', function() {

		$('.overlay, #consultation').fadeIn();
	});

	$('.modal__close').on('click', function() {

		$('.overlay, #consultation, #order, #thanks').fadeOut();
	});

	$('.button_mini').each(function(i) {
		$(this).on('click', function() {
			$('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
			$('.overlay, #order').fadeIn();
		});
	});

	//validation 

	function validateForm(form) {
		$(form).validate({
			rules: {
				name: {
					required: true,
					minlength: 2
				},
				phone: "required",
				email: {
					required: true,
					email: true
				}
			},
			messages: {
				name: {
					required: "Пожалуйста, введите свое имя",
					minlength: jQuery.validator.format("Введите не менее {0} символов!")
				},
				phone: "Пожалуйста, введите свой номер телефона",
				email: {
				  required: "Пожалуйста, введите свою почту",
				  email: "Неправильный формат почты"
				}
			}
		});
	}

	validateForm('#consultation form');
	validateForm('#order form');
	validateForm('#consultation-form');

	$("input[name=phone]").mask("+7 (999) 999-99-99");

	//Smooth scroll and pageup

	$(window).scroll(function() {
		if($(this).scrollTop() > 1600) {
			$('.pageup').fadeIn();
		} else {
			$('.pageup').fadeOut();
		}
	});

	$('a[href=#up], a[href=#catalog]').on('click', function() {
		const _href = $(this).attr('href');
		$('html, body').animate({scrollTop: $(_href).offset().top + 'px'});
		return false;
	});

	new WOW().init();

	$('form').submit(function(e) {
		e.preventDefault();

		if(!$(this).valid()) {
			return;
		}

		$.ajax({
			type: 'POST',
			url: 'mailer/smart.php',
			data: $(this).serialize()
		}).done(function() {
			$(this).find('input').val("");
			$('#consultation, #order').fadeOut();
			$('.overlay, #thanks').fadeIn('slow');

			$('form').trigger('reset');
		});
		return false;
	});
});

const slider = tns({
    container: '.carousel__inner',
    items: 1,
    slideBy: 'page',
    autoplay: false,
	navPosition: 'bottom',
    responsive: {
		350: {
			controls: false,
			nav: true,
		},
		993: {
			nav: false,
		}
	}
});

document.querySelector('.prev').onclick = function() {
	slider.goTo('prev');
};
document.querySelector('.next').onclick = function() {
	slider.goTo('next');
};