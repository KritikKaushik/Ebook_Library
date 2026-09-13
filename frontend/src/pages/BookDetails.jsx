import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BorrowButton from "../components/BorrowButton";
import WishlistButton from "../components/WishlistButton";

import { getBookById } from "../services/bookService";
import { getReviews, addReview } from "../services/reviewService";
import { getWishlist } from "../services/wishlistService";

function BookDetails() {
  const { id } = useParams();

  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const [reviewData, setReviewData] = useState({
    review: "",
    rating: "5",
  });

  const user = JSON.parse(localStorage.getItem("user"));

  // Backend URL from environment variable
  const API_URL = "https://ebook-library-d3kg.onrender.com";

  useEffect(() => {
    const loadBook = async () => {
      try {
        const bookData = await getBookById(id);
        const reviewList = await getReviews(id);

        setBook(bookData);
        setReviews(reviewList);

        if (user) {
          const wishlist = await getWishlist();

          setIsWishlisted(
            wishlist.some((item) => item._id === id)
          );
        }
      } catch (err) {
        console.error(err);
      }
    };

    loadBook();
  }, [id]);

  const handleChange = (e) => {
    setReviewData({
      ...reviewData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();

    try {
      await addReview({
        bookId: id,
        review: reviewData.review,
        rating: Number(reviewData.rating),
      });

      const updated = await getReviews(id);
      setReviews(updated);

      setReviewData({
        review: "",
        rating: "5",
      });
    } catch (err) {
      console.error(err);
    }
  };

  if (!book) {
    return (
      <div className="container">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="container">

      {/* Book Details */}
      <div className="card book-details-card">

        {/* Book Cover */}
        <div className="book-details-cover">
          {book.cover && (
            <img
              src={`${API_URL}${book.cover}`}
              alt={book.title}
            />
          )}
        </div>

        {/* Book Information */}
        <div className="book-details-info">

          <h1>{book.title}</h1>

          <div className="book-meta">
            <p>
              <strong>Genre:</strong>{" "}
              {book.genre}
            </p>

            <p>
              <strong>Author:</strong>{" "}
              {book.author?.name || "Unknown"}
            </p>
          </div>

          <div className="book-description">
            <h3>About this book</h3>

            <p>
              {book.content}
            </p>
          </div>

          {/* Actions */}
          {user && (
            <div className="book-actions">
              <BorrowButton bookId={book._id} />

              <WishlistButton
                bookId={book._id}
                isWishlisted={isWishlisted}
                onWishlistChange={setIsWishlisted}
              />
            </div>
          )}
        </div>
      </div>

      {/* Write Review */}
      {user && (
        <div className="card review-form-card">

          <h2>Write a Review</h2>

          <form onSubmit={handleSubmitReview}>

            <textarea
              name="review"
              placeholder="Share your thoughts about this book..."
              value={reviewData.review}
              onChange={handleChange}
              rows="5"
              required
            />

            <select
              name="rating"
              value={reviewData.rating}
              onChange={handleChange}
            >
              {[5, 4, 3, 2, 1].map((r) => (
                <option key={r} value={r}>
                  {r} Star{r > 1 ? "s" : ""}
                </option>
              ))}
            </select>

            <button type="submit">
              Submit Review
            </button>

          </form>
        </div>
      )}

      {/* Reviews */}
      <div className="card reviews-card">

        <h2>
          Reviews ({reviews.length})
        </h2>

        {reviews.length > 0 ? (

          <div className="reviews-list">

            {reviews.map((review) => (

              <div
                key={review._id}
                className="review-item"
              >

                <div className="review-header">

                  <strong>
                    {review.user?.name || "Anonymous"}
                  </strong>

                  <span className="review-rating">
                    {"⭐".repeat(review.rating)}
                  </span>

                </div>

                <p>
                  {review.review}
                </p>

              </div>

            ))}

          </div>

        ) : (

          <p className="no-reviews">
            No reviews yet. Be the first to review
            this book.
          </p>

        )}

      </div>

    </div>
  );
}

export default BookDetails;
