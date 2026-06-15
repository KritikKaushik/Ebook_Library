import API from "./api";

export const getReviews = async (bookId) => {
  const { data } = await API.get(`/reviews/${bookId}`);
  return data;
};

export const addReview = async (reviewData) => {
  const { data } = await API.post(
    "/reviews",
    reviewData
  );

  return data;
};