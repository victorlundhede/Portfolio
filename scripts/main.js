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
