import API from "./api";

export const register = async (userData) => {
  const { data } = await API.post(
    "/auth/register",
    userData
  );

  return data;
};

export const registerAuthor = async (userData) => {
  const { data } = await API.post(
    "/auth/register-author",
    userData
  );

  return data;
};

export const registerAdmin = async (userData) => {
  const { data } = await API.post(
    "/auth/register-admin",
    userData
  );

  return data;
};

export const login = async (userData) => {
  const { data } = await API.post(
    "/auth/login",
    userData
  );

  return data;
};

export const getProfile = async () => {
  const { data } = await API.get("/auth/profile");

  return data;
};