import React from 'react';
import {Card, Button, Space, Typography} from 'antd';
import {EditOutlined, DeleteOutlined} from '@ant-design/icons';
import {Project} from '../../models/Project';

const {Title, Text} = Typography;

interface ProjectCardProps {
    project: Project;
    onEdit: (projectId: string) => void;
    onDelete: (projectId: string) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({project, onEdit, onDelete}) => {
    return (
        <Card
            title={<Title level={4}>{project.name}</Title>}
            bordered
            style={{width: 300, margin: '1rem'}}
            actions={[
                <Button
                    type="text"
                    icon={<EditOutlined/>}
                    onClick={() => onEdit(project.id!)}
                    key="edit"
                >
                    Edit
                </Button>,
                <Button
                    type="text"
                    icon={<DeleteOutlined/>}
                    onClick={() => onDelete(project.id!)}
                    danger
                    key="delete"
                >
                    Delete
                </Button>,
            ]}
        >
            <Space direction="vertical" size="small">
                <Text><strong>Description:</strong> {project.description}</Text>
            </Space>
        </Card>
    );
};

export default ProjectCard;
