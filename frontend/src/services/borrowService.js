import API from "./api";

export const borrowBook = async (bookId) => {
  const { data } = await API.post(
    `/borrow/${bookId}`
  );

  return data;
};

export const returnBook = async (bookId) => {
  const { data } = await API.put(
    `/return/${bookId}`
  );

  return data;
};

export const getBorrowedBooks = async () => {
  const { data } = await API.get(
    "/borrowed"
  );

  return data;
};