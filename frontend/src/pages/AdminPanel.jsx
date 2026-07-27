import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import DashboardCards from "../components/admin/DashboardCards";
import UserManagement from "../components/admin/UserManagement";
import BookManagement from "../components/admin/BookManagement";
import ReviewManagement from "../components/admin/ReviewManagement";

import {
  getDashboardStats,
  getUsers,
  getAdminBooks,
  getAdminReviews,
} from "../services/adminService";

import { getAllBorrows } from "../services/borrowService";

function AdminPanel() {
  const [stats, setStats] = useState({
    users: 0,
    authors: 0,
    admins: 0,
    books: 0,
    activeBorrows: 0,
    reviews: 0,
  });

  const [users, setUsers] = useState([]);
  const [books, setBooks] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [borrowedBooks, setBorrowedBooks] = useState([]);

  const loadBooks = async () => {
    try {
      const data = await getAdminBooks();
      setBooks(data);
    } catch (error) {
      console.error(error);
    }
  };

  const loadBorrows = async () => {
    try {
      const data = await getAllBorrows();
      setBorrowedBooks(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const [
          statsData,
          usersData,
          reviewsData,
        ] = await Promise.all([
          getDashboardStats(),
          getUsers(),
          getAdminReviews(),
        ]);

        setStats(statsData);
        setUsers(usersData);
        setReviews(reviewsData);

        await Promise.all([
          loadBooks(),
          loadBorrows(),
        ]);
      } catch (error) {
        console.error(error);
      }
    };

    loadData();
  }, []);

  return (
    <div className="container page-container">
      <h2>Admin Dashboard</h2>

      <DashboardCards stats={stats} />

      <UserManagement
        users={users}
        setUsers={setUsers}
        stats={stats}
        setStats={setStats}
      />

      <BookManagement
        books={books}
        refreshBooks={loadBooks}
        stats={stats}
        setStats={setStats}
      />

      {/* Borrow Management */}
      <div className="admin-section">
        <div className="card">
          <h2 style={{ marginBottom: 20 }}>
            📖 Borrow Management
          </h2>

          {borrowedBooks.length > 0 ? (
            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit, minmax(260px, 1fr))",
                gap: 20,
              }}
            >
              {borrowedBooks.map((borrow) => (
                <div
                  key={borrow._id}
                  className="book-item"
                >
                  {borrow.book ? (
                    <>
                      {borrow.book.cover && (
                        <img
                          src={`https://ebook-library-d3kg.onrender.com${borrow.book.cover}`}
                          alt={borrow.book.title}
                        />
                      )}

                      <h3>{borrow.book.title}</h3>

                      <p>{borrow.book.genre}</p>

                      <span
                        style={{
                          display: "inline-block",
                          padding: "4px 10px",
                          background: "#dcfce7",
                          color: "#166534",
                          borderRadius: 20,
                          fontSize: 12,
                          fontWeight: 600,
                          marginBottom: 10,
                        }}
                      >
                        Active Borrow
                      </span>
                    </>
                  ) : (
                    <>
                      <div
                        style={{
                          height: 180,
                          borderRadius: 10,
                          background: "#f3f4f6",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#6b7280",
                          fontWeight: 600,
                        }}
                      >
                        Book Deleted
                      </div>

                      <h3
                        style={{
                          color: "#dc2626",
                          marginTop: 15,
                        }}
                      >
                        Deleted Book
                      </h3>

                      <p style={{ color: "#6b7280" }}>
                        This book has been removed from
                        the library.
                      </p>
                    </>
                  )}

                  <hr
                    style={{
                      margin: "15px 0",
                    }}
                  />

                  <p>
                    <strong>Borrowed By:</strong>{" "}
                    {borrow.user?.name}
                  </p>

                  <p>
                    <strong>Email:</strong>{" "}
                    {borrow.user?.email}
                  </p>

                  <p>
                    <strong>Status:</strong>{" "}
                    {borrow.status}
                  </p>

                  <div
                    style={{
                      marginTop: 15,
                    }}
                  >
                    {borrow.book ? (
                      <Link
                        to={`/book/${borrow.book._id}`}
                      >
                        <button
                          style={{
                            width: "100%",
                          }}
                        >
                          View Book
                        </button>
                      </Link>
                    ) : (
                      <button
                        disabled
                        style={{
                          width: "100%",
                          background: "#9ca3af",
                          cursor: "not-allowed",
                        }}
                      >
                        Book Deleted
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No active borrowed books.</p>
          )}
        </div>
      </div>

      <ReviewManagement
        reviews={reviews}
        setReviews={setReviews}
        stats={stats}
        setStats={setStats}
      />
    </div>
  );
}

export default AdminPanel;
