function slider(selector, sliderButtonsParams, sliderActionsParams) {
	let elements = document.querySelectorAll(selector)
	let sliderButtons = document.querySelector(sliderButtonsParams)
	let sliderActions = document.querySelector(sliderActionsParams)
	let counter = 0

	sliderButtons.addEventListener('click', (evt) => {
		if(evt.target.classList.contains('slider__btn')) {
			if(evt.target.classList.contains('active')) {
				return
			} else {
				let index = Array.from(document.querySelectorAll('.slider__btn')).indexOf(evt.target)
				document.querySelectorAll('.slider__btn').forEach(el => {
					el.classList.remove('active')
				})

				evt.target.classList.add('active')
				counter = index
			}

			changeItem(counter, elements)
		}
	})

	sliderActions.addEventListener('click', (evt) => {
		if(evt.target.classList.contains('slider__action')) {
			if(evt.target.classList.contains('one')) {
				counter--
				if(counter < 0) {
					counter = 5
				}
				let elem = document.querySelectorAll('.slider__btn')[counter]
				if(elem.classList.contains('active')) {
					false
				} else {
					document.querySelectorAll('.slider__btn').forEach(el => {
						el.classList.remove('active')
					})
					elem.classList.add('active')
				}
			} else if(evt.target.classList.contains('two')) {
				counter++
				if(counter > 5) {
					counter = 0
				}
				let elem = document.querySelectorAll('.slider__btn')[counter]
				if(elem.classList.contains('active')) {
					false
				} else {
					document.querySelectorAll('.slider__btn').forEach(el => {
						el.classList.remove('active')
					})
					elem.classList.add('active')
				}
			}

			changeItem(counter, elements)
		}
	})

}

slider('.slider__item', '.slider__buttons', '.slider__actions')
slider('.images__item', '.images__buttons', '.images__actions')

function changeItem(counter, elements) {
	for(let item of elements) {
		item.classList.remove('active')
	}

	elements[counter].classList.add('active')
}