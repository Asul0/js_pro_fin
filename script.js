// Utility function to get reviews from localStorage
function getReviews() {
    return JSON.parse(localStorage.getItem('reviews')) || {};
  }
  
  // Utility function to save reviews to localStorage
  function saveReviews(reviews) {
    localStorage.setItem('reviews', JSON.stringify(reviews));
  }
  
  // Handle form submission for adding a review
  document.getElementById('reviewForm')?.addEventListener('submit', function(event) {
    event.preventDefault();
    const productName = document.getElementById('productName').value.trim();
    const reviewText = document.getElementById('reviewText').value.trim();
  
    if (productName && reviewText) {
      const reviews = getReviews();
      if (!reviews[productName]) {
        reviews[productName] = [];
      }
      reviews[productName].push(reviewText);
      saveReviews(reviews);
      alert('Review added successfully');
      document.getElementById('reviewForm').reset();
    } else {
      alert('Please enter a product name and a review');
    }
  });
  
  // Load product list and reviews on the view-reviews page
  if (document.getElementById('productList')) {
    const reviews = getReviews();
    const productList = document.getElementById('productList');
    productList.innerHTML = '<h2>Products</h2>';
    const ul = document.createElement('ul');
    Object.keys(reviews).forEach(product => {
      const li = document.createElement('li');
      li.textContent = product;
      li.addEventListener('click', () => showReviews(product));
      ul.appendChild(li);
    });
    productList.appendChild(ul);
  }
  
  function showReviews(product) {
    const reviews = getReviews();
    const reviewList = document.getElementById('reviewList');
    reviewList.innerHTML = `<h2>Reviews for ${product}</h2>`;
    const ul = document.createElement('ul');
    reviews[product].forEach((review, index) => {
      const li = document.createElement('li');
      li.textContent = review;
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.addEventListener('click', () => deleteReview(product, index));
      li.appendChild(deleteButton);
      ul.appendChild(li);
    });
    reviewList.appendChild(ul);
  }
  
  function deleteReview(product, index) {
    const reviews = getReviews();
    reviews[product].splice(index, 1);
    if (reviews[product].length === 0) {
      delete reviews[product];
    }
    saveReviews(reviews);
    showReviews(product);
  }
  