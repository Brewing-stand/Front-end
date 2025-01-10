import {FC, useState} from "react";
import {Button, Modal} from "antd";

interface ConsentPopupProps {
    onConsent: () => void;
    closeModal: () => void;  // New prop to close the modal
}

const ConsentPopup: FC<ConsentPopupProps> = ({onConsent}) => {
    const [isVisible, setIsVisible] = useState(true);

    // Handle modal visibility based on the user's action
    const handleOk = () => {
        onConsent();
        setIsVisible(false);
    };

    return (
        <Modal
            title="We Value Your Privacy"
            visible={isVisible}
            onOk={handleOk}
            footer={[
                <Button
                    key="submit"
                    type="primary"
                    onClick={handleOk}
                    className="w-full sm:w-auto sm:ml-2"
                >
                    Accept
                </Button>,
            ]}
            className="sm:max-w-lg"
        >
            <p>
                We use cookies to enhance your experience. By clicking "Accept," you
                consent to our use of cookies and the collection of necessary data.
            </p>
            <p>
                <a
                    href="https://github.com/Brewing-stand/Documentation/blob/main/GDPR/Privacy%20Policy.md"
                    className="text-blue-500"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Privacy Policy
                </a>
            </p>
        </Modal>
    );
};

export default ConsentPopup;
