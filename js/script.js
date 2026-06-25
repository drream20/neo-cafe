/* =====================================
   LOADER
===================================== */

window.addEventListener("load", () => {
    const loader = document.querySelector(".loader");

    setTimeout(() => {
        loader.style.opacity = "0";

        setTimeout(() => {
            loader.style.display = "none";
        }, 500);

    }, 1000);
});

/* =====================================
   MOBILE MENU
===================================== */

const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});

/* Close mobile menu on click */

document.querySelectorAll(".nav-links a").forEach(link => {

    link.addEventListener("click", () => {
        navLinks.classList.remove("active");
    });

});

/* =====================================
   NAVBAR SCROLL EFFECT
===================================== */

const header = document.getElementById("header");

window.addEventListener("scroll", () => {

    if(window.scrollY > 50){
        header.classList.add("scrolled");
    }else{
        header.classList.remove("scrolled");
    }

});

/* =====================================
   DARK MODE
===================================== */

const themeBtn = document.getElementById("theme-toggle");

themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    const icon = themeBtn.querySelector("i");

    if(document.body.classList.contains("dark")){
        icon.classList.remove("fa-moon");
        icon.classList.add("fa-sun");

        localStorage.setItem("theme", "dark");

    }else{

        icon.classList.remove("fa-sun");
        icon.classList.add("fa-moon");

        localStorage.setItem("theme", "light");
    }

});

/* Load saved theme */

if(localStorage.getItem("theme") === "dark"){

    document.body.classList.add("dark");

    const icon = themeBtn.querySelector("i");

    icon.classList.remove("fa-moon");
    icon.classList.add("fa-sun");
}

/* =====================================
   SCROLL REVEAL
===================================== */

const reveals = document.querySelectorAll(".reveal");

function revealElements(){

    reveals.forEach(item => {

        const top = item.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if(top < windowHeight - 100){
            item.classList.add("active");
        }

    });

}

window.addEventListener("scroll", revealElements);
revealElements();

/* =====================================
   COUNTER ANIMATION
===================================== */

const counters = document.querySelectorAll(".counter");

let counterStarted = false;

function runCounters(){

    if(counterStarted) return;

    const section = document.querySelector(".stats");

    if(!section) return;

    const trigger = section.getBoundingClientRect().top;

    if(trigger < window.innerHeight - 100){

        counterStarted = true;

        counters.forEach(counter => {

            const target = +counter.dataset.target;

            let count = 0;

            const increment = target / 200;

            const updateCounter = () => {

                if(count < target){

                    count += increment;

                    counter.innerText =
                    Math.floor(count).toLocaleString();

                    requestAnimationFrame(updateCounter);

                }else{

                    counter.innerText =
                    target.toLocaleString();
                }

            };

            updateCounter();

        });
    }
}

window.addEventListener("scroll", runCounters);

/* =====================================
   MENU FILTER
===================================== */

const filterButtons =
document.querySelectorAll(".filter-btn");

const menuItems =
document.querySelectorAll(".menu-item");

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        filterButtons.forEach(btn =>
            btn.classList.remove("active")
        );

        button.classList.add("active");

        const filter =
        button.getAttribute("data-filter");

        menuItems.forEach(item => {

            if(
                filter === "all" ||
                item.classList.contains(filter)
            ){
                item.style.display = "flex";
            }else{
                item.style.display = "none";
            }

        });

    });

});

/* =====================================
   GALLERY LIGHTBOX
===================================== */

const galleryImages =
document.querySelectorAll(".gallery-img");

const lightbox =
document.querySelector(".lightbox");

const lightboxImg =
document.getElementById("lightbox-img");

const closeLightbox =
document.querySelector(".close-lightbox");

galleryImages.forEach(image => {

    image.addEventListener("click", () => {

        lightbox.style.display = "flex";

        lightboxImg.src = image.src;

    });

});

closeLightbox.addEventListener("click", () => {

    lightbox.style.display = "none";

});

lightbox.addEventListener("click", e => {

    if(e.target === lightbox){
        lightbox.style.display = "none";
    }

});

/* =====================================
   TESTIMONIAL SLIDER
===================================== */

const testimonials =
document.querySelectorAll(".testimonial");

let currentSlide = 0;

function showSlide(index){

    testimonials.forEach(item =>
        item.classList.remove("active")
    );

    testimonials[index].classList.add("active");
}

setInterval(() => {

    currentSlide++;

    if(currentSlide >= testimonials.length){
        currentSlide = 0;
    }

    showSlide(currentSlide);

}, 5000);

/* =====================================
   NEWSLETTER FORM
===================================== */

const newsletterForm =
document.getElementById("newsletter-form");

const message =
document.getElementById("form-message");

newsletterForm.addEventListener("submit", e => {

    e.preventDefault();

    const email =
    newsletterForm.querySelector("input").value;

    const regex =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(regex.test(email)){

        message.innerHTML =
        "✅ Thank you for subscribing!";

        message.style.color = "green";

        newsletterForm.reset();

    }else{

        message.innerHTML =
        "❌ Please enter a valid email.";

        message.style.color = "red";
    }

});

/* =====================================
   BACK TO TOP BUTTON
===================================== */

const backToTop =
document.getElementById("backToTop");

window.addEventListener("scroll", () => {

    if(window.scrollY > 500){
        backToTop.style.display = "block";
    }else{
        backToTop.style.display = "none";
    }

});

backToTop.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});

/* =====================================
   ACTIVE NAVIGATION LINK
===================================== */

const sections =
document.querySelectorAll("section");

const navItems =
document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const top =
        section.offsetTop - 120;

        const height =
        section.offsetHeight;

        if(
            scrollY >= top &&
            scrollY < top + height
        ){
            current = section.getAttribute("id");
        }

    });

    navItems.forEach(link => {

        link.classList.remove("active");

        if(
            link.getAttribute("href")
            === `#${current}`
        ){
            link.classList.add("active");
        }

    });

});

/* =====================================
   HERO PARALLAX EFFECT
===================================== */

window.addEventListener("scroll", () => {

    const hero =
    document.querySelector(".hero");

    const scrollValue =
    window.pageYOffset;

    hero.style.backgroundPositionY =
    `${scrollValue * 0.5}px`;

});

/* =====================================
   FLOATING BLOBS ANIMATION
===================================== */

const blobs =
document.querySelectorAll(".floating");

blobs.forEach((blob, index) => {

    let direction = 1;

    let pos = 0;

    setInterval(() => {

        pos += 0.2 * direction;

        if(pos > 20 || pos < -20){
            direction *= -1;
        }

        blob.style.transform =
        `translateY(${pos}px)`;

    }, 30);

});

/* =====================================
   ESC KEY CLOSE LIGHTBOX
===================================== */

document.addEventListener("keydown", e => {

    if(e.key === "Escape"){
        lightbox.style.display = "none";
    }

});

/* =====================================
   PREVENT IMAGE DRAG
===================================== */

document.querySelectorAll("img")
.forEach(img => {

    img.setAttribute("draggable", "false");

});

/* =====================================
   YEAR AUTO UPDATE (optional)
===================================== */

const yearElement =
document.querySelector(".year");

if(yearElement){
    yearElement.textContent =
    new Date().getFullYear();
}