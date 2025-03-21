class Library {
    #books = [];

    get allBooks() {
        return this.#books;
    }

    addBook(title) {
        const findTitle = this.#books.find(book => book.title === title);

        if (findTitle) {
            throw new Error('Такая книга уже есть')
        } else {
            this.#books.push(book = {
                title: title
            });
        }

        return this.#books;
    }

    removeBook(title) {
        const undefinedTitle = this.#books.find(book => book.title === title);
        const indexBook = this.#books.indexOf(undefinedTitle);

        if (undefinedTitle) {
            this.#books.splice(indexBook, 1)
        } else {
            throw new Error('Такой книги нет')
        }

        return this.#books
    }

    hasBook(title) {
        return Boolean(this.#books.find(book => book.title === title));
    }

    constructor(books = []) {
        this.#books = [];

        books.forEach(book => {
            if (this.hasBook(book.title)) {
                throw new Error ('Это дубликат');
            } else {
                this.#books.push(book);
            }
        });
    }
};


// task 2

const initialData = [
    {
        product: "Apple iPhone 13",
        reviews: [
            {
                id: "1",
                text: "Отличный телефон! Батарея держится долго."
            },
            {
                id: "2",
                text: "Камера супер, фото выглядят просто потрясающе."
            }
        ]
    },
    {
        product: "Samsung Galaxy Z Fold 4",
        reviews: [
            {
                id: "3",
                text: "Интересный дизайн, но дороговат."
            }
        ]
    },
    {
        product: "Sony PlayStation 5",
        reviews: [
            {
                id: "4",
                text: "Люблю играть на PS5, графика на высоте."
            }
        ]
    }
];

class ReviewManager {
    #reviews = [];

    constructor(reviews = []) {
        this.#reviews = reviews;
    };

    addReview(product, review) {

        const existingProduct = this.#reviews.find(item => item.product === product);

        if (review.length < 50 || review.length > 500) {
            throw new Error('Отзыв должен содержать от 50 до 500 символов');
        }

        if (existingProduct) {
            existingProduct.reviews.push({
                id: Date.now().toString(),
                text: review
            })
        } else {
            this.#reviews.push({
                product: product,
                reviews: [{
                    id: Date.now().toString(),
                    text: review
                }]
            })
        }
    }

    renderReviews() {
        const formEl = document.getElementById('reviewsContainer');
        formEl.innerHTML = '';
        this.#reviews.forEach(item => {
            const divEl = document.createElement('div');
            const productName = document.createElement('p');
            productName.textContent = item.product;
            divEl.appendChild(productName);
            divEl.classList.add('review-product');

            item.reviews.forEach(review => {
                const reviewDivEl = document.createElement('div');
                const reviewsEl = document.createElement('p');
                reviewsEl.textContent = review.text;
                reviewDivEl.appendChild(reviewsEl);
                divEl.appendChild(reviewDivEl);
                reviewDivEl.classList.add('review');
                reviewsEl.classList.add('review-text');
            });

            formEl.appendChild(divEl);
        });
    }
};

const reviewManager = new ReviewManager(initialData);
reviewManager.renderReviews();

document.addEventListener('DOMContentLoaded', function (e) {
    const formEl = document.getElementById('reviewForm');
    const inputTitleEl = document.getElementById('productName');
    const inputTextEl = document.getElementById('reviewText');
    const errorEl = document.getElementById('reviewError');
    
    formEl.addEventListener('submit', function (e) {
        e.preventDefault();
    
        try {
            const productName = inputTitleEl.value;
            const textValue = inputTextEl.value;
    
            reviewManager.addReview(productName, textValue);
            reviewManager.renderReviews();
    
            inputTitleEl.value = '';
            inputTextEl.value = '';
            errorEl.style.display = 'none';
        } catch (error) {
            errorEl.textContent = error.message;
            errorEl.style.display = 'block';
            console.error(`Ошибка: ${error.message}`);
        }
    });
});
