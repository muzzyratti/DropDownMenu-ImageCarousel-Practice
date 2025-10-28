import "./styles.css";

document.addEventListener('click', e => {
    const isDropdownButton = e.target.matches("[data-dropdown-button]")
    if (!isDropdownButton && e.target.closest("[data-dropdown]") != null) return

    let curerentDropdown
    if (isDropdownButton) {
        curerentDropdown = e.target.closest("[data-dropdown]")
        curerentDropdown.classList.toggle("active")
    }

    document.querySelectorAll("[data-dropdown].active").forEach(dropdown => {
        if (dropdown === curerentDropdown) return
        dropdown.classList.remove("active")
    })
});

let slideIndex = 1;
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const dots = document.querySelectorAll('.dot');


showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

window.plusSlides = plusSlides;
window.currentSlide = currentSlide;

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("carousel");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}

prevBtn.addEventListener('click', () => plusSlides(-1));
nextBtn.addEventListener('click', () => plusSlides(1));

dots.forEach(dot => {
  dot.addEventListener('click', () => {
    const index = Number(dot.dataset.index);
    currentSlide(index);
  });
});

let autoPlayInterval;

function startAutoPlay() {
  stopAutoPlay();
  autoPlayInterval = setInterval(() => plusSlides(1), 5000);
}

function stopAutoPlay() {
  clearInterval(autoPlayInterval);
}

prevBtn.addEventListener('click', () => {
  plusSlides(-1);
  startAutoPlay();
});

nextBtn.addEventListener('click', () => {
  plusSlides(1);
  startAutoPlay();
});

dots.forEach(dot => {
  dot.addEventListener('click', () => {
    const index = Number(dot.dataset.index);
    currentSlide(index);
    startAutoPlay();
  });
});

const carouselContainer = document.querySelector('.carousel-container');

carouselContainer.addEventListener('mouseenter', stopAutoPlay);
carouselContainer.addEventListener('mouseleave', startAutoPlay);

startAutoPlay();