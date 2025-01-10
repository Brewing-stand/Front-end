import './App.css';
import Navbar from "./components/Navbar.tsx";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {Home} from "./pages/Home.tsx";
import {AuthGit} from "./pages/auth/AuthGit.tsx";
import Projects from "./pages/Projects.tsx";
import Auth from "./pages/auth/Auth.tsx";
import Settings from "./pages/user/Settings.tsx";
import {useEffect, useState} from "react";
import ConsentPopup from "./components/ConsentPopup.tsx";
import ErrorBoundary from "./components/ErrorBoundary"; // Import the ErrorBoundary

function App() {
    const [hasConsented, setHasConsented] = useState<boolean>(false);
    const [, setConsentDate] = useState<string | null>(null);

    useEffect(() => {
        // Check for the consent cookie when the page loads
        const consentCookie = document.cookie.indexOf("userHasConsented=true");
        if (consentCookie !== -1) {
            setHasConsented(true);

            // Extract the consent date from the cookie if it exists
            const consentDateMatch = document.cookie.match(/consentDate=([^;]+)/);
            if (consentDateMatch) {
                setConsentDate(consentDateMatch[1]);
            }
        }
    }, []);

    const handleConsent = () => {
        const dateAccepted = new Date().toISOString(); // Get the current date and time in ISO format
        // Set the consent cookie with the date of consent
        document.cookie = `userHasConsented=true; consentDate=${dateAccepted}; path=/; max-age=31536000`;  // 1 year expiry
        setHasConsented(true);
        setConsentDate(dateAccepted);
    };

    const closeConsentModal = () => {
        setHasConsented(true);  // Close the modal
    };

    return (
        <>
            <Router>
                <div className="App">
                    <ErrorBoundary> {/* Wrap everything in ErrorBoundary */}
                        {!hasConsented && (
                            <ConsentPopup onConsent={handleConsent} closeModal={closeConsentModal}/>
                        )}
                        <Navbar/>
                        <Routes>
                            <Route path="/" element={<Home/>}/>
                            <Route path="/Auth" element={<Auth/>}/>
                            <Route path="/Auth/Git" element={<AuthGit/>}/>
                            <Route path="/User/Settings" element={<Settings/>}/>
                            <Route path="/Projects" element={<Projects/>}/>
                        </Routes>
                    </ErrorBoundary>
                </div>
            </Router>
        </>
    );
}

export default App;
