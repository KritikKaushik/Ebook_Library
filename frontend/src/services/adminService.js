import API from "./api";

export const getAdminBooks = async () => {
  const { data } = await API.get(
    "/admin/books"
  );

  return data;
};

export const getAdminReviews = async () => {
  const { data } = await API.get(
    "/admin/reviews"
  );

  return data;
};

export const deleteBook = async (id) => {
  const { data } = await API.delete(
    `/admin/book/${id}`
  );

  return data;
};

export const deleteReview = async (id) => {
  const { data } = await API.delete(
    `/admin/review/${id}`
  );

  return data;
};

export const getUsers = async () => {
  const { data } = await API.get(
    "/admin/users"
  );

  return data;
};