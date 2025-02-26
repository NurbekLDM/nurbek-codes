import axios from "axios";
import Cookies from "js-cookie";

const API_URL = "https://nurbek-codes-9olu.vercel.app/api/blog";
const getAccessToken = () => {
  return Cookies.get("accessToken");
};

const token = getAccessToken();
console.log('token: ',token);
export const getBlogs = async () => {
    try {
        const response = await axios.get(`${API_URL}/blogs`);
        console.log("Blogs Response:", response.data);
        return response;
    } catch (error) {
        console.error("Blogs Error:", error);
        throw error;
    }
};

export const addBlog = async (blogData) => {
    try {
        const formData = new FormData();
        formData.append("name", blogData.name);
        formData.append("description", blogData.description);
        if (blogData.image) {
            formData.append("image", blogData.image); // File qo‘shiladi
        }

        const response = await axios.post(`${API_URL}/create`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });

        console.log("Add Blog Response:", response.data);
        return response.data;
    } catch (error) {
        console.error("Add Blog Error:", error.response?.data || error.message);
        throw error;
    }
};

export const updateBlog = async (id, blogData) => {
    try {
        const formData = new FormData();
        formData.append("name", blogData.name);
        formData.append("description", blogData.description);
        if (blogData.image) {
            formData.append("image", blogData.image); // File qo‘shiladi
        }

        const response = await axios.put(`${API_URL}/update/${id}`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });

        console.log("Update Blog Response:", response.data);
        window.location.reload();
        return response.data;
    } catch (error) {
        console.error("Update Blog Error:", error.response?.data || error.message);
        throw error;
    }
};

export const deleteBlog = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/delete/${id}`);
        console.log("Delete Blog Response:", response.data);
        return response.data; // Backenddan qaytgan javobni qaytaradi
    } catch (error) {
        console.error("Delete Blog Error:", error.response?.data || error.message);
        throw error;
    }
};
