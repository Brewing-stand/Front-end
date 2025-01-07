import {useState, useEffect} from 'react';
import {Card, Button, Space, Typography, notification, Spin} from 'antd';
import {EditOutlined, DeleteOutlined} from '@ant-design/icons';
import {useNavigate} from "react-router-dom";
import UserService from "../../services/UserService";
import {User} from "../../models/User.ts";

const {Title, Text} = Typography;

export function Settings() {
    const navigate = useNavigate();
    const [userData, setUserData] = useState<User | null>(null); // Typed user data
    const [, setLoading] = useState<boolean>(false);
    const [userLoading, setUserLoading] = useState<boolean>(true); // To track loading state of user data

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await UserService.get(); // Get the user data from the service
                setUserData(response.data); // Set the user data
            } catch {
                notification.error({
                    message: 'Error Fetching User Data',
                    description: 'There was an error fetching your user data.',
                });
            } finally {
                setUserLoading(false); // Finish loading user data
            }
        };

        fetchUserData();
    }, []);

    const handleDelete = async () => {
        setLoading(true);
        try {
            const response = await UserService.delete();  // Use the service to delete the account
            if (response.status === 200) {
                notification.success({
                    message: 'Account Deleted',
                    description: 'Your account has been successfully deleted.',
                });
                navigate('/');  // Redirect to home page after deletion
            }
        } catch {
            notification.error({
                message: 'Error Deleting Account',
                description: 'There was an error deleting your account.',
            });
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = () => {
        // Navigate to edit page or open an edit modal
        navigate('/edit-profile');
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 py-10">
            {userLoading ? (
                <div className="flex justify-center items-center">
                    <Spin size="large"/>
                </div>
            ) : (
                userData && (
                    <Card
                        title={<Title level={4}>{userData.username}</Title>}
                        bordered
                        style={{width: 300, margin: '1rem'}}
                        actions={[
                            <Button
                                type="text"
                                icon={<EditOutlined/>}
                                onClick={handleEdit}
                                key="edit"
                            >
                                Edit
                            </Button>,
                            <Button
                                type="text"
                                icon={<DeleteOutlined/>}
                                onClick={handleDelete}
                                danger
                                key="delete"
                            >
                                Delete
                            </Button>,
                        ]}
                    >
                        <Space direction="vertical" size="small">
                            <Text><strong>Username:</strong> {userData.username}</Text>
                            <Text><strong>Avatar:</strong> {userData.avatar || 'No avatar set'}</Text>
                        </Space>
                    </Card>
                )
            )}
        </div>
    );
}

export default Settings;
