import React, {useEffect, useState} from 'react';
import {Button} from 'antd';
import {PlusOutlined} from '@ant-design/icons';
import projectService from "../services/ProjectService.ts";
import {Project} from "../models/Project.ts";
import ProjectCard from "../components/project/ProjectCard.tsx";
import ProjectModal from "../components/project/ProjectModal.tsx";

const Projects: React.FC = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [projectToEdit, setProjectToEdit] = useState<Project | undefined>(undefined);

    useEffect(() => {
        projectService.getAll()
            .then(response => {
                setProjects(response.data);
                setLoading(false);
            })
            .catch(() => {
                setError('Failed to load projects');
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
        projectService.delete(projectId)
            .then(() => {
                setProjects(projects.filter(project => project.id !== projectId));
            })
            .catch(() => {
                setError('Failed to delete project');
            });
    };

    const handleModalClose = () => {
        setIsModalVisible(false);
    };

    const handleAddNewProject = (newProject: Project) => {
        projectService.create(newProject)
            .then(response => {
                setProjects([...projects, response.data]);
                setIsModalVisible(false);
            })
            .catch(() => {
                setError('Failed to add project');
            });
    };

    const handleUpdateProject = (updatedProject: Project) => {
        projectService.update(updatedProject.id!, updatedProject)
            .then(() => {
                setProjects(projects.map(p => (p.id === updatedProject.id ? updatedProject : p)));
                setIsModalVisible(false);
            })
            .catch(() => {
                setError('Failed to update project');
            });
    };

    return (
        <div className="p-6">
                <Button
                    type="primary"
                    shape="circle"
                    icon={<PlusOutlined/>}
                    size="large"
                    onClick={handleAddProject}
                    className="m-9"
                />

            {loading && <p className="text-gray-500">Loading projects...</p>}
            {error && <p className="text-red-500">{error}</p>}

            <div className="flex flex-wrap justify-start gap-6 mt-12">
                {projects.length === 0 && !loading ? (
                    <p className="text-gray-500">No projects available</p>
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
