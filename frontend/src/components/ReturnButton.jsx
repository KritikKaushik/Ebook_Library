import { returnBook } from "../services/borrowService";

function ReturnButton({ bookId }) {
  const handleReturn = async () => {
    try {
      await returnBook(bookId);

      alert("Book returned successfully");
    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Return failed"
      );
    }
  };

  return (
    <button onClick={handleReturn}>
      Return Book
    </button>
  );
}

export default ReturnButton;