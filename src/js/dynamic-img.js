;(function() {
	var dynamicImages = document.querySelectorAll('.dynamic__img')

	for(let i of dynamicImages) {
		var srcW = i.getAttribute('data-source-webp')
		var srcN = i.getAttribute('data-source')
		var width = i.getAttribute('width')
		var height = i.getAttribute('height')
		var imgClass = i.getAttribute('data-class')
		var img = `
		<picture>
			<img width="${width}" height="${height}" alt="" class="${imgClass}" src="/img/${srcN}">
		</picture>
		`
		i.parentNode.insertAdjacentHTML('afterbegin', img)
		i.remove()
	}
})();