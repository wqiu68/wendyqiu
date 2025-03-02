<script>
// Simple JavaScript for enabling smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Mobile menu functionality
document.addEventListener('DOMContentLoaded', function() {
  const menuBtn = document.querySelector('.menu-btn');
  const nav = document.querySelector('.nav');
  
  menuBtn.addEventListener('click', function() {
    menuBtn.classList.toggle('open');
    nav.classList.toggle('open');
  });
  
  // Close menu when clicking a link
  const navLinks = document.querySelectorAll('.nav-list li a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      menuBtn.classList.remove('open');
      nav.classList.remove('open');
    });
  });
});
</script>

