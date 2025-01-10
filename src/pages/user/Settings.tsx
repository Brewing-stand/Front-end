import {useState, useEffect} from 'react';
import {Card, Button, Space, Typography, notification, Spin} from 'antd';
import {EditOutlined, DeleteOutlined} from '@ant-design/icons';
import {useNavigate} from "react-router-dom";
import UserService from "../../services/UserService"; // Assuming user service fetches data
import {User} from "../../models/User.ts"; // Type for user model
import UserModal from "../../components/user/UserModal.tsx"; // Modal component for user editing

const {Title, Text} = Typography;

export function Settings() {
    const navigate = useNavigate();
    const [userData, setUserData] = useState<User | null>(null); // Typed user data
    const [, setLoading] = useState<boolean>(false);
    const [userLoading, setUserLoading] = useState<boolean>(true); // Track loading state of user data
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const [hasConsented, setHasConsented] = useState<boolean>(false);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await UserService.get(); // Get the user data from the service
                setUserData(response.data); // Set the user data from response
            } catch {
                notification.error({
                    message: 'Error Fetching User Data',
                    description: 'There was an error fetching your user data.',
                });
            } finally {
                setUserLoading(false); // Finish loading user data
            }
        };

        fetchUserData().then() // Fetch user data when the component is mounted

        // Check for consent status on page load
        const consentCookie = document.cookie.indexOf("userHasConsented=true");
        if (consentCookie !== -1) {
            setHasConsented(true);
        }
    }, []); // Empty dependency array means this effect runs once on mount

    const handleDelete = async () => {
        setLoading(true); // Set loading before deleting
        try {
            const response = await UserService.delete();  // Delete the account using service
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
            setLoading(false); // Finish loading after deletion
        }
    };

    const handleUpdate = async (updatedUser: User) => {
        setLoading(true); // Set loading before updating
        try {
            const response = await UserService.update(updatedUser); // Update the user data
            if (response.status === 200) {
                setUserData(updatedUser); // Update the local state with the updated user data
                notification.success({
                    message: 'User Updated',
                    description: 'Your user data has been successfully updated.',
                });
                setIsModalVisible(false); // Close the modal after update
            }
        } catch {
            notification.error({
                message: 'Error Updating User',
                description: 'There was an error updating your user data.',
            });
        } finally {
            setLoading(false); // Finish loading after update
        }
    };

    const handleEdit = () => {
        setIsModalVisible(true); // Show the modal to edit user data
    };

    const handleRemoveConsent = () => {
        // Remove the consent cookie and update the state
        document.cookie = "userHasConsented=; path=/; max-age=0";  // Expire the consent cookie
        setHasConsented(false);  // Update the state to reflect consent removal
        notification.success({
            message: 'Consent Removed',
            description: 'You have successfully removed your consent.',
        });
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 py-10">
            {userLoading ? (
                <div className="flex justify-center items-center">
                    <Spin size="large"/>
                </div>
            ) : (
                userData && (
                    <>
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
                                <Text>
                                    <strong>Username:</strong> {userData.username}
                                </Text>
                                <Text>
                                    <strong>Avatar:</strong> {userData.avatar || 'No avatar set'}
                                </Text>
                            </Space>
                        </Card>
                        <UserModal
                            visible={isModalVisible}
                            onCancel={() => setIsModalVisible(false)}
                            onUpdate={handleUpdate}
                            userToEdit={userData}
                        />
                        {/* Button to remove consent */}
                        {hasConsented && (
                            <Button
                                danger
                                onClick={handleRemoveConsent}
                                style={{marginTop: '1rem'}}
                            >
                                Remove Consent
                            </Button>
                        )}
                    </>
                )
            )}
        </div>
    );
}

export default Settings;
