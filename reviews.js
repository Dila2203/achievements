document.addEventListener('DOMContentLoaded', () => {
    const reviewsList = document.getElementById('reviews-list');
    const reviewForm = document.getElementById('form-review');

    // Function to load reviews from local storage
    function loadReviews() {
        const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
        return reviews;
    }

    // Function to save reviews to local storage
    function saveReviews(reviews) {
        localStorage.setItem('reviews', JSON.stringify(reviews));
    }

    // Function to render reviews
    function renderReviews() {
        const reviews = loadReviews();
        reviewsList.innerHTML = '';
        reviews.forEach((review, index) => {
            const div = document.createElement('div');
            div.classList.add('review-item');
            div.innerHTML = `
                <strong>${review.name} (${review.email})</strong>: 
                <p>${review.review}</p>
                <span class="delete-text" data-index="${index}">Delete</span>
            `;
            reviewsList.appendChild(div);
        });

        // Attach event listeners to delete texts
        document.querySelectorAll('.delete-text').forEach(text => {
            text.addEventListener('click', () => {
                const index = text.getAttribute('data-index');
                deleteReview(index);
            });
        });
    }

    // Function to handle review deletion
    function deleteReview(index) {
        const reviews = loadReviews();
        reviews.splice(index, 1);
        saveReviews(reviews);
        renderReviews();
    }

    // Handle form submission
    reviewForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const review = document.getElementById('review').value.trim();
        if (name && email && review) {
            const reviews = loadReviews();
            reviews.push({ name, email, review });
            saveReviews(reviews);
            renderReviews();
            reviewForm.reset();
        }
    });

    // Initial render
    renderReviews();
});
