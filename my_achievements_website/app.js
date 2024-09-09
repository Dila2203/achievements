document.addEventListener('DOMContentLoaded', () => {
    const certsGallery = document.querySelector('.certs-gallery');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const lightboxClose = document.getElementById('lightbox-close');
    let currentIndex = 0;
    const images = [];

    // Function to create image elements
    function createImageElement(index) {
        const img = document.createElement('img');
        img.src = `images/certificate_${index}.jpg`; // Default to .jpg
        img.alt = `Certificate ${index}`;
        img.classList.add('cert-image');

        // Try different formats if the default doesn't work
        img.onerror = () => {
            img.src = `images/certificate_${index}.png`; // Fallback to .png
        };

        img.addEventListener('click', () => {
            currentIndex = index - 1; // Set the current index
            showLightbox();
        });

        return img;
    }

    // Show the lightbox with the selected image
    function showLightbox() {
        lightboxImg.src = `images/certificate_${currentIndex + 1}.jpg`; // Default to .jpg

        // Check if .jpg image is available, if not fallback to .png
        const img = new Image();
        img.src = lightboxImg.src;
        img.onload = () => {
            lightbox.style.display = 'flex';
        };
        img.onerror = () => {
            lightboxImg.src = `images/certificate_${currentIndex + 1}.png`; // Fallback to .png
            lightbox.style.display = 'flex';
        };
    }

    // Hide the lightbox
    function hideLightbox() {
        lightbox.style.display = 'none';
    }

    // Navigate to the next image
    function showNextImage() {
        if (currentIndex < images.length - 1) {
            currentIndex++;
            showLightbox();
        }
    }

    // Navigate to the previous image
    function showPrevImage() {
        if (currentIndex > 0) {
            currentIndex--;
            showLightbox();
        }
    }

    // Add event listeners for navigation buttons
    nextBtn.addEventListener('click', showNextImage);
    prevBtn.addEventListener('click', showPrevImage);
    lightboxClose.addEventListener('click', hideLightbox);

    // Populate the gallery with certificates
    for (let i = 1; i <= 31; i++) {
        const img = createImageElement(i);
        certsGallery.appendChild(img);
        images.push(img); // Keep a reference to images
    }
});
