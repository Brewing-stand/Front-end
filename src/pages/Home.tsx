import {Card, Typography, Button} from 'antd';
import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {FireOutlined} from '@ant-design/icons';

const {Title, Paragraph} = Typography;

export function Home() {
    const [username, setUsername] = useState<string | null>(null);
    const navigate = useNavigate(); // Hook for navigation

    useEffect(() => {
        // Retrieve 'user' object from localStorage and extract username
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUsername(parsedUser.username);
        }
    }, []);

    const handleStartBrewing = () => {
        // Redirect to the Projects page
        navigate('/Projects');
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 py-10">
            <Card
                className="w-full max-w-2xl shadow-xl rounded-lg"
                bordered={false}
                style={{
                    padding: '30px',
                    backgroundColor: '#ffffff',
                }}
            >
                <Title level={2} className="text-center text-gray-800">
                    Welcome to Brewing Stand!
                </Title>

                {username ? (
                    <Paragraph className="text-center text-gray-600 mb-6">
                        Hello, <span className="font-semibold">{username}</span>! We're glad to have you on board. Let's
                        start brewing some amazing recipes together!
                    </Paragraph>
                ) : (
                    <Paragraph className="text-center text-gray-600 mb-6">
                        Hello, Guest! Please log in to get started with Brewing Stand.
                    </Paragraph>
                )}

                <div className="flex justify-center">
                    <Button
                        type="primary"
                        size="large"
                        shape="round"
                        icon={<FireOutlined/>}
                        className="bg-gray-900 hover:bg-gray-800 text-white border-none"
                        onClick={handleStartBrewing} // Trigger redirect
                    >
                        Start Brewing
                    </Button>
                </div>
            </Card>
        </div>
    );
}

export default Home;
