import axios from "axios";
import Cookies from "js-cookie";

// API base URL
const API_URL = "https://nurbek-codes-9olu.vercel.app/api/admin";

const saveToken = (token, refreshToken) => {
  Cookies.set("accessToken", token, { expires: 1 / 24 }); // 15 daqiqa
  Cookies.set("refreshToken", refreshToken, { expires: 7 }); // 7 kun
};

const getAccessToken = () => {
  return Cookies.get("accessToken");
};

const getRefreshToken = () => {
  return Cookies.get("refreshToken");
};

const removeTokens = () => {
  Cookies.remove("accessToken");
  Cookies.remove("refreshToken");
};

// Login funksiyasi
// Login funksiyasi
export const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      username,
      password,
    });
    console.log("Login Response:", response.data);
    const { accessToken, refreshToken } = response.data;
    console.log("Received accessToken:", accessToken);
    console.log("Received refreshToken:", refreshToken);
    saveToken(accessToken, refreshToken);
    // Login muvaffaqiyatli bo'lganidan so'ng, dashboardga yo'naltirish
    window.location.href = "/dashboard";
    return response.data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

// Token yangilash funksiyasi
const refreshAccessToken = async () => {
  try {
    const refreshToken = getRefreshToken();
    if (!refreshToken) {
      throw new Error("No refresh token available");
    }
    const response = await axios.post(`${API_URL}/refresh`, { refreshToken });
    const { accessToken } = response.data;
    // Faqat accessToken yangilanganligi uchun refreshToken o'zgartirilmaydi
    saveToken(accessToken, refreshToken);
    return accessToken;
  } catch (error) {
    console.error("Refresh token error:", error);
    removeTokens();
    throw error;
  }
};

// Axios instance yaratamiz va uni token bilan ishlatamiz
const axiosInstance = axios.create({
  baseURL: API_URL,
});

axiosInstance.defaults.withCredentials = true;

axiosInstance.interceptors.request.use(
  async (config) => {
    let token = getAccessToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
      const now = Math.floor(Date.now() / 1000);
      const tokenParts = token.split(".");
      if (tokenParts.length === 3) {
        try {
          const payload = JSON.parse(atob(tokenParts[1]));
          const exp = payload.exp;
          if (exp < now) {
            // Token eskirganda yangilash
            const newToken = await refreshAccessToken();
            config.headers["Authorization"] = `Bearer ${newToken}`;
          }
        } catch (error) {
          console.error("Error parsing JWT:", error);
          // Token noto'g'ri bo'lsa, log out qilish yoki refresh qilishga urinish
          await logout();
          throw new Error("Token is invalid");
        }
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Axios orqali backendga so'rov yuborish uchun funksiya
export const apiRequest = async (method, url, data = null) => {
  try {
    const response = await axiosInstance({
      method: method,
      url: url,
      data: data,
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      removeTokens();
      // Foydalanuvchini login sahifasiga yo'naltirish
      window.location.href = "/login";
    }
    console.error(`API request error (${method} ${url}):`, error);
    throw error;
  }
};

// Logout funksiyasi
export const logout = () => {
  removeTokens();
  // Foydalanuvchini login sahifasiga yo'naltirish
  window.location.href = "/login";
};

export const faceLogin = async () => {
  try {
    const response = await axios.post(
      `${API_URL}/face-login`,
      {}, 
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true, // Cookie yuborish uchun shart
      }
    );
    return response.status;
  } catch (error) {
    console.error("Face login error:", error);
    throw error;
  }
};

