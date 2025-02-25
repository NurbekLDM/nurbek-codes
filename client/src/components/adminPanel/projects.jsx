import React , {useState} from "react";
import {getProjects, addProject, updateProject, deleteProject} from "../../actions/projects.action";
import {useEffect} from "react";

export default function Projects() {
    const [projects, setProjects] = useState([]);
    const [isAddProjectOpen, setIsAddProjectOpen] = useState(false);

    useEffect(() => {
        const fetchProjects = async () => {
            const projects = await getProjects();
            setProjects(projects.data.data);
        }
        fetchProjects();
    }, []);

    const handleAddProject = async (e) => {
        e.preventDefault();
        const name = e.target[0].value;
        const link = e.target[1].value;
        try {
        const project = await addProject({name, link});
        setProjects([...projects, project.data.data]);
        if(project.message == "Project added successfully"){
            window.location.reload();
        }

        } catch (error) {
            console.log(error);
        }
    }

    const handleDeleteProject = async (id) => {
        try {
            await deleteProject(id);
            const newProjects = projects.filter(project => project._id !== id);
            setProjects(newProjects);
        } catch (error) {
            console.log(error);
        }
    }

    const handleOpenAddProject = () => {
        setIsAddProjectOpen(prev => !prev);
    }

    return (
        <div>

<section className="bg-gray-50 w-fit overflow-y-auto h-screen rounded-xl dark:bg-gray-900 p-3 sm:p-5">
    <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
       <button onClick={handleOpenAddProject} className="bg-blue-600  p-2 text-white rounded-xl">Add project</button>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-4 py-3">Project Name</th>
                            <th scope="col" className="px-4 py-3">Link</th>
                            <th scope="col" className="px-4 py-3">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    {projects?.length > 0 ? (
    projects.map((project, index) => (
        <tr key={index} className="border-b dark:border-gray-700">
            <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {project.name}
            </td>
            <td className="px-4 py-3">
                <a target="_blank" href={`https://${project.link}`}>View</a>
                </td>
            <td className="px-4 py-3 flex items-center space-x-2"> 
                <button>Edit</button>    
                <button onClick={() => handleDeleteProject(project.id)} >Delete</button>
            </td>
        </tr>
    ))
) : (
    <tr><td colSpan="3">Loading...</td></tr>
)}

                    </tbody>
                </table>
            </div>     
   </div>
    </section>

    <div className={`${isAddProjectOpen? '': 'hidden'} absolute  sm:top-20 sm:bottom-44 bottom-32 left-12 w-fit overflow-y-auto h-screen rounded-xl dark:bg-gray-900 p-3 sm:p-5`}>
    
      <div id="defaultModal" tabindex="-1" aria-hidden="true" class=" overflow-y-auto overflow-x-hidden relative top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-modal md:h-full">
    <div class="relative p-4 w-full max-w-2xl h-full md:h-auto">
        
        <div class="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
        
            <div class="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                    Add Project
                </h3>
                <button onClick={handleOpenAddProject} type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="defaultModal">
                    <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    <span class="sr-only">Close modal</span>
                </button>
            </div>

            <form onSubmit={handleAddProject}>
                <div class="grid gap-4 mb-4 sm:grid-cols-2">
                    <div>
                        <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                        <input type="text" name="name" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Project name" required />
                    </div>
                    <div>
                        <label for="link" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Link</label>
                        <input type="text" name="link" id="link" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Project link" required />
                    </div>

                        <div>
                        <label for="link" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Technologies</label>
                        <input type="text" name="technologies" id="link" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Project technologies" required />
                    </div>
 
                  
                  
                </div>
                <button type="submit" class="text-white inline-flex items-center bg-blue-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                    <svg class="mr-1 -ml-1 w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
                    Add new project
                </button>
            </form>
        </div>
    </div>
</div>

    </div>

        </div>
    )
}