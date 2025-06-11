// Mobile Navigation
const menuToggle = document.getElementById('menuToggle');
const mobileNav = document.getElementById('mobileNav');

if (menuToggle && mobileNav) {
    menuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        mobileNav.classList.toggle('active');
        document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
    });
}

function closeMenu() {
    if (menuToggle && mobileNav) {
        menuToggle.classList.remove('active');
        mobileNav.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Close mobile menu when clicking outside
document.addEventListener('click', function(event) {
    if (menuToggle && mobileNav) {
        const isClickInsideMenu = mobileNav.contains(event.target);
        const isClickOnToggle = menuToggle.contains(event.target);
        
        if (!isClickInsideMenu && !isClickOnToggle && mobileNav.classList.contains('active')) {
            closeMenu();
        }
    }
});

// Close menu when window is resized to desktop size
window.addEventListener('resize', function() {
    if (window.innerWidth > 768 && mobileNav && mobileNav.classList.contains('active')) {
        closeMenu();
    }
});

// Form Validation
const signupForm = document.getElementById('signupForm');
if (signupForm) {
    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        // Add your form submission logic here
        alert('Thank you for your interest! We will review your application and get back to you soon.');
        this.reset();
    });
} 