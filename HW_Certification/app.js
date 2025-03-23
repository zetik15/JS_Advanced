const productNameEl = document.getElementById('productName');
const reviewTextEl = document.getElementById('reviewText');
const addReviewBtn = document.getElementById('addReviewBtn');
const errorContainerEl = document.getElementById('errorContainer');
const errorMessageEl = document.getElementById('errorMessage')

const productListEl = document.getElementById('productList');
const emptyProductListEl = document.getElementById('emptyProductList');
const reviewsContainerEl = document.getElementById('reviewsContainer');
const emptyReviewsListEl = document.getElementById('emptyReviewsList');
const clearAllContainer = document.getElementById('clearAllContainer');
const clearAllBtn = document.getElementById('clearAllBtn');

function resetAnimation(element) {
    element.classList.remove('show');
    void element.offsetWidth;
    element.classList.add('show');
}

function deleteReview(reviewId) {
    let reviews = JSON.parse(localStorage.getItem('reviews')) || [];
    const reviewToDelete = reviews.find(review => review.id === reviewId);

    if (!reviewToDelete) {
        return;
    }

    const productId = reviewToDelete.productId;
    const productTitle = reviewToDelete.title;

    reviews = reviews.filter(review => review.id !== reviewId);
    localStorage.setItem('reviews', JSON.stringify(reviews));
    
    const allReviewsProduct = reviews.filter(review => {
        if (productId && review.productId) {
            return review.productId === productId;
        } else {
            return review.title === productTitle;
        }
    });

    const allCardsProduct = document.querySelectorAll('.product-card');

    if (allReviewsProduct.length === 0) {
        allCardsProduct.forEach(card => {
            const cardTitle = card.querySelector('.product-name').textContent;
            if (cardTitle === productTitle) {
                card.remove();
            }
        });
    }

    if (reviewsContainerEl.querySelectorAll('.review-item').length === 0) {
        if (emptyReviewsListEl) {
            emptyReviewsListEl.style.display = 'block';
        }
    }

    if (emptyProductListEl) {
        emptyProductListEl.style.display = 'block';
    }

    if (clearAllContainer) {
        clearAllContainer.style.display = 'none';
    }
}

function deleteProduct(productTitle) {
    let reviews = JSON.parse(localStorage.getItem('reviews')) || [];
    const productReview = reviews.find(review => review.title === productTitle);
    const productId = productReview ? productReview.productId : null;

    reviews = reviews.filter(review => {
        if (productId && review.productId) {
            return review.productId !== productId;
        } else {
            return review.title !== productTitle;
        }
    });
    localStorage.setItem('reviews', JSON.stringify(reviews));

    const productCards = document.querySelectorAll('.product-card');

    if (productCards.length > 0) {
        productCards.forEach(card => {
            const cardTitle = card.querySelector('.product-name').textContent;
            if (cardTitle === productTitle) {
                card.remove();
            }
        });
    }

    const reviewsEl = document.querySelectorAll('.review-item');

    if (reviewsEl.length > 0) {
        reviewsEl.forEach(review => {
            const reviewText = review.querySelector('.review-text').textContent;
            if (reviewText.includes(productTitle)) {
                review.remove();
            }
        });
    }

    if (emptyReviewsListEl) {
        emptyReviewsListEl.style.display = 'block';
    }

    const remainingProductCards = document.querySelectorAll('.product-card');
    
    if (remainingProductCards.length === 0) {
        if (emptyProductListEl) {
            emptyProductListEl.style.display = 'block';
        }

        if (clearAllContainer) {
            clearAllContainer.style.display = 'none';
        }
    }
}

let reviews = JSON.parse(localStorage.getItem('reviews')) || [];

document.addEventListener('DOMContentLoaded', function (e) {
    if (addReviewBtn) {
        addReviewBtn.addEventListener('click', function (e) {
            e.preventDefault();

            if (productNameEl.value !== '' && reviewTextEl.value !== '') {
                errorContainerEl.classList.remove('show');
                productNameEl.classList.remove('input-error');
                reviewTextEl.classList.remove('input-error');
                errorMessageEl.textContent = '';
    
                const newReview = {
                    id: Date.now(),
                    productId: Date.now(),
                    title: productNameEl.value,
                    review: reviewTextEl.value,
                };
    
                reviews.push(newReview);
                localStorage.setItem('reviews', JSON.stringify(reviews));
    
                productNameEl.value = '';
                reviewTextEl.value = '';
            } else {
                if (errorContainerEl.classList.contains('show')) {
                    resetAnimation(errorContainerEl);
                } else {
                    errorContainerEl.classList.add('show');
                }
    
                if (productNameEl.value === '' && reviewTextEl.value === '') {
                    productNameEl.classList.add('input-error');
                    reviewTextEl.classList.add('input-error');
                    errorMessageEl.textContent = 'Поля не могут быть пустыми';
                } else if (productNameEl.value === '') {
                    productNameEl.classList.add('input-error');
                    errorMessageEl.textContent = 'Введите название продукта!';
                } else {
                    reviewTextEl.classList.add('input-error');
                    errorMessageEl.textContent = 'Введите текст отзыва';
                }
            }
        });
    }

    if (productListEl) {
        reviews = JSON.parse(localStorage.getItem('reviews'));

        if (reviews !== null && reviews.length > 0) {
            emptyProductListEl.style.display = 'none';
            
            if (clearAllContainer) {
                clearAllContainer.style.display = 'block';
            }
            
            reviews.forEach(item => {
                if (item) {
                    const divEl = document.createElement('div');
                    divEl.className = 'product-card card';
                    divEl.setAttribute('data-id', item.id);
                    
                    const titleEl = document.createElement('h3');
                    titleEl.className = 'product-name';
                    titleEl.textContent = item.title;
                    divEl.appendChild(titleEl);
                    productListEl.appendChild(divEl);

                    const deleteBtn = document.createElement('button');
                    divEl.appendChild(deleteBtn);
                    deleteBtn.className = 'delete-btn';
                    deleteBtn.innerHTML = '<i class="fas fa-times"></i>';
                    deleteBtn.setAttribute('data-id', item.id);

                    deleteBtn.addEventListener('click', function (e) {
                        e.stopPropagation();

                        const card = this.closest('.product-card');
                        const productTitle = card.querySelector('.product-name').textContent;
                        deleteProduct(productTitle);
                    });

                    divEl.addEventListener('click', function (e) {
                        if (this.hasAttribute('data-clicked')) {
                            e.preventDefault();
                            return;
                        }

                        this.setAttribute('data-clicked', 'true')

                        const id = parseInt(this.getAttribute('data-id'));
                        const index = reviews.findIndex(review => review.id === id);

                        if (index !== - 1) {
                            emptyReviewsListEl.style.display = 'none';

                            const divEl = document.createElement('div');
                            divEl.className = 'review-item';

                            const textEl = document.createElement('p');
                            textEl.textContent = item.review + ` - ${item.title}`;
                            textEl.className = 'review-text';

                            const reviewDeleteBtn = document.createElement('button');
                            reviewDeleteBtn.innerHTML = '<i class="fas fa-times"></i>';
                            reviewDeleteBtn.className = 'review-delete-btn';
                            reviewDeleteBtn.setAttribute('data-id', item.id); 

                            reviewDeleteBtn.addEventListener('click', function (e) {
                                e.stopPropagation();

                                const id = parseInt(this.getAttribute('data-id'));

                                const reviewItem = this.closest('.review-item');
                                reviewItem.remove();

                                if (reviewsContainerEl.querySelectorAll('.review-item').length === 0) {
                                    emptyReviewsListEl.style.display = 'block';
                                }

                                deleteReview(id);
                            });

                            divEl.appendChild(textEl);
                            divEl.appendChild(reviewDeleteBtn);
                            reviewsContainerEl.appendChild(divEl);
                        }
                    });
                }
            });
        }

        if (clearAllBtn) {
            clearAllBtn.addEventListener('click', function (e) {
                localStorage.removeItem('reviews');
                reviews = [];

                const productCards = productListEl.querySelectorAll('.product-card');

                productCards.forEach(card => card.remove());

                const reviewsProduct = reviewsContainerEl.querySelectorAll('.review-item');

                reviewsProduct.forEach(review => review.remove());

                emptyReviewsListEl.style.display = 'block';
                emptyProductListEl.style.display = 'block';
                clearAllContainer.style.display = 'none';
            });
        }

        localStorage.setItem('reviews', JSON.stringify(reviews));
    }
});