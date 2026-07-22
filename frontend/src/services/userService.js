import api from "./api";

// Get User Profile
export const getUserProfile = async () => {
  const response = await api.get("/user/profile");
  return response.data;
};

// Update User Profile
export const updateUserProfile = async (data) => {
  const response = await api.put("/user/profile", data);
  return response.data;
};

// Delete User Account
export const deleteUserAccount = async () => {
  const response = await api.delete("/user/account");
  return response.data;
};
