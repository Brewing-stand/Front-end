import React, {useEffect, useState} from 'react';
import {Button, Spin, notification} from 'antd';
import {PlusOutlined} from '@ant-design/icons';
import ProjectService from "../services/ProjectService.ts";
import {Project} from "../models/Project.ts";
import ProjectCard from "../components/project/ProjectCard.tsx";
import ProjectModal from "../components/project/ProjectModal.tsx";

const Projects: React.FC = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [projectToEdit, setProjectToEdit] = useState<Project | undefined>(undefined);

    // Fetch projects on component mount
    useEffect(() => {
        fetchProjects();
    }, []);

    // Fetch projects from the backend
    const fetchProjects = () => {
        setLoading(true);
        ProjectService.getAll()
            .then(response => {
                setProjects(response.data);
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
                notification.error({
                    message: 'Error',
                    description: 'Failed to fetch projects. Please try again later.',
                });
            });
    };

    // Handle adding a new project
    const handleAddProject = () => {
        setProjectToEdit(undefined);
        setIsModalVisible(true);
    };

    // Handle editing an existing project
    const handleEditProject = (projectId: string) => {
        const project = projects.find(p => p.id === projectId);
        setProjectToEdit(project);
        setIsModalVisible(true);
    };

    // Handle deleting a project
    const handleDelete = (projectId: string) => {
        ProjectService.delete(projectId)
            .then(() => {
                setProjects(projects.filter(project => project.id !== projectId));
                notification.success({
                    message: 'Success',
                    description: 'Project deleted successfully.',
                });
            })
            .catch(() => {
                notification.error({
                    message: 'Error',
                    description: 'Failed to delete project. Please try again later.',
                });
            });
    };

    // Handle closing the modal
    const handleModalClose = () => {
        setIsModalVisible(false);
    };

    // Handle adding a new project (from modal)
    const handleAddNewProject = (newProject: Project) => {
        ProjectService.create(newProject)
            .then(response => {
                setProjects(prevProjects => [...prevProjects, response.data]);
                setIsModalVisible(false);
                notification.success({
                    message: 'Success',
                    description: 'Project added successfully.',
                });
            })
            .catch(() => {
                notification.error({
                    message: 'Error',
                    description: 'Failed to add project. Please try again later.',
                });
            });
    };

    // Handle updating an existing project (from modal)
    const handleUpdateProject = (updatedProject: Project) => {
        ProjectService.update(updatedProject.id!, updatedProject)
            .then(() => {
                setProjects(projects.map(p => (p.id === updatedProject.id ? updatedProject : p)));
                setIsModalVisible(false);
                notification.success({
                    message: 'Success',
                    description: 'Project updated successfully.',
                });
            })
            .catch(() => {
                notification.error({
                    message: 'Error',
                    description: 'Failed to update project. Please try again later.',
                });
            });
    };

    return (
        <div className="p-6 relative">
            {/* Add Button in the Top Right */}
            <Button
                type="primary"
                shape="circle"
                icon={<PlusOutlined/>}
                size="large"
                onClick={handleAddProject}
                className="absolute top-6 right-6"
            />

            {/* Loading Spinner */}
            {loading && (
                <div className="flex justify-center mt-12">
                    <Spin size="large"/>
                </div>
            )}

            {/* Projects List */}
            <div className="flex flex-wrap gap-6 mt-12">
                {projects.length === 0 && !loading ? (
                    <p className="text-center text-gray-500 w-full">No projects available</p>
                ) : (
                    projects.map(project => (
                        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5" key={project.id}>
                            <ProjectCard
                                project={project}
                                onEdit={() => handleEditProject(project.id!)}
                                onDelete={handleDelete}
                            />
                        </div>
                    ))
                )}
            </div>

            {/* Project Modal */}
            <ProjectModal
                visible={isModalVisible}
                onCancel={handleModalClose}
                onAdd={handleAddNewProject}
                onUpdate={handleUpdateProject}
                projectToEdit={projectToEdit}
            />
        </div>
    );
};

export default Projects;
