import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getBooks, getFeaturedBooks } from "../services/bookService";

function Home() {
  const [books, setBooks] = useState([]);
  const [featuredBooks, setFeaturedBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({
    page: 1,
    totalPages: 0,
  });

  useEffect(() => {
    const loadBooks = async () => {
      try {
        const [allBooks, featured] = await Promise.all([
          getBooks({
            search,
            page: currentPage,
            limit: 6,
          }),
          getFeaturedBooks(),
        ]);

        setBooks(allBooks.books);
        setFeaturedBooks(featured);

        setPagination({
          page: allBooks.page,
          totalPages: allBooks.totalPages,
        });
      } catch (error) {
        console.error(error);
      }
    };

    loadBooks();
  }, [currentPage, search]);

  return (
    <div className="container">

      <div className="card" style={{ marginBottom: "35px" }}>
        <h1 style={{ marginBottom: "10px" }}>
          📚 Welcome to the E-Book Library
        </h1>

        <p style={{ color: "#6b7280", marginBottom: "25px" }}>
          Discover, borrow and enjoy books from different authors.
        </p>

        <input
          type="text"
          placeholder="🔍 Search by title or genre..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "18px",
        }}
      >
        <h2>⭐ Featured Books</h2>
        <Link to="/search">View All</Link>
      </div>

      <div className="book-catalog">
        {featuredBooks.length > 0 ? (
          featuredBooks.map((book) => (
            <div key={book._id} className="book-item">
              {book.cover && (
                <img
                  src={`http://localhost:8000${book.cover}`}
                  alt={book.title}
                />
              )}

              <h3>{book.title}</h3>
              <p>{book.genre}</p>

              <Link to={`/book/${book._id}`}>
                View Book
              </Link>
            </div>
          ))
        ) : (
          <p>No featured books found.</p>
        )}
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          margin: "40px 0 18px",
        }}
      >
        <h2>📖 All Books</h2>
        <span>{books.length} books</span>
      </div>

      <div className="book-catalog">
        {books.length > 0 ? (
          books.map((book) => (
            <div key={book._id} className="book-item">
              {book.cover && (
                <img
                  src={`http://localhost:8000${book.cover}`}
                  alt={book.title}
                />
              )}

              <h3>{book.title}</h3>

              <p>{book.genre}</p>

              <p>
                <strong>Author:</strong>{" "}
                {book.author?.name || "Unknown"}
              </p>

              <Link to={`/book/${book._id}`}>
                View Details
              </Link>
            </div>
          ))
        ) : (
          <p>No books found.</p>
        )}
      </div>

      {pagination.totalPages > 1 && (
        <div
          className="button-group"
          style={{
            justifyContent: "center",
            marginTop: "35px",
          }}
        >
          <button
            onClick={() => setCurrentPage((p) => p - 1)}
            disabled={currentPage === 1}
          >
            ← Previous
          </button>

          <span
            style={{
              alignSelf: "center",
              fontWeight: "600",
            }}
          >
            Page {pagination.page} of {pagination.totalPages}
          </span>

          <button
            onClick={() => setCurrentPage((p) => p + 1)}
            disabled={currentPage === pagination.totalPages}
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
}

export default Home;