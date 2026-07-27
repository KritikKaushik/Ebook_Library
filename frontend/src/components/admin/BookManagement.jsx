import { useState } from "react";
import {
  updateBook,
  deleteBook,
} from "../../services/adminService";

function BookManagement({
  books,
  refreshBooks,
  stats,
  setStats,
}) {
  const [search, setSearch] = useState("");

  const [editingBook, setEditingBook] =
    useState(null);

  const [formData, setFormData] =
    useState({
      title: "",
      genre: "",
      content: "",
      featured: false,
      cover: null,
    });

  const handleEdit = (book) => {
    setEditingBook(book);

    setFormData({
      title: book.title,
      genre: book.genre,
      content: book.content,
      featured: book.featured,
      cover: null,
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this book?")) return;

    try {
      await deleteBook(id);

      await refreshBooks();

      setStats((prev) => ({
        ...prev,
        books: prev.books - 1,
      }));
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdate = async () => {
    try {
      const data = new FormData();

      data.append("title", formData.title);
      data.append("genre", formData.genre);
      data.append("content", formData.content);
      data.append("featured", formData.featured);

      if (formData.cover) {
        data.append("cover", formData.cover);
      }

      await updateBook(editingBook._id, data);

      await refreshBooks();

      setEditingBook(null);
    } catch (err) {
      console.error(err);
    }
  };

  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(search.toLowerCase()) ||
      book.genre.toLowerCase().includes(search.toLowerCase()) ||
      book.author?.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="admin-section">
      <div className="card">
        <h2 style={{ marginBottom: 20 }}>📚 Book Management</h2>

        <input
  type="text"
  className="admin-search"
  placeholder="🔍 Search by title, genre or author..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
/>

        <table className="admin-table">
          <thead>
            <tr>
              <th>Cover</th>
              <th>Book</th>
              <th>Author</th>
              <th>Status</th>
              <th style={{ width: 180 }}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredBooks.map((book) => (
              <tr key={book._id}>
                <td>
                  {book.cover && (
                    <img
                      src={`https://ebook-library-d3kg.onrender.com${book.cover}`}
                      alt={book.title}
                      style={{
                        width: 70,
                        height: 100,
                        objectFit: "cover",
                        borderRadius: 10,
                      }}
                    />
                  )}
                </td>

                <td>
                  <strong>{book.title}</strong>
                  <br />
                  <small>{book.genre}</small>
                </td>

                <td>{book.author?.name || "Unknown"}</td>

                <td>
                  {book.featured ? "⭐ Featured" : "Regular"}
                </td>

                <td>
                  <div
                    style={{
                      display: "flex",
                      gap: 10,
                    }}
                  >
                    <button
                      onClick={() => handleEdit(book)}
                    >
                      ✏️ Edit
                    </button>

                    <button
                      style={{
                        background: "#dc2626",
                      }}
                      onClick={() =>
                        handleDelete(book._id)
                      }
                    >
                      🗑 Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
{editingBook && (
          <div className="card" style={{ marginTop: 30 }}>
            <h3 style={{ marginBottom: 20 }}>
              ✏️ Edit Book
            </h3>

            {editingBook.cover && (
              <div style={{ marginBottom: 20 }}>
                <p><strong>Current Cover</strong></p>

                <img
                  src={`https://ebook-library-d3kg.onrender.com${editingBook.cover}`}
                  alt="Cover"
                  style={{
                    width: 140,
                    height: 200,
                    objectFit: "cover",
                    borderRadius: 12,
                    boxShadow: "0 4px 12px rgba(0,0,0,.15)",
                  }}
                />
              </div>
            )}

            <div className="edit-box">
              <input
                type="text"
                placeholder="Book Title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    title: e.target.value,
                  })
                }
              />

              <input
                type="text"
                placeholder="Genre"
                value={formData.genre}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    genre: e.target.value,
                  })
                }
              />

              <textarea
                rows="8"
                placeholder="Book Content"
                value={formData.content}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    content: e.target.value,
                  })
                }
              />

              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  fontWeight: 600,
                }}
              >
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      featured: e.target.checked,
                    })
                  }
                />
                Featured Book
              </label>

              <div>
                <p
                  style={{
                    marginBottom: 8,
                    fontWeight: 600,
                  }}
                >
                  Replace Cover
                </p>

                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      cover: e.target.files[0],
                    })
                  }
                />
              </div>

              <div
                style={{
                  display: "flex",
                  gap: 15,
                  marginTop: 25,
                }}
              >
                <button
                  style={{
                    flex: 1,
                    background: "#2563eb",
                  }}
                  onClick={handleUpdate}
                >
                  💾 Save Changes
                </button>

                <button
                  style={{
                    flex: 1,
                    background: "#6b7280",
                  }}
                  onClick={() =>
                    setEditingBook(null)
                  }
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default BookManagement;
