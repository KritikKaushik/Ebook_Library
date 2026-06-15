import { borrowBook } from "../services/borrowService";

function BorrowButton({ bookId }) {
  const handleBorrow = async () => {
    try {
      await borrowBook(bookId);

      alert("Book borrowed successfully");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Borrow failed"
      );
    }
  };

  return (
    <button onClick={handleBorrow}>
      Borrow Book
    </button>
  );
}

export default BorrowButton;