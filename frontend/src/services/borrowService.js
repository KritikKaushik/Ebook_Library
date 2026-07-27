import API from "./api";

export const borrowBook = async (bookId) => {
  const { data } = await API.post(
    `/borrow/borrow/${bookId}`
  );

  return data;
};

export const returnBook = async (bookId) => {
  const { data } = await API.put(
    `/borrow/return/${bookId}`
  );

  return data;
};

export const getBorrowedBooks = async () => {
  const { data } = await API.get(
    "/borrow/borrowed"
  );

  return data;
};

export const getAllBorrows = async () => {
  const { data } = await API.get(
    "/borrow/all"
  );

  return data;
};