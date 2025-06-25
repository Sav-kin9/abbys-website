
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


