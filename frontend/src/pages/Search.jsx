import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getBooks } from "../services/bookService";

function Search() {
  const [filters, setFilters] = useState({
    search: "",
    genre: "",
    featured: false,
  });

  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({
    page: 1,
    totalPages: 0,
  });

  useEffect(() => {
    loadBooks(1);
  }, []);

  const loadBooks = async (page = 1) => {
    try {
      const data = await getBooks({
        search: filters.search,
        genre: filters.genre,
        featured: filters.featured,
        page,
        limit: 6,
      });

      setBooks(data.books);
      setCurrentPage(data.page);
      setPagination({
        page: data.page,
        totalPages: data.totalPages,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]:
        e.target.type === "checkbox"
          ? e.target.checked
          : e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    loadBooks(1);
  };

  const handleReset = async () => {
    const reset = {
      search: "",
      genre: "",
      featured: false,
    };

    setFilters(reset);

    try {
      const data = await getBooks({
        page: 1,
        limit: 6,
      });

      setBooks(data.books);
      setCurrentPage(1);
      setPagination({
        page: data.page,
        totalPages: data.totalPages,
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container">
      <div className="card">

        <h1 style={{ marginBottom: 10 }}>
          📚 Search Books
        </h1>

        <p
          style={{
            color: "#6b7280",
            marginBottom: 25,
          }}
        >
          Search by title, genre or browse featured books.
        </p>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            name="search"
            placeholder="🔍 Search by title..."
            value={filters.search}
            onChange={handleChange}
          />

          <input
            type="text"
            name="genre"
            placeholder="🏷 Filter by genre..."
            value={filters.genre}
            onChange={handleChange}
          />

          <label className="featured-filter">
            <input
              type="checkbox"
              name="featured"
              checked={filters.featured}
              onChange={handleChange}
            />
            Featured Books Only
          </label>

          <div className="button-group">
            <button type="submit">
              🔍 Search
            </button>

            <button
              type="button"
              onClick={handleReset}
            >
              Reset
            </button>
          </div>

        </form>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          margin: "30px 0 20px",
        }}
      >
        <h2>Books Found</h2>

        <span style={{ color: "#666" }}>
          {books.length} result{books.length !== 1 && "s"}
        </span>
      </div>

      {books.length > 0 ? (
        <div className="book-catalog">
          {books.map((book) => (
            <div
              key={book._id}
              className="book-item"
            >
              {book.cover ? (
                <img
                  src={`http://localhost:8000${book.cover}`}
                  alt={book.title}
                />
              ) : (
                <div
                  style={{
                    height: 150,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "#f3f4f6",
                    borderRadius: 8,
                    marginBottom: 10,
                  }}
                >
                  📘
                </div>
              )}

              <h3>{book.title}</h3>

              <p><strong>Genre:</strong> {book.genre}</p>

              <p>
                <strong>Author:</strong>{" "}
                {book.author?.name || "Unknown"}
              </p>

              <Link to={`/book/${book._id}`}>
                View Details
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <div className="card" style={{ textAlign: "center" }}>
          <h3>No books found</h3>
          <p>Try changing your search or filters.</p>
        </div>
      )}

      {pagination.totalPages > 1 && (
        <div
          className="button-group"
          style={{
            justifyContent: "center",
            marginTop: 35,
          }}
        >
          <button
            onClick={() => loadBooks(currentPage - 1)}
            disabled={currentPage === 1}
          >
            ← Previous
          </button>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              fontWeight: 600,
              padding: "0 20px",
            }}
          >
            Page {pagination.page} of {pagination.totalPages}
          </div>

          <button
            onClick={() => loadBooks(currentPage + 1)}
            disabled={currentPage === pagination.totalPages}
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
}

export default Search;
