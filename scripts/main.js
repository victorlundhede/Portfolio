let menu = document.querySelector(".menu-toggler");
let nav_link = document.querySelectorAll(".top-nav .nav-link");
let scroll = document.querySelectorAll("scroll");

menu.addEventListener("click", () => {
    menu.classList.toggle("open");
    document.querySelector(".top-nav").classList.toggle("open");
});

for(let link of nav_link){
    link.addEventListener("click", () => {
        menu.classList.remove("open");
        document.querySelector(".top-nav").classList.remove("open");
    });
}
document.addEventListener("DOMContentLoaded", function() {
    let lazyloadImages;

    if ("IntersectionObserver" in window) {
        lazyloadImages = document.querySelectorAll(".lazy");
        let imageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    let image = entry.target;
                    image.src = image.dataset.src;
                    image.classList.remove("lazy");
                    imageObserver.unobserve(image);
                }
            });
        });

        lazyloadImages.forEach(function(image) {
            imageObserver.observe(image);
        });
    } else {
        let lazyloadThrottleTimeout;
        lazyloadImages = document.querySelectorAll(".lazy");

        function lazyload () {
            if(lazyloadThrottleTimeout) {
                clearTimeout(lazyloadThrottleTimeout);
            }

            lazyloadThrottleTimeout = setTimeout(function() {
                let scrollTop = window.pageYOffset;
                lazyloadImages.forEach(function(img) {
                    if(img.offsetTop < (window.innerHeight + scrollTop)) {
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                    }
                });
                if(lazyloadImages.length == 0) {
                    document.removeEventListener("scroll", lazyload);
                    window.removeEventListener("resize", lazyload);
                    window.removeEventListener("orientationChange", lazyload);
                }
            }, 20);
        }

        document.addEventListener("scroll", lazyload);
        window.addEventListener("resize", lazyload);
        window.addEventListener("orientationChange", lazyload);
    }
});


for(let key of scroll) {
    key.addEventListener("click", () => {
        window.scrollTo(0, 0);
    });
}

// Get the video
let video = document.getElementById("my-video");

// Get the button
let btn = document.getElementById("my-btn");

// Pause and play the video, and change the button text
function playVideo() {
    if (video.paused) {
        video.play();
        btn.innerHTML = "Pause";
    } else {
        video.pause();
        btn.innerHTML = "Play";
    }
}
btn.addEventListener('click', () => {
    playVideo();
});

let width = 0;
let preloader = document.querySelectorAll(".preloader");
let fade = document.querySelector(".fade");
window.onload = function(e){
    let element = document.querySelector(".load-bar");
    let width = 1;
    let identity = setInterval(scene, 50);
    function scene() {
        if (width >= 100) {
            clearInterval(identity);
            for(let key of preloader){
                key.parentNode.removeChild(key);
            }
        } else {
            width++;
            element.style.width = width + '%';
        }
    }
};
