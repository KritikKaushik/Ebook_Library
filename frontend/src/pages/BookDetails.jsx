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
    return <div className="container">Loading...</div>;
  }

  return (
    <div className="container">
      <div
        className="card"
        style={{
          display: "grid",
          gridTemplateColumns: "280px 1fr",
          gap: 30,
          marginBottom: 30,
        }}
      >
        <div>
          {book.cover && (
            <img
              src={`http://localhost:8000${book.cover}`}
              alt={book.title}
              style={{
                width: "100%",
                height: 380,
                objectFit: "cover",
                borderRadius: 12,
              }}
            />
          )}
        </div>

        <div>
          <h1>{book.title}</h1>

          <p style={{ margin: "12px 0" }}>
            <strong>Genre:</strong> {book.genre}
          </p>

          <p style={{ marginBottom: 20 }}>
            <strong>Author:</strong> {book.author?.name}
          </p>

          <p
            style={{
              lineHeight: 1.7,
              marginBottom: 25,
              whiteSpace: "pre-wrap",
            }}
          >
            {book.content}
          </p>

          {user && (
            <div className="button-group">
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

      {user && (
        <div className="card" style={{ marginBottom: 30 }}>
          <h2 style={{ marginBottom: 20 }}>Write a Review</h2>

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
              {[5,4,3,2,1].map((r)=>(
                <option key={r} value={r}>
                  {r} Star{r>1?"s":""}
                </option>
              ))}
            </select>

            <button type="submit">
              Submit Review
            </button>
          </form>
        </div>
      )}

      <div className="card">
        <h2 style={{ marginBottom: 20 }}>
          Reviews ({reviews.length})
        </h2>

        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div
              key={review._id}
              style={{
                padding: "18px 0",
                borderBottom: "1px solid #e5e7eb",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 8,
                }}
              >
                <strong>{review.user?.name}</strong>
                <span>{"⭐".repeat(review.rating)}</span>
              </div>

              <p style={{ lineHeight: 1.6 }}>
                {review.review}
              </p>
            </div>
          ))
        ) : (
          <p>No reviews yet. Be the first to review this book.</p>
        )}
      </div>
    </div>
  );
}

export default BookDetails;