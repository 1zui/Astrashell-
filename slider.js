document.addEventListener('DOMContentLoaded', function () {

    // --- LOGIKA UNTUK HERO SLIDER ---
    const heroSlider = document.querySelector('.hero-slider');
    if (heroSlider) {
        const wrapper = heroSlider.querySelector('.hero-slider__wrapper');
        let slides = Array.from(heroSlider.querySelectorAll('.hero-slider__slide'));
        const dotsContainer = heroSlider.querySelector('.hero-slider__dots');

        if (slides.length > 1) { // Hanya jalankan jika slide lebih dari 1
            let currentIndex = 1; // Mulai dari slide asli pertama (indeks 1 setelah kloning)
            let isTransitioning = false;
            let slideInterval;

            // 1. KLONING SLIDE
            const firstClone = slides[0].cloneNode(true);
            const lastClone = slides[slides.length - 1].cloneNode(true);

            wrapper.appendChild(firstClone);
            wrapper.insertBefore(lastClone, slides[0]);

            // Update 'slides' array untuk menyertakan klon
            slides = Array.from(wrapper.querySelectorAll('.hero-slider__slide'));
            const totalSlides = slides.length;

            // Pindahkan posisi awal ke slide asli pertama (bukan klon)
            wrapper.style.transform = `translateX(-${currentIndex * 100}%)`;

            // Buat dots (berdasarkan jumlah slide asli)
            for (let i = 0; i < slides.length - 2; i++) {
                const dot = document.createElement('div');
                dot.classList.add('hero-slider__dot');
                dot.addEventListener('click', () => {
                    if (isTransitioning) return;
                    goToSlide(i + 1); // +1 karena klon di awal
                    resetInterval();
                });
                dotsContainer.appendChild(dot);
            }
            const dots = dotsContainer.querySelectorAll('.hero-slider__dot');

            function goToSlide(index) {
                if (isTransitioning) return;
                isTransitioning = true;

                currentIndex = index;
                wrapper.style.transition = 'transform 0.7s ease-in-out';
                wrapper.style.transform = `translateX(-${currentIndex * 100}%)`;
                updateDots();
            }

            function updateDots() {
                let realIndex = currentIndex - 1;
                if (currentIndex === 0) {
                    realIndex = slides.length - 3; // Jika di klon terakhir, aktifkan dot terakhir
                } else if (currentIndex === slides.length - 1) {
                    realIndex = 0; // Jika di klon pertama, aktifkan dot pertama
                }
                dots.forEach((dot, i) => {
                    dot.classList.toggle('active', i === realIndex);
                });
            }

            // 2. LOGIKA 'SILENT JUMP' SETELAH TRANSISI
            wrapper.addEventListener('transitionend', () => {
                if (currentIndex === 0) { // Jika sampai di klon terakhir (di awal)
                    wrapper.style.transition = 'none';
                    currentIndex = totalSlides - 2; // Pindah ke slide terakhir asli
                    wrapper.style.transform = `translateX(-${currentIndex * 100}%)`;
                }
                if (currentIndex === totalSlides - 1) { // Jika sampai di klon pertama (di akhir)
                    wrapper.style.transition = 'none';
                    currentIndex = 1; // Pindah ke slide pertama asli
                    wrapper.style.transform = `translateX(-${currentIndex * 100}%)`;
                }
                isTransitioning = false;
            });

            // Fungsi untuk auto-play
            function startInterval() {
                clearInterval(slideInterval);
                slideInterval = setInterval(() => {
                    goToSlide(currentIndex + 1);
                }, 4000);
            }
            const resetInterval = () => startInterval();

            // Inisialisasi
            updateDots();
            startInterval();
        }
    }
}); 

  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".slider-wrapper").forEach(wrapper => {
      const track = wrapper.querySelector(".slider-track");
      const prevBtn = wrapper.querySelector(".slider-btn.prev");
      const nextBtn = wrapper.querySelector(".slider-btn.next");

      if (!track) return;

      const scrollAmount = track.firstElementChild?.offsetWidth + 16 || 300;

      prevBtn?.addEventListener("click", () => {
        track.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      });
      nextBtn?.addEventListener("click", () => {
        track.scrollBy({ left: scrollAmount, behavior: "smooth" });
      });
    });
  });




