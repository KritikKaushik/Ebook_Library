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

export const getDashboardStats = async () => {
  const res = await API.get("/admin/dashboard");
  return res.data;
};

export const updateUser = async (id, userData) => {
  const res = await API.put(`/admin/users/${id}`, userData);
  return res.data;
};
export const updateBook = async (id, formData) => {
  const { data } = await API.put(`/admin/books/${id}`, formData);
  return data;
};

export const deleteUser = async (id) => {
  const { data } = await API.delete(`/admin/user/${id}`);
  return data;
};