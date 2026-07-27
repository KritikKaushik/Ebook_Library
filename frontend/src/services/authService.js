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

export const updateProfile = async (profileData) => {
  const { data } = await API.put(
    "/auth/profile",
    profileData
  );

  return data;
};

export const setRecoveryPasskey = async (recoveryPasskey) => {
  const { data } = await API.put(
    "/auth/recovery-passkey",
    { recoveryPasskey }
  );

  return data;
};

export const verifyRecoveryPasskey = async (recoveryData) => {
  const { data } = await API.post(
    "/auth/recover/verify",
    recoveryData
  );

  return data;
};

export const resetPassword = async (recoveryData) => {
  const { data } = await API.put(
    "/auth/recover/reset",
    recoveryData
  );

  return data;
};
