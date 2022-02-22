class Slider {
  constructor(settings = {}) {
    this.settings = settings
    this.$wrapper = document.querySelector(settings.wrapper)
    this.$slider = this.$wrapper.querySelector(this.settings.slider)

    this.sliderPosition = settings.startSlide

    this.init()
  }

  init() {
    this.getSlidesPosition
    this.routerListener()

    this.setClasses(this.$slides)

    setRouter(0, this.sliderPosition)
  }

  get getSlidesPosition() {
    this.$slides = this.$wrapper.querySelectorAll(this.settings.item)
    const windowWidth = window.innerWidth

    // this.$slides.forEach($item => {
    //   $item.classList.remove('left-shadow')
    //   $item.classList.remove('right-shadow')
    // })
    // this.$slides.forEach(($item, index) => {
      
    // })
  }

  routerListener() {
    document.querySelector('[data-slider-button="right"]').onclick = e => {
      if (this.sliderPosition < this.settings.maxSlides) {
        this.sliderPosition += 1
        this.slide
        this.setSeason()
      } else {
        this.sliderPosition = 0
        this.slide
        this.setSeason()
      }
    }
    
    document.querySelector('[data-slider-button="left"]').onclick = e => {
      if (this.sliderPosition > 0) {
        this.sliderPosition -= 1
        this.slide
        this.setSeason()
      } else {
        this.sliderPosition = 0
        this.slide
        this.setSeason()
      }
    }
  }

  get slide () {
    document.querySelectorAll('[data-slider-ridx]').forEach($s => {
      $s.setAttribute('data-slider-ridx', this.sliderPosition)
    })
  }

  setClasses($elArray) {
    $elArray.forEach(($el, idx) => {
      let className
      $el.classList.forEach(cl => {
        if (cl.startsWith('item-')) {
          className = cl
        }
      })

      $el.classList.remove(className)
      $el.classList.add(`item-${idx + 1}`)
    })
  }
  setSeason() {
    const season = this.settings.seasons[this.sliderPosition]
    setRouter(season)
  }

  desrtoy() {
    
  }
}

const seasonItems = document.querySelectorAll('[data-slider-season]')
seasonItems.forEach(($el, idx) => {
  $el.setAttribute('data-router-id', idx)
})

function setRouter(index, defaultPosition) {
  if (defaultPosition) {
    seasonItems.forEach($el => setDefaultRouter($el, defaultPosition))
  }
  seasonItems.forEach(($el, idx) => {
    if (JSON.parse($el.dataset.sliderSeason).includes(index)) {
      seasonItems.forEach($el => {
        setDefaultRouter($el, idx)
      })
    }
  })
  function setDefaultRouter($el, i) {
    $el.style.transform = `translateX(-${100 * i}px)`
    $el.style.transition = `all .3s`
  }
}

const breakpoint = window.matchMedia('(max-width: 768px)')

let customSlider 
let mySwiper

const breakpointChecker = () => {
  if (!breakpoint.matches) {
    if (mySwiper !== undefined) {
      mySwiper.destroy(true, true)
    }
    enableCustomSlider()
  } else if (breakpoint.matches) {
    if (customSlider !== undefined) {
      customSlider.desrtoy()
    }
    enableSwiper();
  }
}

const enableSwiper = () => {
  mySwiper = new Swiper('.roadmap__slider', {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    spaceBetween: 20,
    initialSlide: 10,
    breakpoints: {
      440: {
        spaceBetween: 10,
      }
    },
    navigation: {
      nextEl: '.button-next',
      prevEl: '.button-prev',
    },
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 5,
      slideShadows: false,
    },
  })

  mySwiper.on('slideChangeTransitionStart', function (e) {
    e.slides.forEach(($s, idx) => {
      if($s.classList.contains('swiper-slide-active')) setRouter(idx)
    })
  })
}

const enableCustomSlider = () => {
  customSlider = new Slider({
    wrapper: '[data-slider="wrapper"]',
    slider: '[data-slider="slider"]',
    item: '.roadmap__item',
    routerWrapper: '[data-slider="router"]',
    startSlide: 2,
    maxSlides: 3, // максимальное кол-во проукрутов линии и самого слайдера
    seasons: [1, 2, 5, 6] // здесь число из аттрибута data-slider-season="[6]" (т.е на 1м слайде будет сезон с атрибутом data-slider-season="[1]")
  })
}

breakpoint.addListener(breakpointChecker)
breakpointChecker()