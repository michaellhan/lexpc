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

// Form submission
const signupForm = document.getElementById('signupForm');
if (signupForm) {
    signupForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const formData = {
            name: this.querySelector('input[type="text"]').value,
            email: this.querySelector('input[type="email"]').value,
            grade: this.querySelector('select').value,
            experience: this.querySelector('textarea').value
        };

        try {
            const response = await fetch('submit.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            const result = await response.json();
            
            if (result.success) {
                alert(result.message);
                this.reset();
            } else {
                alert(result.message || 'Failed to submit application. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again later.');
        }
    });
} 