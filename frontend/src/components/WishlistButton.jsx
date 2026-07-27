import {
  addToWishlist,
  removeFromWishlist,
} from "../services/wishlistService";

function WishlistButton({
  bookId,
  isWishlisted,
  onWishlistChange,
}) {
  const handleWishlist = async () => {
    try {
      if (isWishlisted) {
        const data = await removeFromWishlist(bookId);

        alert(data.message);
        onWishlistChange(false);
      } else {
        const data = await addToWishlist(bookId);

        alert(data.message);
        onWishlistChange(true);
      }
    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Wishlist update failed"
      );
    }
  };

  return (
    <button onClick={handleWishlist}>
      {isWishlisted
        ? "Remove from Wishlist"
        : "Add to Wishlist"}
    </button>
  );
}

export default WishlistButton;
