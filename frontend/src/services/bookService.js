import API from "./api";

export const getBooks = async (filters = {}) => {
  const { data } = await API.get("/books", {
    params: filters,
  });

  return data;
};

export const getFeaturedBooks = async () => {
  const { data } = await API.get("/books/featured");
  return data;
};

export const getBookById = async (id) => {
  const { data } = await API.get(`/books/${id}`);
  return data;
};

export const getMyBooks = async () => {
  const { data } = await API.get("/books/my-books");
  return data;
};

export const createBook = async (bookData) => {
  const formData = new FormData();

  formData.append("title", bookData.title);
  formData.append("genre", bookData.genre);
  formData.append("content", bookData.content);

  if (bookData.cover) {
    formData.append("cover", bookData.cover);
  }

  const { data } = await API.post(
    "/books",
    formData,
    {
      headers: {
        "Content-Type":
          "multipart/form-data",
      },
    }
  );

  return data;
};

export const updateBook = async (id, bookData) => {
  const formData = new FormData();

  formData.append("title", bookData.title);
  formData.append("genre", bookData.genre);
  formData.append("content", bookData.content);

  if (bookData.cover) {
    formData.append("cover", bookData.cover);
  }

  const { data } = await API.put(
    `/books/${id}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return data;
};

export const deleteBook = async (id) => {
  const { data } = await API.delete(`/books/${id}`);
  return data;
};
