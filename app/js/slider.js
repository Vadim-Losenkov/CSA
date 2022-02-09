class Slider {
  constructor(settings = {}) {
    this.settings = settings
    this.$wrapper = document.querySelector(settings.wrapper)
    
    this.init()
  }
  
  init() {
    const $slides = this.$wrapper.querySelectorAll(this.settings.item)
    const windowWidth = window.innerWidth
    $slides.forEach($item => {
      const rectX = Math.round($item.getBoundingClientRect().x)
      if (rectX < 0) {
        $item.classList.add('left-shadow')
      } else if (windowWidth - (rectX + $item.getBoundingClientRect().width) < 0) {
        $item.classList.add('right-shadow')
      } else {
        $item.classList.add('visible')
      }
    })
  }
  /*
     all-child translate
     last-child remove sett
     first-child add sett with trandlate than animation
  */
  get checkSliderParams() {
    const $slider = this.$wrapper.querySelector(this.settings.slider)
    const $items = $slider.querySelectorAll(this.settings.item)
    
    return {
      width: $slider.offsetWidth,
      rect: $slider.getBoundingClientRect(),
      $slider, $items
    }
  }
  
  routerListener() {
    
  }
}

new Slider({
  wrapper: '[data-slider="wrapper"]',
  slider: '[data-slider="slider"]',
  item: '.roadmap__item',
  buttonsWrapper: ''
})