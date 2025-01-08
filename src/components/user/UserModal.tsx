import React, {useEffect} from 'react';
import {Modal, Form, Input} from 'antd';
import {User} from '../../models/User';

interface UserModalProps {
    visible: boolean;
    onCancel: () => void;
    onUpdate: (user: User) => void;
    userToEdit?: User;
}

const UserModal: React.FC<UserModalProps> = ({visible, onCancel, onUpdate, userToEdit}) => {
    const [form] = Form.useForm();

    useEffect(() => {
        if (userToEdit) {
            form.setFieldsValue({
                username: userToEdit.username,
                avatar: userToEdit.avatar,
            });
        } else {
            form.resetFields();
        }
    }, [userToEdit, form]);

    const handleSubmit = () => {
        form.validateFields()
            .then((values) => {
                const updatedUser: User = {
                    ...userToEdit, // Preserve existing fields like ID
                    username: values.username,
                    avatar: values.avatar,
                };
                onUpdate(updatedUser);
                form.resetFields();
            })
            .catch((info) => {
                console.log('Validate Failed:', info);
            });
    };

    return (
        <Modal
            title="Update User"
            visible={visible}
            onCancel={onCancel}
            onOk={handleSubmit}
            okText="Update User"
        >
            <Form form={form} layout="vertical">
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[{required: true, message: 'Please enter the username'}]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    label="Avatar URL"
                    name="avatar"
                    rules={[{required: false}]}
                >
                    <Input/>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default UserModal;
