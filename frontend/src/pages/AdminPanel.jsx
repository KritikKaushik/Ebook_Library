import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import {
  getAdminBooks,
  getAdminReviews,
  deleteBook,
  deleteReview,
  getUsers,
} from "../services/adminService";

function AdminPanel() {
  const [books, setBooks] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const booksData =
        await getAdminBooks();

      const reviewsData =
        await getAdminReviews();

      const usersData =
        await getUsers();

      setBooks(booksData);
      setReviews(reviewsData);
      setUsers(usersData);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteBook = async (
    bookId
  ) => {
    try {
      await deleteBook(bookId);

      setBooks(
        books.filter(
          (book) =>
            book._id !== bookId
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteReview = async (
    reviewId
  ) => {
    try {
      await deleteReview(reviewId);

      setReviews(
        reviews.filter(
          (review) =>
            review._id !== reviewId
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Navbar />

      <div className="container">
        <h2>Admin Panel</h2>

        <h3>Users</h3>

        <ul>
          {users.map((user) => (
            <li key={user._id}>
              {user.name} (
              {user.role})
            </li>
          ))}
        </ul>

        <hr />

        <h3>Books</h3>

        <ul>
          {books.map((book) => (
            <li key={book._id}>
              <h4>{book.title}</h4>

              <p>{book.genre}</p>

              <p>
                Author:{" "}
                {
                  book.author
                    ?.name
                }
              </p>

              <button
                onClick={() =>
                  handleDeleteBook(
                    book._id
                  )
                }
              >
                Delete Book
              </button>
            </li>
          ))}
        </ul>

        <hr />

        <h3>Reviews</h3>

        <ul>
          {reviews.map((review) => (
            <li key={review._id}>
              <p>
                <strong>
                  {
                    review.user
                      ?.name
                  }
                </strong>
              </p>

              <p>
                {
                  review.review
                }
              </p>

              <p>
                Rating:{" "}
                {
                  review.rating
                }
                /5
              </p>

              <button
                onClick={() =>
                  handleDeleteReview(
                    review._id
                  )
                }
              >
                Delete Review
              </button>
            </li>
          ))}
        </ul>
      </div>

      <Footer />
    </>
  );
}

export default AdminPanel;