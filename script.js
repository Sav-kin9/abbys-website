const slides = document.querySelectorAll('.slide');
const slider = document.querySelector('.slider');
const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.prev');

let index = 0;

function updateSlider() {
  slides.forEach(slide => slide.classList.remove('active'));
  slides[index].classList.add('active');
  const offset = index * (slides[0].offsetWidth + 20);
  slider.style.transform = `translateX(calc(50% - ${offset}px - ${slides[0].offsetWidth / 2}px))`;
}

// Button click events
nextBtn.addEventListener('click', () => {
  index = (index + 1) % slides.length;
  updateSlider();
});

prevBtn.addEventListener('click', () => {
  index = (index - 1 + slides.length) % slides.length;
  updateSlider();
});

// Optional: click-to-select slide (on desktop)
slides.forEach((slide, i) => {
  slide.addEventListener('click', () => {
    index = i;
    updateSlider();
  });
});

// Swipe Support for touchscreen
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


  // SLIDER AUTOPLAY AND LOOPING 

// Auto-play every 4 seconds
let autoplayInterval = setInterval(() => {
  index = (index + 1) % slides.length;
  updateSlider();
}, 4000);

// Optional: pause on mouse over slider
slider.addEventListener('mouseenter', () => clearInterval(autoplayInterval));
slider.addEventListener('mouseleave', () => {
  autoplayInterval = setInterval(() => {
    index = (index + 1) % slides.length;
    updateSlider();
  }, 4000);
});

// NAVBAR TOGGLE FOR MOBILE
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
  menuToggle.classList.toggle('open');
  navLinks.classList.toggle('active');
});


// SIMPLE ADD-TO-CART LOGIC
let cart = [];

const productCards = document.querySelectorAll('.product-card');
productCards.forEach(card => {
  const name = card.querySelector('h3').innerText;
  const price = card.querySelector('.price').innerText;
  const img = card.querySelector('img').src;
  const btn = card.querySelector('button');

  btn.addEventListener('click', () => {
    const product = {
      name,
      price,
      img,
      quantity: 1,
    };

    const existing = cart.find(item => item.name === product.name);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push(product);
    }

    alert(`✅ Added "${product.name}" to cart.`);
    console.log(cart); // For dev/testing
  });
});

// === CART LOGIC ===
// let cart = [];

const cartToggle = document.getElementById('cartToggle');
const cartPanel = document.getElementById('cartPanel');
const cartCount = document.getElementById('cartCount');
const cartItemsEl = document.getElementById('cartItems');
const cartTotalEl = document.getElementById('cartTotal');
const closeCart = document.getElementById('closeCart');

// Toggle Cart Panel
cartToggle.addEventListener('click', () => {
  cartPanel.classList.toggle('open');
});

closeCart.addEventListener('click', () => {
  cartPanel.classList.remove('open');
});

// Update UI
function updateCartUI() {
  cartItemsEl.innerHTML = '';
  let total = 0;

  cart.forEach(item => {
    const li = document.createElement('li');
    li.innerHTML = `
      ${item.name} x${item.quantity}
      <button class="remove-item" data-name="${item.name}">❌</button>
    `;
    cartItemsEl.appendChild(li);

    const cleanPrice = parseFloat(item.price.replace(/[^\d.]/g, ''));
    total += cleanPrice * item.quantity;
  });

  cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartTotalEl.textContent = `₦${total.toLocaleString()}`;

  // Remove buttons
  document.querySelectorAll('.remove-item').forEach(btn => {
    btn.addEventListener('click', () => {
      const name = btn.dataset.name;
      cart = cart.filter(item => item.name !== name);
      updateCartUI();
    });
  });
}

// Hook into product cards
// const productCards = document.querySelectorAll('.product-card');

productCards.forEach(card => {
  const name = card.querySelector('h3').innerText;
  const price = card.querySelector('.price').innerText;
  const img = card.querySelector('img').src;
  const btn = card.querySelector('button');

  btn.addEventListener('click', () => {
    const product = { name, price, img, quantity: 1 };
    const existing = cart.find(item => item.name === product.name);

    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push(product);
    }

    updateCartUI();
    alert(`✅ "${product.name}" added to cart.`);
  });
});
