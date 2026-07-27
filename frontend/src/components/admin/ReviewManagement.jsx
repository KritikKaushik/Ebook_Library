import { useMemo, useState } from "react";
import { deleteReview } from "../../services/adminService";

function ReviewManagement({
  reviews = [],
  setReviews,
  stats,
  setStats,
}) {
  const [search, setSearch] = useState("");

  const filteredReviews = useMemo(() => {
    const q = search.toLowerCase();

    return reviews.filter(
      (review) =>
        review.book?.title?.toLowerCase().includes(q) ||
        review.user?.name?.toLowerCase().includes(q) ||
        review.review?.toLowerCase().includes(q)
    );
  }, [reviews, search]);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this review?")) return;

    try {
      await deleteReview(id);

      setReviews((prev) =>
        prev.filter((review) => review._id !== id)
      );

      setStats((prev) => ({
        ...prev,
        reviews: Math.max(prev.reviews - 1, 0),
      }));
    } catch (err) {
      console.error(err);
      alert("Failed to delete review.");
    }
  };

  return (
    <div className="admin-section">
      <div className="card">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 15,
            marginBottom: 20,
          }}
        >
          <h2>⭐ Review Management</h2>

          <input
            className="admin-search"
            type="text"
            placeholder="Search by book, user or review..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ maxWidth: 350 }}
          />
        </div>

        {filteredReviews.length > 0 ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit,minmax(280px,1fr))",
              gap: 20,
            }}
          >
            {filteredReviews.map((review) => (
              <div
                key={review._id}
                className="book-item"
              >
                {review.book ? (
                  <>
                    {review.book.cover && (
                      <img
                        src={`https://ebook-library-d3kg.onrender.com${review.book.cover}`}
                        alt={review.book.title}
                      />
                    )}

                    <h3>{review.book.title}</h3>

                    <p>{review.book.genre}</p>
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
                  </>
                )}

                <hr style={{ margin: "15px 0" }} />

                <p>
                  <strong>User:</strong>{" "}
                  {review.user?.name || "Unknown"}
                </p>

                <p>
                  <strong>Email:</strong>{" "}
                  {review.user?.email || "-"}
                </p>

                <p>
                  <strong>Rating:</strong>{" "}
                  {"⭐".repeat(review.rating || 0)}
                </p>

                <div
                  style={{
                    marginTop: 10,
                    padding: 12,
                    background: "#f9fafb",
                    borderRadius: 10,
                    minHeight: 90,
                    lineHeight: 1.6,
                  }}
                >
                  {review.review}
                </div>

                <button
                  style={{
                    width: "100%",
                    marginTop: 20,
                    background: "#dc2626",
                  }}
                  onClick={() =>
                    handleDelete(review._id)
                  }
                >
                  🗑 Delete Review
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div
            style={{
              textAlign: "center",
              padding: "40px",
              color: "#6b7280",
            }}
          >
            No reviews found.
          </div>
        )}
      </div>
    </div>
  );
}

export default ReviewManagement;
