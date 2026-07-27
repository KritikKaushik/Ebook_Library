import API from "./api";

export const getWishlist = async () => {
  const { data } = await API.get("/auth/wishlist");

  return data;
};

export const addToWishlist = async (bookId) => {
  const { data } = await API.post(
    `/auth/wishlist/${bookId}`
  );

  return data;
};

export const removeFromWishlist = async (bookId) => {
  const { data } = await API.delete(
    `/auth/wishlist/${bookId}`
  );

  return data;
};
