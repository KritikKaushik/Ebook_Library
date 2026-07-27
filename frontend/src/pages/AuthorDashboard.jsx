import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import {
  getMyBooks,
  createBook,
  updateBook,
  deleteBook,
} from "../services/bookService";
import { getProfile } from "../services/authService";

function AuthorDashboard() {
  const [user, setUser] = useState(null);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingBookId, setEditingBookId] = useState(null);

  const [bookForm, setBookForm] = useState({
    title: "",
    genre: "",
    content: "",
    cover: null,
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const profile = await getProfile();
      setUser(profile);

      if (["author", "admin"].includes(profile.role)) {
        setBooks(await getMyBooks());
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setBookForm({
      ...bookForm,
      [e.target.name]:
        e.target.type === "file"
          ? e.target.files[0]
          : e.target.value,
    });
  };

  const resetForm = () => {
    setEditingBookId(null);
    setBookForm({
      title: "",
      genre: "",
      content: "",
      cover: null,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingBookId) {
        const updated = await updateBook(editingBookId, bookForm);
        setBooks(books.map((b) => (b._id === editingBookId ? updated : b)));
        alert("Book updated successfully");
      } else {
        const created = await createBook(bookForm);
        setBooks([created, ...books]);
        alert("Book uploaded successfully");
      }

      resetForm();
    } catch (err) {
      alert(err.response?.data?.message || "Operation failed");
    }
  };

  const startEditing = (book) => {
    setEditingBookId(book._id);
    setBookForm({
      title: book.title,
      genre: book.genre,
      content: book.content,
      cover: null,
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this book?")) return;

    try {
      await deleteBook(id);
      setBooks(books.filter((b) => b._id !== id));
      alert("Book deleted successfully");
    } catch (err) {
      alert(err.response?.data?.message || "Delete failed");
    }
  };

  if (loading) return <div className="container"><h2>Loading...</h2></div>;

  if (!user || !["author", "admin"].includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="container">
      <div className="card" style={{ marginBottom: 30 }}>
        <h1>{editingBookId ? "✏️ Edit Book" : "✍️ Author Dashboard"}</h1>
        <p style={{ color: "#64748b", marginTop: 8 }}>
          Welcome back, <strong>{user.name}</strong>. Publish and manage your books from one place.
        </p>
      </div>

      <div className="card" style={{ marginBottom: 35 }}>
        <h2 style={{ marginBottom: 20 }}>
          {editingBookId ? "Update Book" : "Upload New Book"}
        </h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Book title"
            value={bookForm.title}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="genre"
            placeholder="Genre"
            value={bookForm.genre}
            onChange={handleChange}
            required
          />

          <textarea
            rows="8"
            name="content"
            placeholder="Book description or content..."
            value={bookForm.content}
            onChange={handleChange}
            required
          />

          <input
            type="file"
            name="cover"
            onChange={handleChange}
          />

          <div className="button-group">
            <button type="submit">
              {editingBookId ? "Save Changes" : "Upload Book"}
            </button>

            {editingBookId && (
              <button type="button" onClick={resetForm}>
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <h2>📚 My Books</h2>
        <span>{books.length} Book{books.length !== 1 && "s"}</span>
      </div>

      {books.length === 0 ? (
        <div className="card" style={{ textAlign: "center" }}>
          <h3>No books uploaded yet.</h3>
          <p style={{ color: "#64748b" }}>
            Your published books will appear here.
          </p>
        </div>
      ) : (
        <div className="book-catalog">
          {books.map((book) => (
            <div key={book._id} className="book-item">
              {book.cover && (
                <img
                  src={`https://ebook-library-d3kg.onrender.com${book.cover}`}
                  alt={book.title}
                />
              )}

              <h3>{book.title}</h3>
              <p>{book.genre}</p>
              <p><strong>{book.author?.name}</strong></p>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                  marginTop: 10,
                }}
              >
                <Link to={`/book/${book._id}`}>View Details</Link>

                <button onClick={() => startEditing(book)}>
                  Edit
                </button>

                <button
                  style={{ background: "#dc2626" }}
                  onClick={() => handleDelete(book._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AuthorDashboard;
