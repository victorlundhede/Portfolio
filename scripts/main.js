//SELECT ELEMENTS
let elements = {
	menu: document.querySelector('.menu_toggler'),
	nav_link: document.querySelectorAll('.top_nav .nav_link'),
	top_nav: document.querySelector('.top_nav'),
	lazy: document.querySelectorAll('.lazy'),
	submitBtn: document.querySelector('.submitBtn')
};
//EVENT LISTENER FOR WHEN USER CLICKS HAMBURGER MENU
elements.menu.addEventListener('click', () => {
	elements.menu.classList.toggle('open');
	elements.top_nav.classList.toggle('open');
});
//LOOPS THROUGH NAV LINKS AND ADD EVENT LISTENER FOR WHEN USER CLICKS ON A MENU ITEM
for (let link of elements.nav_link) {
	link.addEventListener('click', () => {
		elements.menu.classList.remove('open');
		elements.top_nav.classList.remove('open');
	});
}
//LAZY LOADING
document.addEventListener('DOMContentLoaded', function() {
	let lazyloadImages;

	if ('IntersectionObserver' in window) {
		lazyloadImages = elements.lazy;
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
		lazyloadImages = elements.lazy;

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

elements.submitBtn.addEventListener('click', (e) => {
	e.preventDefault();
	// Retrieving the values of form elements
	let name = document.getElementById('name').value;
	let email = document.getElementById('email').value;
	let message = document.getElementById('message').value;

	// Defining error variables with a default value
	let nameErr = (emailErr = messageErr = true);

	// Validate name
	if (name == '') {
		printError('nameErr', 'Please enter your name');
	} else {
		let regex = /^[a-zA-Z\s]+$/;
		if (regex.test(name) === false) {
			printError('nameErr', 'Please enter a valid name');
		} else {
			printError('nameErr', '');
			nameErr = false;
		}
	}
	// Validate email address
	if (email == '') {
		printError('emailErr', 'Please enter your email address');
	} else {
		// Regular expression for basic email validation
		let regex = /^\S+@\S+\.\S+$/;
		if (regex.test(email) === false) {
			printError('emailErr', 'Please enter a valid email address');
		} else {
			printError('emailErr', '');
			emailErr = false;
		}
	}
	//Validate message
	if (message == '') {
		printError('messageErr', 'Please enter a valid message');
	} else {
		printError('messageErr', '');
		messageErr = false;
	}
	// Prevent the form from being submitted if there are any errors
	if ((nameErr || emailErr || messageErr) == true) {
		return false;
	} else {
		// Creating a string from input data for preview
		let dataPreview =
			"You've entered the following details: \n" +
			'Name: ' +
			name +
			'\n' +
			'Email Address: ' +
			email +
			'\n' +
			'Message: ' +
			message +
			'\n';
		// Display input data in a dialog box before submitting the form
		alert(dataPreview);
		name.value = '';
		email.value = '';
		message.value = '';
	}
});

// Defining a function to display error message
function printError(elemId, hintMsg) {
	document.getElementById(elemId).innerHTML = hintMsg;
}
