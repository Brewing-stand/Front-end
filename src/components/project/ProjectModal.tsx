import React, {useEffect, useState} from 'react';
import {Modal, Form, Input} from 'antd';
import {Project} from '../../models/Project';

interface ProjectModalProps {
    visible: boolean;
    onCancel: () => void;
    onAdd: (project: Project) => void;
    onUpdate: (project: Project) => void;
    projectToEdit?: Project;
}

const ProjectModal: React.FC<ProjectModalProps> = ({
                                                       visible,
                                                       onCancel,
                                                       onAdd,
                                                       onUpdate,
                                                       projectToEdit,
                                                   }) => {
    const [form] = Form.useForm();
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        if (projectToEdit) {
            setIsEditing(true);
            form.setFieldsValue({
                name: projectToEdit.name,
                description: projectToEdit.description, // Ensure description is required
                // No ownerId field here
            });
        } else {
            setIsEditing(false);
            form.resetFields();
        }
    }, [projectToEdit, form]);

    const handleSubmit = () => {
        form
            .validateFields()
            .then(values => {
                const project: Project = {
                    id: projectToEdit?.id || '', // Use existing ID if updating
                    name: values.name,
                    description: values.description, // Make sure description is required
                    // ownerId is not included here
                };
                if (isEditing) {
                    onUpdate(project); // Call update function if editing
                } else {
                    onAdd(project); // Call add function if adding
                }
                form.resetFields();
            })
            .catch(info => {
                console.log('Validate Failed:', info);
            });
    };

    return (
        <Modal
            title={isEditing ? 'Update Project' : 'Add New Project'}
            visible={visible}
            onCancel={onCancel}
            onOk={handleSubmit}
            okText={isEditing ? 'Update Project' : 'Add Project'}
        >
            <Form form={form} layout="vertical">
                <Form.Item
                    label="Project Name"
                    name="name"
                    rules={[{required: true, message: 'Please enter the project name'}]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    label="Description"
                    name="description"
                    rules={[{required: true, message: 'Please enter the description'}]} // Description is now required
                >
                    <Input/>
                </Form.Item>
                {/* No ownerId field here */}
            </Form>
        </Modal>
    );
};

export default ProjectModal;
