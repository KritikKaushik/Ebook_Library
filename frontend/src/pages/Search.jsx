import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getBooks } from "../services/bookService";

function Search() {
  const [search, setSearch] = useState("");

  const [allBooks, setAllBooks] = useState([]);

  const [books, setBooks] = useState([]);

  useEffect(() => {
    const loadBooks = async () => {
      try {
        const data = await getBooks();

        setAllBooks(data);
        setBooks(data);
      } catch (error) {
        console.error(error);
      }
    };

    loadBooks();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const filteredBooks = allBooks.filter(
      (book) =>
        book.title
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        book.genre
          .toLowerCase()
          .includes(search.toLowerCase())
    );

    setBooks(filteredBooks);
  };

  return (
    <>
      <Navbar />

      <div className="container">
        <h1>Search Books</h1>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="search"
            value={search}
            placeholder="Search by title or genre"
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

          <button type="submit">
            Search
          </button>
        </form>

        {books.length > 0 ? (
          <>
            <h2>Books Found:</h2>

            <div className="book-list-horizontal">
              {books.map((book) => (
                <div
                  key={book._id}
                  className="book-item"
                >
                  {book.cover && (
                    <img
                      src={`http://localhost:8000${book.cover}`}
                      alt={book.title}
                      width="150"
                    />
                  )}

                  <h3>{book.title}</h3>

                  <p>{book.genre}</p>

                  <p>
                    Author:{" "}
                    {book.author?.name}
                  </p>

                  <Link
                    to={`/book/${book._id}`}
                  >
                    View Book
                  </Link>
                </div>
              ))}
            </div>
          </>
        ) : (
          <p>
            No books found.
          </p>
        )}
      </div>

      <Footer />
    </>
  );
}

export default Search;