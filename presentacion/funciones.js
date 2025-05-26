const slides = document.querySelectorAll('.slide');
let currentSlide = 0;

function showSlide(index) {
  if (index === currentSlide) return;

  slides[currentSlide].classList.remove('visible');
  slides[index].classList.add('visible');
  currentSlide = index;
}

function nextSlide() {
  let nextIndex = (currentSlide + 1) % slides.length;
  showSlide(nextIndex);
}

function prevSlide() {
  let prevIndex = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(prevIndex);
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight') nextSlide();
  if (e.key === 'ArrowLeft') prevSlide();
});

document.querySelector('.nav-left').addEventListener('click', prevSlide);
document.querySelector('.nav-right').addEventListener('click', nextSlide);

// Carrusel automático
const carouselImgs = document.querySelectorAll('.carousel img');
let currentImg = 0;

setInterval(() => {
  const carousel = slides[currentSlide].querySelector('.carousel');
  if (!carousel) return;

  carouselImgs.forEach((img) => {
    img.classList.remove('active');
    img.style.zIndex = '0';
  });

  currentImg = (currentImg + 1) % carouselImgs.length;
  carouselImgs[currentImg].classList.add('active');
  carouselImgs[currentImg].style.zIndex = '1';
}, 2500);
