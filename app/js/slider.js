class Slider {
  constructor(settings = {}) {
    this.settings = settings
    this.$wrapper = document.querySelector(settings.wrapper)
    this.$slider = this.$wrapper.querySelector(this.settings.slider)

    this.init()
  }
  
  init() {
    this.getSlidesPosition
    this.routerListener()

    this.setClasses(this.$slides)
  }

  get getSlidesPosition() {
    this.$slides = this.$wrapper.querySelectorAll(this.settings.item)
    const windowWidth = window.innerWidth
    
    this.$slides.forEach($item => {
      $item.classList.remove('left-shadow')
      $item.classList.remove('right-shadow')
    })
    this.$slides.forEach($item => {
      const rectX = Math.round($item.getBoundingClientRect().x)
      console.log(rectX);
      if (rectX < 40) {
        $item.classList.add('left-shadow')
      } else if (windowWidth - (rectX + $item.getBoundingClientRect().width) < 0) {
        $item.classList.add('right-shadow')
      }
    })
  }
  
  routerListener() {
    const $routerWrapper = this.$wrapper.querySelector(this.settings.routerWrapper)

    $routerWrapper.addEventListener('click', (event) => {
      const $target = event.target
      const buttonValue = $target.closest('[data-slider-button]').dataset.sliderButton

      if (buttonValue === 'left') {
        this.changeSlidesLeft
      } else if (buttonValue === 'right') {
        this.changeSlidesRight
      }
    })
  }

  get changeSlidesRight() {
    const $lastSlide = this.$slides[this.$slides.length-1]
    this.$slider.insertAdjacentElement('afterbegin', $lastSlide)
    this.getSlidesPosition

    this.setClasses(this.$slides)
  }
  
  get changeSlidesLeft() {
    const $lastSlide = this.$slides[0]
    this.$slider.insertAdjacentElement('beforeend', $lastSlide)
    this.getSlidesPosition

    this.setClasses(this.$slides)
  }

  setClasses($elArray) {
    $elArray.forEach(($el, idx) => {
      let className
      $el.classList.forEach(cl => {
        if (cl.startsWith('item-')) {
          className =  cl
        }
      })

      $el.classList.remove(className)
      $el.classList.add(`item-${idx + 1}`)
    })
  }
}

new Slider({
  wrapper: '[data-slider="wrapper"]',
  slider: '[data-slider="slider"]',
  item: '.roadmap__item',
  routerWrapper: '[data-slider="router"]',
  seasons: {
    elementSelector: '[data-slider-item]',
    objArray: [
      {
        name: 'Зима',
        year: 2021,
        elements: [0, 1, 2]
      },
      {
        name: 'Весна',
        year: 2021,
        elements: [0, 1, 2]
      },
      {
        name: 'Лето',
        year: 2021,
        elements: [0, 1, 2]
      },
      {
        name: 'Осень',
        year: 2021,
        elements: [0, 1, 2]
      },
    ]
  }
})