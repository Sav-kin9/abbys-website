const slides = document.querySelectorAll('.slide');
const slider = document.querySelector('.slider');
const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.prev');

let index = 0;

function updateSlider() {
  slides.forEach(slide => slide.classList.remove('active'));
  slides[index].classList.add('active');
  const offset = index * (slides[0].offsetWidth + 20); // width + gap
  slider.style.transform = `translateX(calc(50% - ${offset}px - ${slides[0].offsetWidth / 2}px))`;
}

nextBtn.addEventListener('click', () => {
  index = (index + 1) % slides.length;
  updateSlider();
});

prevBtn.addEventListener('click', () => {
  index = (index - 1 + slides.length) % slides.length;
  updateSlider();
});

slides.forEach((slide, i) => {
  slide.addEventListener('mouseover', () => {
    index = i;
    updateSlider();
  });
});

// Swipe Support
let startX = 0;

slider.addEventListener('touchstart', (e) => {
  startX = e.touches[0].clientX;
});

slider.addEventListener('touchend', (e) => {
  let endX = e.changedTouches[0].clientX;
  if (endX - startX > 50) {
    index = (index - 1 + slides.length) % slides.length;
    updateSlider();
  } else if (startX - endX > 50) {
    index = (index + 1) % slides.length;
    updateSlider();
  }
});

// Initial load
updateSlider();



// FADE IN EFFECT
 const faders = document.querySelectorAll('.fade-in');

  const appearOnScroll = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.1,
    }
  );

  faders.forEach(fade => {
    appearOnScroll.observe(fade);
  });