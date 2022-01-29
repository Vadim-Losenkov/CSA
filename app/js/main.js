$(function () {
  $('.header__menu--mobile').on('click', () => {
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
  const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

  /* $('[data-animate="button"]').hover(
    function () {
      
    },
    function () {
      
    }
  ) */
  /* .hover(
    function () {
      for (let i = 244, p = Promise.resolve(); i >= 65; i-= 4) {
        p = p.then(() => delay(1))
             .then(() => {
               $(this).css({
                 background: `linear-gradient(${i}deg, #01B5E8 -7.92%, #0377FB 95.1%)`
               })
             });
      }
      // background: linear-gradient(244.26deg, #01B5E8 -7.92%, #0377FB 95.1%);
      
    },
    function () {
      for (let i = 65, p = Promise.resolve(); i <= 244; i+= 4) {
        p = p.then(() => delay(1))
             .then(() => {
               $(this).css({
                 background: `linear-gradient(${i}deg, #01B5E8 -7.92%, #0377FB 95.1%)`
               })
             });
      }
    }
  ) */
  $('.reviews__item').hover(
    function (e) {
      $(this).children('.reviews__item-shadow').addClass('hover')
    },
    function (e) {
      $(this).children('.reviews__item-shadow').removeClass('hover')
    }
  )
  
  $('[data-popup="close"]').on('click', (e) => {
    $('.open-popup').magnificPopup('close')
    e.preventDefault()
  })
  $('[data-button="toSecton"]').on('click', function (e) {
    e.preventDefault()
    const sectionID = $(this).attr('href')

    $('html, body').animate({
      scrollTop: $(sectionID).offset().top
    }, {
      duration: 500,
    });
  })
  $('.user-popup__info-input').focusin(function () {
    $(this).siblings('svg').children('path').css({
      fill: '#000',
      transition: '.3s'
    })
  })
  $('.user-popup__info-input').focusout(function () {
    $(this).siblings('svg').children('path').css({
      fill: '#ccc',
      transition: '.3s'
    })
  })
  
  if ($('[data-popup="form-up"]').length && $('[data-popup="form-in"]')) {
    $('[data-popup="form-up"]').validate({
      errorClass: 'invalid-field',
      rules: {
        email: {
          required: true,
          email: true
        },
        password: {
          required: true,
          minlength: 5,
        },
        rePassword: {
          required: true,
          minlength: 5,
        },
      },
      messages: {
        password: {
          required: `<p class="input-error">Введите пароль</p>`,
          minlength: jQuery.validator.format(`<p class="input-error">Минимум {0} символов</p>`)
        },
        rePassword: {
          required: `<p class="input-error">Введите пароль</p>`,
          minlength: jQuery.validator.format(`<p class="input-error">Минимум {0} символов</p>`)
        },
        email: {
          required: `<p class="input-error">Введите E-mail</p>`,
          email: `<p class="input-error">Введите корректный E-mail</p>`
        },
      },
      // the errorPlacement has to take the table layout into account
      errorPlacement: function (error, element) {
        error.appendTo(element.parent().next());
      },
      // specifying a submitHandler prevents the default submit, good for the demo
      submitHandler: function (e) {
        $('.open-popup').magnificPopup('close')
      },
      // set this class to error-labels to indicate valid fields
      success: function (element) {
        element.html(`
          <svg class="input-error-icon" width="15" height="11" viewBox="0 0 15 11" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 1.15481L4.8 11L0 6.36697L1.19642 5.21216L4.8 8.6822L13.8036 0L15 1.15481Z" fill="#22BC5F"/>
          </svg>
        `)
      }
    });
    $('[data-popup="form-in"]').validate({
      errorClass: 'invalid-field',
      rules: {
        email: {
          required: true,
          email: true
        },
        password: {
          required: true,
          minlength: 5,
        },
      },
      messages: {
        password: {
          required: `<p class="input-error">Введите пароль</p>`,
          minlength: jQuery.validator.format(`<p class="input-error">Минимум {0} символов</p>`)
        },
        email: {
          required: `<p class="input-error">Введите E-mail</p>`,
          email: `<p class="input-error">Введите корректный E-mail</p>`
        },
      },
      // the errorPlacement has to take the table layout into account
      errorPlacement: function (error, element) {
        error.appendTo(element.parent().next());
      },
      // specifying a submitHandler prevents the default submit, good for the demo
      submitHandler: function (e) {
        $('.open-popup').magnificPopup('close')
      },
      // set this class to error-labels to indicate valid fields
      success: function (element) {
        element.html(`
          <svg class="input-error-icon" width="15" height="11" viewBox="0 0 15 11" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 1.15481L4.8 11L0 6.36697L1.19642 5.21216L4.8 8.6822L13.8036 0L15 1.15481Z" fill="#22BC5F"/>
          </svg>
        `)
      }
    });
  }

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
      setTimeout(function () {
        $dashboardBody.css({
          opacity: 1,
          transition: `0.${duration}s`
        })
      }, duration);
    }
  }
})

new WOW().init();