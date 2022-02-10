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
    this.$routerWrapper = this.$wrapper.querySelector(this.settings.routerWrapper)

    this.$routerWrapper.addEventListener('click', (event) => {
      const $target = event.target
      const buttonValue = $target.closest('[data-slider-button]').dataset.sliderButton

      if (buttonValue === 'left') {
        this.changeSlidesLeft
      } else if (buttonValue === 'right') {
        this.changeSlidesRight
      }
    })
    
    this.renderSeason()
  }

  get changeSlidesRight() {
    const $lastSlide = this.$slides[this.$slides.length-1]
    this.$slider.insertAdjacentElement('afterbegin', $lastSlide)
    this.getSlidesPosition

    this.setClasses(this.$slides)
    this.setSeason()
  }
  
  get changeSlidesLeft() {
    const $lastSlide = this.$slides[0]
    this.$slider.insertAdjacentElement('beforeend', $lastSlide)
    this.getSlidesPosition

    this.setClasses(this.$slides)
    this.setSeason()
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
  
  renderSeason() {
    this.$seasonWrapper = this.$routerWrapper.querySelector('[data-slider="season"]')
    const seasonHTML = this.settings.seasons.objArray.map((obj, idx) => `
      <div class="roadmap__router-info" data-slider-season="${idx}">
        <div class="roadmap__router-season">
          ${obj.name}
        </div>
        <div class="roadmap__router-year">
          ${obj.year}
        </div>
      </div>
    `).join('')
    this.$seasonWrapper.insertAdjacentHTML('beforeend', seasonHTML)
    this.setSeason()
  }
  
  setSeason() {
    const $el = this.$wrapper.querySelector('.item-4')
    
    if ($el) {
      this.settings.seasons.objArray.forEach((obj, idx) => {
        if (obj.elements.includes(+$el.dataset.sliderItem)) {
          this.$seasonWrapper.querySelectorAll('.roadmap__router-info').forEach($el => {
            $el.style.transform = `translateX(-${100 * idx}px)`
            $el.style.transition = `all .3s`
          })
        }
      })
    }
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
        elements: [0, 1]
      },
      {
        name: 'Весна',
        year: 2021,
        elements: [2, 3]
      },
      {
        name: 'Лето',
        year: 2021,
        elements: [4]
      },
      {
        name: 'Осень',
        year: 2021,
        elements: [5]
      },
    ]
  }
})