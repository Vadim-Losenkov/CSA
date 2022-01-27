$(function() {
  $('.header__menu--mobile').on('click',() => {
    $('.header__menu--mobile').toggleClass('open')
    $('.header-mobile').toggleClass('open')
  })
  $('.open-popup').magnificPopup({
      type: 'inline',
      removalDelay: 500, //delay removal by X to allow out-animation
      callbacks: {
        beforeOpen: function () {
          this.st.mainClass = this.st.el.attr('data-effect');
        }
      },
      midClick: true // allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source.
    });
  $('[data-popup="close"]').on('click', (e) => {
      $('.open-popup').magnificPopup('close')
      e.preventDefault()
    })
  $('[data-button="toSecton"]').on('click', function(e) {
    e.preventDefault()
    const sectionID = $(this).attr('href')
    
    $('html, body').animate({
      scrollTop: $(sectionID).offset().top
    }, {
        duration: 500,
    });
  })
  $('.user-popup__info-input').focusin(function() {
    $(this).siblings('svg').children('path').css({
      fill: '#000',
      transition: '.3s'
    })
  })
  $('.user-popup__info-input').focusout(function() {
    $(this).siblings('svg').children('path').css({
      fill: '#ccc',
      transition: '.3s'
    })
  })
  $('[data-popup="form"]').validate({
    errorClass: 'invalid-field',
		rules: {
			username: {
				required: true,
				minlength: 2
			},
			email: {
				required: true,
				email: true
			},
			phone: {
				required: true,
				minlength: 11,
			},
		},
		messages: {
			username: {
				required: "Введите имя",
				minlength: jQuery.validator.format("Имя должно состоять минимум из {0} символов")
			},
			phone: {
				required: "Введите Телефон",
				minlength: jQuery.validator.format("Телефон должен состоять минимум из {0} символов")
			},
			email: {
				required: "Введите E-mail",
				minlength: jQuery.validator.format("E-mail должен состоять минимум из {0} символов")
			},
		},
		// the errorPlacement has to take the table layout into account
		errorPlacement: function(error, element) {
			if (element.is(":radio"))
				error.appendTo(element.parent().next().next());
			else if (element.is(":checkbox"))
				error.appendTo(element.next());
			else
				error.appendTo(element.parent().next());
		},
		// specifying a submitHandler prevents the default submit, good for the demo
		submitHandler: function(e) {
			$('.success-popup').magnificPopup('open')
		},
		// set this class to error-labels to indicate valid fields
		success: function(label) {
			// set &nbsp; as text for IE
			label.html("&nbsp;").addClass("checked")
		}
	});
  
  $('.dashboard__theme').on('click', themeToggler)
  function themeToggler(event) {
    // СДЕЛАТЬ ПЛАВНУЮ СМЕНУ ТЕМЫ ЧЕРЕЗ ПОЯВЛЕНИЕ ОВЕРЛЕЯ!!!!
    const $dashboardBody = $('body.dashboard-body')
    if ($dashboardBody.hasClass('light')) {
      themeTransition(300)
      $dashboardBody.removeClass('light')
      $dashboardBody.addClass('dark')
    } else {
      themeTransition(300)
      $dashboardBody.removeClass('dark')
      $dashboardBody.addClass('light')
    }
    
    function themeTransition(duration) {
      $dashboardBody.css({
        opacity: 0,
        transition: `0.${duration}s`
      })
      setTimeout(function() {
        $dashboardBody.css({
          opacity: 1,
          transition: `0.${duration}s`
        })
      }, duration);
    }
  }
})

new WOW().init();