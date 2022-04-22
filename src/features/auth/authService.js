import axios from "axios";

const authUrl = "https://js1.10up.com/wp-json/jwt-auth/v1/token";
const validateAuthUrl =
  "https://js1.10up.com/wp-json/jwt-auth/v1/token/validate";

export const loginUserService = async (userData) => {
  const response = await axios.post(authUrl, userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

export const validateUser = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(validateAuthUrl, {}, config);

  return response.data;
};
