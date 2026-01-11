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

// Modal Controls (with touch swipe)
let currentIndex = 0;
const totalItems = 54;
const modal = document.getElementById('modal');
const modalImg = document.getElementById('modalImg');

function openModal(index) {
  currentIndex = index - 1;
  updateModal();
  modal.style.display = "flex";
}

function closeModal() {
  modal.style.display = "none";
}

function changeImage(dir) {
  currentIndex = (currentIndex + dir + totalItems) % totalItems;
  updateModal();
}

function updateModal() {
  const num = currentIndex + 1;
  modalImg.src = `A.M. IMAGES/A.M. ${num}.jpg`;
}

// Close on outside click
if (modal) {
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
}

// Touch Swipe for Modal
let touchStartX = 0;
let touchEndX = 0;

if (modal) {
  modal.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
  });

  modal.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    if (touchStartX - touchEndX > 50) changeImage(1);   // swipe left → next
    if (touchEndX - touchStartX > 50) changeImage(-1);  // swipe right → prev
  });
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
  if (modal.style.display === 'flex') {
    if (e.key === 'ArrowLeft') changeImage(-1);
    if (e.key === 'ArrowRight') changeImage(1);
    if (e.key === 'Escape') closeModal();
  }
});