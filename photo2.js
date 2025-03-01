document.addEventListener('DOMContentLoaded', function() {
    // Get all collection headers
    const collectionHeaders = document.querySelectorAll('.collection-header');
    
    // Add click event listener to each header
    collectionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            // Toggle active class on the parent collection
            const collection = this.parentElement;
            collection.classList.toggle('active');
            
            // Update the toggle icon
            const toggleIcon = this.querySelector('.toggle-icon');
            if (collection.classList.contains('active')) {
                toggleIcon.textContent = '+'; // Still + but rotated with CSS
            } else {
                toggleIcon.textContent = '+';
            }
        });
    });
    
    // Optional: Open the first collection by default
    // const firstCollection = document.querySelector('.collection');
    // if (firstCollection) {
    //     firstCollection.classList.add('active');
    //     firstCollection.querySelector('.toggle-icon').textContent = '+';
    // }
});

// Global variables for lightbox navigation
let currentGallery = [];
let currentIndex = 0;

// Lightbox functionality
function openLightbox(img) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const caption = document.getElementById('lightbox-caption');
    
    // Find the gallery this image belongs to
    const galleryContainer = img.closest('.photo-scroll');
    const allImagesInGallery = galleryContainer.querySelectorAll('img');
    
    // Store gallery images and current index
    currentGallery = Array.from(allImagesInGallery);
    currentIndex = currentGallery.indexOf(img);
    
    // Display the lightbox
    lightbox.style.display = 'flex';
    lightboxImg.src = img.src;
    caption.innerHTML = img.alt;
    
    // Prevent scrolling on the body when lightbox is open
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    document.getElementById('lightbox').style.display = 'none';
    
    // Re-enable scrolling on the body
    document.body.style.overflow = 'auto';
}

// Navigate to previous or next image
function changeImage(direction) {
    if (currentGallery.length <= 1) return;
    
    currentIndex += direction;
    
    // Loop back to the other end if we go out of bounds
    if (currentIndex >= currentGallery.length) {
        currentIndex = 0;
    } else if (currentIndex < 0) {
        currentIndex = currentGallery.length - 1;
    }
    
    const lightboxImg = document.getElementById('lightbox-img');
    const caption = document.getElementById('lightbox-caption');
    
    // Create a new image to preload and handle transition
    const newImage = new Image();
    newImage.onload = function() {
        // Reset animation
        lightboxImg.style.animation = 'none';
        setTimeout(() => {
            lightboxImg.style.animation = 'zoom 0.4s';
        }, 10);
        
        // Update image and caption
        lightboxImg.src = currentGallery[currentIndex].src;
        caption.innerHTML = currentGallery[currentIndex].alt;
    };
    newImage.src = currentGallery[currentIndex].src;
}

// Close lightbox when clicking outside the image
document.addEventListener('DOMContentLoaded', function() {
    const lightbox = document.getElementById('lightbox');
    
    lightbox.addEventListener('click', function(e) {
        // If the click is on the lightbox background (not on the image or navigation)
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (lightbox.style.display === 'flex') {
            if (e.key === 'Escape') {
                closeLightbox();
            } else if (e.key === 'ArrowLeft') {
                changeImage(-1);
            } else if (e.key === 'ArrowRight') {
                changeImage(1);
            }
        }
    });
});