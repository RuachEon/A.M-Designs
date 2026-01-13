// Mobile Hamburger Menu
document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.querySelector('.hamburger');
  const nav = document.querySelector('nav');

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      nav.classList.toggle('active');
    });
  }

  document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger?.classList.remove('active');
      nav?.classList.remove('active');
    });
  });
});

// Modal Controls – swipe + keyboard only (no buttons)
let currentIndex = 0;
const totalItems = 54;
const modal = document.getElementById('modal');
const modalImg = document.getElementById('modalImg');
const modalDesc = document.getElementById('modalDesc');

function openModal(index) {
  currentIndex = index - 1;
  updateModal();
  modal.style.display = "flex";
}

function closeModal() {
  modal.style.display = "none";
}

function updateModal() {
  const num = currentIndex + 1;
  modalImg.src = `A.M. IMAGES/A.M. ${num}.jpg`;
  modalDesc.textContent = "Creative graphic design work showcasing professional vision and execution.";
}

// Close on outside click (but not on image/content)
modal.addEventListener('click', (e) => {
  if (e.target === modal) closeModal();
});

// Swipe support (mobile/tablet)
let touchStartX = 0;
let touchEndX = 0;

modal.addEventListener('touchstart', e => {
  touchStartX = e.changedTouches[0].screenX;
});

modal.addEventListener('touchend', e => {
  touchEndX = e.changedTouches[0].screenX;
  handleSwipe();
});

function handleSwipe() {
  const swipeDistance = touchStartX - touchEndX;
  if (Math.abs(swipeDistance) > 60) { // minimum swipe distance
    if (swipeDistance > 0) {
      // Swipe left → next
      changeImage(1);
    } else {
      // Swipe right → previous
      changeImage(-1);
    }
  }
}

// Keyboard navigation (left/right arrows)
document.addEventListener('keydown', (e) => {
  if (modal.style.display === 'flex') {
    if (e.key === 'ArrowLeft') changeImage(-1);
    if (e.key === 'ArrowRight') changeImage(1);
    if (e.key === 'Escape') closeModal();
  }
});

function changeImage(dir) {
  currentIndex = (currentIndex + dir + totalItems) % totalItems;
  updateModal();
}