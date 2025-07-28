
    // Fade-in effect when scrolling into view
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




    const slider = document.getElementById('slider');
const sliderWrapper = document.getElementById('sliderWrapper');
let slides = document.querySelectorAll('.slide');

// Clone first and last slides
const firstClone = slides[0].cloneNode(true);
const lastClone = slides[slides.length - 1].cloneNode(true);

firstClone.id = 'first-clone';
lastClone.id = 'last-clone';

sliderWrapper.appendChild(firstClone);
sliderWrapper.insertBefore(lastClone, slides[0]);

slides = document.querySelectorAll('.slide'); // Update slide list after cloning

let index = 1;
const slideWidth = slides[index].clientWidth;

sliderWrapper.style.transform = `translateX(-${slideWidth * index}px)`;

function updateSlider() {
  sliderWrapper.style.transition = 'transform 0.5s ease-in-out';
  sliderWrapper.style.transform = `translateX(-${slideWidth * index}px)`;

  updateBlur();

  sliderWrapper.addEventListener('transitionend', () => {
    if (slides[index].id === 'last-clone') {
      sliderWrapper.style.transition = 'none';
      index = slides.length - 2;
      sliderWrapper.style.transform = `translateX(-${slideWidth * index}px)`;
      updateBlur();
    }

    if (slides[index].id === 'first-clone') {
      sliderWrapper.style.transition = 'none';
      index = 1;
      sliderWrapper.style.transform = `translateX(-${slideWidth * index}px)`;
      updateBlur();
    }
  });
}

function updateBlur() {
  slides.forEach((slide, i) => {
    slide.classList.remove('blur');
    if (i !== index) {
      slide.classList.add('blur');
    }
  });
}

updateBlur(); // Initial blur state

// Autoplay
let autoplayInterval = setInterval(() => {
  index++;
  updateSlider();
}, 4000);

// Pause autoplay on hover
slider.addEventListener('mouseenter', () => clearInterval(autoplayInterval));
slider.addEventListener('mouseleave', () => {
  autoplayInterval = setInterval(() => {
    index++;
    updateSlider();
  }, 4000);
});
