let menu = document.querySelector('.menu_toggler');
let nav_link = document.querySelectorAll('.top_nav .nav_link');

menu.addEventListener('click', () => {
	menu.classList.toggle('open');
	document.querySelector('.top_nav').classList.toggle('open');
});

for (let link of nav_link) {
	link.addEventListener('click', () => {
		menu.classList.remove('open');
		document.querySelector('.top_nav').classList.remove('open');
	});
}

document.addEventListener('DOMContentLoaded', function() {
	let lazyloadImages;

	if ('IntersectionObserver' in window) {
		lazyloadImages = document.querySelectorAll('.lazy');
		let imageObserver = new IntersectionObserver(function(entries) {
			entries.forEach(function(entry) {
				if (entry.isIntersecting) {
					let image = entry.target;
					image.src = image.dataset.src;
					image.classList.remove('lazy');
					imageObserver.unobserve(image);
				}
			});
		});

		lazyloadImages.forEach(function(image) {
			imageObserver.observe(image);
		});
	} else {
		let lazyloadThrottleTimeout;
		lazyloadImages = document.querySelectorAll('.lazy');

		function lazyload() {
			if (lazyloadThrottleTimeout) {
				clearTimeout(lazyloadThrottleTimeout);
			}

			lazyloadThrottleTimeout = setTimeout(function() {
				let scrollTop = window.pageYOffset;
				lazyloadImages.forEach(function(img) {
					if (img.offsetTop < window.innerHeight + scrollTop) {
						img.src = img.dataset.src;
						img.classList.remove('lazy');
					}
				});
				if (lazyloadImages.length === 0) {
					document.removeEventListener('scroll', lazyload);
					window.removeEventListener('resize', lazyload);
					window.removeEventListener('orientationChange', lazyload);
				}
			}, 20);
		}

		document.addEventListener('scroll', lazyload);
		window.addEventListener('resize', lazyload);
		window.addEventListener('orientationChange', lazyload);
	}
});
