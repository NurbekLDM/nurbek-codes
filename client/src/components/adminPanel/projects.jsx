import React, { useState, useEffect } from "react";
import { getProjects, addProject, updateProject, deleteProject } from "@/actions/projects.action";

export default function Projects() {
    const [projects, setProjects] = useState([]);
    const [isAddProjectOpen, setIsAddProjectOpen] = useState(false);
    const [isEditProjectOpen, setIsEditProjectOpen] = useState(false);
    const [editProjectData, setEditProjectData] = useState({ id: "", name: "", link: "", technologies: "", description: "", github: "" });
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const projects = await getProjects();
                setProjects(projects.data.data);
            } catch (error) {
                console.error("Fetch projects error:", error);
                setError("Proyektlarni yuklashda xatolik yuz berdi");
            }
        };
        fetchProjects();
    }, []);

    const handleAddProject = async (e) => {
        e.preventDefault();
        const name = e.target[0].value;
        const link = e.target[1].value;
        const technologies = e.target[2].value;
        const description = e.target[3].value;
        const github = e.target[4].value;

        try {
            const project = await addProject({ name, link, technologies, description, github });
            setProjects([...projects, project.data.data]);
            setIsAddProjectOpen(false);
        } catch (error) {
            console.error("Add project error:", error);
            setError("Proyektni qo'shishda xatolik yuz berdi");
        }
    };

    const handleUpdateProject = async (e) => {
        e.preventDefault();
        
        try {
            // Bu yerda editProjectData.id ni ishlatamiz
            console.log("Updating project with ID:", editProjectData.id);
            
            const updatedProject = await updateProject(editProjectData.id, {
                name: editProjectData.name,
                link: editProjectData.link,
                technologies: editProjectData.technologies,
                description: editProjectData.description,
                github: editProjectData.github
            });
    
            console.log("API response:", updatedProject);
            
            // O'zgartirilgan proyekt bilan yangilaymiz
            setProjects(projects.map(proj => proj._id === editProjectData.id ? updatedProject.data.data : proj));
            setIsEditProjectOpen(false);
            setError(null);
        } catch (error) {
            console.error("Update project error:", error);
            console.error("Error response:", error.response?.data);
            setError(`Proyektni yangilashda xatolik: ${error.message || "Noma'lum xato"}`);
        }
    };

    const handleDeleteProject = async (id) => {
        try {
            await deleteProject(id);
            setProjects(projects.filter(project => project._id !== id));
            setError(null);
        } catch (error) {
            console.error("Delete project error:", error);
            setError("Proyektni o'chirishda xatolik yuz berdi");
        }
    };

    const openEditModal = (project) => {
        console.log("Opening edit modal for project:", project);
        

        setEditProjectData({
            id: project.id,
            name: project.name,
            link: project.link,
            technologies: project.technologies || "",
            description: project.description || "",
            github: project.github || "https://github.com/NurbekLDM"
        });
        
        console.log("Edit project data set to:", {
            id: project._id,
            name: project.name,
            link: project.link,
            technologies: project.technologies || "",
            description: project.description || "",
            github: project.github || "https://github.com/NurbekLDM"
        });
        
        setIsEditProjectOpen(true);
    };

    return (
        <div>
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                    <span className="block sm:inline">{error}</span>
                </div>
            )}
            
            <section className="bg-gray-50 w-fit overflow-y-auto h-screen rounded-xl dark:bg-gray-900 p-3 sm:p-5">
                <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
                    <button onClick={() => setIsAddProjectOpen(true)} className="bg-blue-600 p-2 text-white rounded-xl">Add project</button>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th className="px-4 py-3">Project Name</th>
                                    <th className="px-4 py-3">Link</th>
                                    <th className="px-4 py-3">Technologies</th>
                                    <th className="px-4 py-3">GitHub</th>
                                    <th className="px-4 py-3">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {projects.length > 0 ? (
                                    projects.map((project, index) => (
                                        <tr key={index} className="border-b dark:border-gray-700">
                                            <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                {project.name}
                                            </td>
                                            <td className="px-4 py-3">
                                                <a target="_blank" href={`https://${project.link}`} rel="noopener noreferrer">View</a>
                                            </td>
                                            <td className="px-4 py-3">{project.technologies}</td>
                                          
                                            <td className="px-4 py-3">
                                                <a target="_blank" href={project.github} rel="noopener noreferrer">GitHub</a>
                                            </td>
                                            <td className="px-4 py-3 flex items-center space-x-2">
                                                <button onClick={() => openEditModal(project)} className="text-blue-500">Edit</button>
                                                <button onClick={() => handleDeleteProject(project.id)} className="text-red-500">Delete</button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr><td colSpan="6" className="text-center py-4">Loading...</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* Add Project Modal */}
            {isAddProjectOpen && (
                <div className="absolute sm:top-20 left-12 w-fit overflow-y-auto h-screen rounded-xl dark:bg-gray-900 p-3 sm:p-5">
                    <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Add Project</h3>
                        <form onSubmit={handleAddProject}>
                            <input type="text" placeholder="Project Name" required className="border p-2 w-full mb-2" />
                            <input type="text" placeholder="Project Link" required className="border p-2 w-full mb-2" />
                            <input type="text" placeholder="Technologies" required className="border p-2 w-full mb-2" />
                            <input type="text" placeholder="Description" required className="border p-2 w-full mb-2" />
                            <input type="text" placeholder="Github Link" required className="border p-2 w-full mb-2" />
                            <button type="submit" className="bg-blue-700 text-white p-2 rounded-lg w-full">Add</button>
                        </form>
                        <button onClick={() => setIsAddProjectOpen(false)} className="mt-2 text-red-500">Close</button>
                    </div>
                </div>
            )}

            {/* Edit Project Modal */}
            {isEditProjectOpen && (
                <div className="absolute sm:top-20 left-12 w-fit overflow-y-auto h-screen rounded-xl dark:bg-gray-900 p-3 sm:p-5">
                    <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Edit Project</h3>
                        <form onSubmit={handleUpdateProject}>
                            <input 
                                type="text" 
                                placeholder="Project Name" 
                                value={editProjectData.name} 
                                onChange={(e) => setEditProjectData({...editProjectData, name: e.target.value})} 
                                required 
                                className="border p-2 w-full mb-2" 
                            />
                            <input 
                                type="text" 
                                placeholder="Project Link" 
                                value={editProjectData.link} 
                                onChange={(e) => setEditProjectData({...editProjectData, link: e.target.value})} 
                                required 
                                className="border p-2 w-full mb-2" 
                            />
                            <input 
                                type="text" 
                                placeholder="Technologies" 
                                value={editProjectData.technologies} 
                                onChange={(e) => setEditProjectData({...editProjectData, technologies: e.target.value})} 
                                required 
                                className="border p-2 w-full mb-2" 
                            />
                            <input 
                                type="text" 
                                placeholder="Description" 
                                value={editProjectData.description} 
                                onChange={(e) => setEditProjectData({...editProjectData, description: e.target.value})} 
                                required 
                                className="border p-2 w-full mb-2" 
                            />
                            <input 
                                type="text" 
                                placeholder="Github Link" 
                                value={editProjectData.github} 
                                onChange={(e) => setEditProjectData({...editProjectData, github: e.target.value})} 
                                required 
                                className="border p-2 w-full mb-2" 
                            />
                            <button type="submit" className="bg-blue-700 text-white p-2 rounded-lg w-full">Update</button>
                        </form>
                        <button onClick={() => setIsEditProjectOpen(false)} className="mt-2 text-red-500">Close</button>
                    </div>
                </div>
            )}
        </div>
    );
}