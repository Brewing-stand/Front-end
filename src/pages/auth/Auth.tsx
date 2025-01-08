import {GithubOutlined} from '@ant-design/icons';
import LoginGit from "../../services/AuthGitService.ts";
import {Button, Card, Typography} from 'antd';

const {Title, Paragraph} = Typography;

export function Auth() {
    const handleGitHubLogin = () => {
        try {
            // Call the Login method from the LoginGit service
            LoginGit.redirectToGitHubLogin();
        } catch (error) {
            console.error("Error during GitHub login:", error);
        }
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
                    Login to Brewing Stand
                </Title>

                <Paragraph className="text-center text-gray-600 mb-6">
                    Please log in to continue using the platform.
                </Paragraph>

                <div className="flex justify-center">
                    <Button
                        type="primary"
                        shape="round"
                        icon={<GithubOutlined/>}
                        size="large"
                        className="bg-gray-900 hover:bg-gray-800 text-white border-none"
                        onClick={handleGitHubLogin}
                    >
                        Sign in with GitHub
                    </Button>
                </div>
            </Card>
        </div>
    );
}

export default Auth;
