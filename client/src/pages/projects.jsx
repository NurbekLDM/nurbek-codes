import React, { useState, useEffect } from 'react';
import { Github, ExternalLink, Code } from 'lucide-react';
import { getProjects } from '@/actions/projects.action';
import Head from 'next/head';

const ProjectsSection = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        
        const response = await getProjects();
        console.log("Fetched Projects:", response);
        

        if (!response) {
          throw new Error('No response from server');
        }
        
        let projectData = response.data;
        if (Array.isArray(response.data)) {
          projectData = response.data; 
        } else if (response.data && Array.isArray(response.data.data)) {
          projectData = response.data.data; 
        } else {
          throw new Error('Invalid project data format'); 
        }
        

        setProjects(projectData);
        setLoading(false);
      } catch (err) {
        console.error("Error in fetch:", err);
        setError(err.message || 'An error occurred');
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center mt-8 sm:mt-48 items-center min-h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-4 text-red-500">
        <p>Error loading projects: {error}</p>
      </div>
    );
  }


  if (!projects || projects.length === 0) {
    return (
      <div className="text-center p-4 ">
        <p>No projects found.</p>
      </div>
    );
  }

  return (
    <div>
      <Head>
        <title>Projects</title>
        <meta name="description" content="A collection of projects I have worked on." />
        <meta name="keywords" content="projects, portfolio, web development, software development" />
      </Head>
    <div className='container  overflow-y-auto  pb-36 h-screen'>
    <div className="grid grid-cols-1  sm:mt-32 md:grid-cols-2 lg:grid-cols-3  gap-6 p-6">
      {projects.map((project, index) => (
        <ProjectCard key={project.id || index} project={project} /> 
      ))}
    </div>
    </div>
    </div>
  );
};

const ProjectCard = ({ project }) => {
  const { name, technologies, link, github, description } = project;
  

  const techArray = Array.isArray(technologies) 
    ? technologies 
    : typeof technologies === 'string'
      ? technologies.split(' ').filter(tech => tech.trim() !== '')
      : [];

  return (
    <div className="group flex flex-col h-full rounded-xl  transition-all duration-300 border bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700">
      <div className="p-6 flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {name || 'Unnamed Project'}
          </h3>
          <p className="mt-2 text-gray-600 dark:text-gray-300 text-sm">
            {description || 'No description available'}
          </p>
        </div>
        <div className="bg-blue-100 dark:bg-blue-900/50 p-2 rounded-lg">
          <Code className="h-5 w-5 text-blue-600 dark:text-blue-400" />
        </div>
      </div>
      
      <div className="px-6 pb-4 mt-auto">
        {techArray.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {techArray.map((tech, index) => (
              <span 
                key={index} 
                className="px-2 py-1 text-xs font-medium rounded-md bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
              >
                {tech}
              </span>
            ))}
          </div>
        )}
        
        <div className="flex gap-3 pt-2 border-t border-gray-200 dark:border-gray-700">
          {github && (
            <a 
              href={`https://${github}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-sm font-medium hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
              aria-label="View GitHub repository"
            >
              <Github className="h-4 w-4 mr-1" />
              Repo
            </a>
          )}
          
          {link && (
            <a 
              href={`https://${link}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 ml-auto"
              aria-label="Visit project website"
            >
              <ExternalLink className="h-4 w-4 mr-1" />
              Live Demo
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectsSection;