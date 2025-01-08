import React, {useEffect, useState} from 'react';
import {Button, Spin} from 'antd';
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

    useEffect(() => {
        ProjectService.getAll()
            .then(response => {
                setProjects(response.data);
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            });
    }, []);

    const handleAddProject = () => {
        setProjectToEdit(undefined);
        setIsModalVisible(true);
    };

    const handleEditProject = (projectId: string) => {
        const project = projects.find(p => p.id === projectId);
        setProjectToEdit(project);
        setIsModalVisible(true);
    };

    const handleDelete = (projectId: string) => {
        ProjectService.delete(projectId)
            .then(() => {
                setProjects(projects.filter(project => project.id !== projectId));
            })
            .catch(() => {
                // Optional: Show some alert or notification
            });
    };

    const handleModalClose = () => {
        setIsModalVisible(false);
    };

    const handleAddNewProject = (newProject: Project) => {
        ProjectService.create(newProject)
            .then(response => {
                setProjects([...projects, response.data]);
                setIsModalVisible(false);
            })
            .catch(() => {
                // Optional: Show some alert or notification
            });
    };

    const handleUpdateProject = (updatedProject: Project) => {
        ProjectService.update(updatedProject.id!, updatedProject)
            .then(() => {
                setProjects(projects.map(p => (p.id === updatedProject.id ? updatedProject : p)));
                setIsModalVisible(false);
            })
            .catch(() => {
                // Optional: Show some alert or notification
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
