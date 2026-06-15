import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ReturnButton from "../components/ReturnButton";

import { getProfile } from "../services/authService";
import {
  getMyBooks,
  createBook,
} from "../services/bookService";
import { getBorrowedBooks } from "../services/borrowService";

function Profile() {
  const [user, setUser] = useState(null);

  const [borrowedBooks, setBorrowedBooks] =
    useState([]);

  const [uploadedBooks, setUploadedBooks] =
    useState([]);

  const [uploadForm, setUploadForm] =
    useState({
      title: "",
      genre: "",
      cover: null,
      content: "",
    });

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const profile =
          await getProfile();

        setUser(profile);

        const borrowed =
          await getBorrowedBooks();

        setBorrowedBooks(borrowed);

        if (
          profile.role === "author" ||
          profile.role === "admin"
        ) {
          const books =
            await getMyBooks();

          setUploadedBooks(books);
        }
      } catch (error) {
        console.error(error);
      }
    };

    loadProfile();
  }, []);

  const handleChange = (e) => {
    setUploadForm({
      ...uploadForm,
      [e.target.name]:
        e.target.type === "file"
          ? e.target.files[0]
          : e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newBook =
        await createBook(uploadForm);

      setUploadedBooks([
        newBook,
        ...uploadedBooks,
      ]);

      setUploadForm({
        title: "",
        genre: "",
        cover: null,
        content: "",
      });

      alert(
        "Book uploaded successfully"
      );
    } catch (error) {
      alert(
        error.response?.data
          ?.message ||
          "Upload failed"
      );
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  const isAuthor =
    user.role === "author" ||
    user.role === "admin";

  return (
    <>
      <Navbar />

      <div className="container">
        <h2>Welcome, {user.name}</h2>

        <p>Email: {user.email}</p>

        <p>Role: {user.role}</p>

        <h3>Your Borrowed Books</h3>

        {borrowedBooks.length > 0 ? (
          <ul>
            {borrowedBooks.map(
              (borrow) => (
                <li
                  key={borrow._id}
                >
                  <h4>
                    {
                      borrow.book
                        ?.title
                    }
                  </h4>

                  <p>
                    {
                      borrow.book
                        ?.genre
                    }
                  </p>

                  <Link
                    to={`/book/${borrow.book?._id}`}
                  >
                    View Book
                  </Link>

                  <ReturnButton
                    bookId={
                      borrow.book
                        ?._id
                    }
                  />
                </li>
              )
            )}
          </ul>
        ) : (
          <p>
            No borrowed books.
          </p>
        )}

        {isAuthor && (
          <>
            <h3>
              Upload a New Book
            </h3>

            <form
              onSubmit={
                handleSubmit
              }
            >
              <input
                type="text"
                name="title"
                placeholder="Book Title"
                value={
                  uploadForm.title
                }
                onChange={
                  handleChange
                }
                required
              />

              <input
                type="text"
                name="genre"
                placeholder="Genre"
                value={
                  uploadForm.genre
                }
                onChange={
                  handleChange
                }
                required
              />

              <input
                type="file"
                name="cover"
                onChange={
                  handleChange
                }
              />

              <textarea
                name="content"
                placeholder="Book Content"
                value={
                  uploadForm.content
                }
                onChange={
                  handleChange
                }
                required
              />

              <button type="submit">
                Upload Book
              </button>
            </form>

            <h3>
              Your Uploaded Books
            </h3>

            {uploadedBooks.length >
            0 ? (
              <ul>
                {uploadedBooks.map(
                  (book) => (
                    <li
                      key={
                        book._id
                      }
                    >
                      <h4>
                        {
                          book.title
                        }
                      </h4>

                      <p>
                        {
                          book.genre
                        }
                      </p>

                      <Link
                        to={`/book/${book._id}`}
                      >
                        View
                      </Link>
                    </li>
                  )
                )}
              </ul>
            ) : (
              <p>
                No uploaded
                books.
              </p>
            )}
          </>
        )}
      </div>

      <Footer />
    </>
  );
}

export default Profile;