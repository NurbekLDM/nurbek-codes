import axios from 'axios';
import Cookies from 'js-cookie';

const API_URL = "http://localhost:5000/api/projects";

const token = Cookies.get("accessToken");
export const getProjects = async() => {
     try {
        const response = await axios.get(`${API_URL}/all`);
        console.log("Projects Response:", response.data);
        return response;
     } catch (error) {
        console.error("Projects Error:", error);
        throw error;
     }
}
export const addProject = async(ProjectData) => {
    try {
        const response = await axios.post(`${API_URL}/add`, ProjectData,
        );
        console.log("Add Project Response:", response.data);
        if(response.data.message == "Project added successfully"){
            window.location.reload();
        }
        return response.data;
    } catch (error) {
        console.error("Add Project Error:", error);
        throw error;
    }
}
export const updateProject = async(id, name, link) => {
    try {
        const response = await axios.put(`${API_URL}/update/${id}`, ProjectData);
        console.log("Update Project Response:", response.data);
        return response.data;
        if(response.data.message == "Project updated successfully"){
            window.location.reload();
        }
    } catch (error) {
        console.error("Update Project Error:", error);
        throw error;
    }
}
export const deleteProject = async(id) => {
    try {
        const response = await axios.delete(`${API_URL}/delete/${id}`);
        console.log("Delete Project Response:", response.data);
        if(response.data.message == "Project deleted successfully"){
            window.location.reload();
        }
    } catch (error) {
        console.log("Delete Project Error:", error);
        throw error;
    }
}