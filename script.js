// ==========================================
// 1. FAST VIDEO LOADER
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    // Force load and play on all videos immediately
    const allVideos = document.querySelectorAll('video');
    allVideos.forEach(video => {
        video.load();
        video.play().catch(err => console.log("Autoplay paused by browser:", err));
    });
});

// ==========================================
// 2. SCROLL ANIMATIONS
// ==========================================
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        } else {
            entry.target.classList.remove('visible');
        }
    });
}, { threshold: 0.1 });

const elementsToAnimate = document.querySelectorAll('.animate-on-scroll');
elementsToAnimate.forEach((element) => {
    observer.observe(element);
});

// ==========================================
// 3. TYPING ANIMATION
// ==========================================
document.addEventListener('DOMContentLoaded', function() {
    const typingTextSpan = document.querySelector('.typing-text');
    const textArray = ["Professional Video Editor", "Creative Colorist", "Visual Storyteller"];
    const typingDelay = 150;
    const erasingDelay = 100;
    const newTextDelay = 2000;
    let textArrayIndex = 0;
    let charIndex = 0;

    function type() {
        if (charIndex < textArray[textArrayIndex].length) {
            typingTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, typingDelay);
        } else {
            setTimeout(erase, newTextDelay);
        }
    }

    function erase() {
        if (charIndex > 0) {
            typingTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, erasingDelay);
        } else {
            textArrayIndex++;
            if (textArrayIndex >= textArray.length) textArrayIndex = 0;
            setTimeout(type, typingDelay + 1100);
        }
    }

    if (textArray.length) setTimeout(type, newTextDelay + 250);
});

// ==========================================
// 4. WORKING CONTACT FORM (WEB3FORMS)
// ==========================================
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault(); 
    
    const form = e.target;
    const statusMessage = document.getElementById('form-status');
    const submitButton = form.querySelector('button[type="submit"]');
    
    submitButton.innerText = "Sending...";
    
    const formData = new FormData(form);
    
    formData.append("access_key", "ed446fdd-4bbc-40f7-b006-4fbfbc05cf6d");

    fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            statusMessage.style.display = "block";
            statusMessage.style.color = "#FFD700"; 
            statusMessage.innerText = "Message sent successfully! I will get back to you soon.";
            form.reset(); 
        } else {
            statusMessage.style.display = "block";
            statusMessage.style.color = "red";
            statusMessage.innerText = "Something went wrong. Please try again later.";
        }
    })
    .catch(error => {
        statusMessage.style.display = "block";
        statusMessage.style.color = "red";
        statusMessage.innerText = "Error sending message. Check your connection.";
    })
    .finally(() => {
        submitButton.innerText = "Send Message";
        setTimeout(() => {
            statusMessage.style.display = "none";
        }, 5000);
    });
});