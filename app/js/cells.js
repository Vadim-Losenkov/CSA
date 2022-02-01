$(function() {
  function randomCells(settings = {}) {
    const $randomCells = []
    const $cellsArr = $(settings.selector)
    const cellsCount = $cellsArr.length
    
    setInterval(() => {
      for (let i = 0; i < 3; i++) {
        const randomNumber = (Math.round(Math.random() * cellsCount))
        $cellsArr[randomNumber]
        
        $randomCells.push(
          $($cellsArr[randomNumber]).addClass('active')
        )
      }
      setTimeout(() => {
        $randomCells.forEach($cell => $cell.removeClass('active'))
      }, settings.iterationCount);
    }, settings.iterationCount * 2);
  }
  
  randomCells({
    selector: '[data-cells="wrapper"] .cells-item',
    iterationCount: 700
  })
})
