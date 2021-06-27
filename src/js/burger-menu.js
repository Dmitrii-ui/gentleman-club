;(function() {
	var burger = document.querySelector('.burger')
	var menu = document.querySelector('.menu-header')

	burger.addEventListener('click', (evt) => {
		if(burger.classList.contains('active')) {
			document.body.classList.remove('lock')
			menu.classList.remove('active')
			burger.classList.remove('active')
		} else {
			document.body.classList.add('lock')
			menu.classList.add('active')
			burger.classList.add('active')
		}
	})
})();