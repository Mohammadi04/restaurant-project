// IMAGE SLIDER LOGIC
const wrapper = document.querySelector('.slider-wrapper');
const nextBtn = document.querySelector('.next-btn');
const prevBtn = document.querySelector('.prev-btn');
const slides = document.querySelectorAll('.slide');

let index = 0;

nextBtn.addEventListener('click', () => {
    index = (index < slides.length - 1) ? index + 1 : 0;
    wrapper.style.transform = `translateX(-${index * 100}%)`;
});

prevBtn.addEventListener('click', () => {
    index = (index > 0) ? index - 1 : slides.length - 1;
    wrapper.style.transform = `translateX(-${index * 100}%)`;
});

// SCROLL REVEAL LOGIC
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, { threshold: 0.1 });

const hiddenElements = document.querySelectorAll('.reveal');
hiddenElements.forEach((el) => observer.observe(el));
