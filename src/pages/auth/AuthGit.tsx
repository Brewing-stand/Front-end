import {useEffect} from "react";
import AuthGitService from "../../services/AuthGitService.ts";
import {useNavigate} from "react-router-dom";

export function AuthGit() {
    const navigate = useNavigate();

    useEffect(() => {
        (async () => await AuthGitService.handleGitHubLogin() && navigate("/"))();
    }, [navigate]);

    return (
        <>
            <h2>Processing GitHub Login...</h2>
            <p>Please wait while we complete your login.</p>
        </>
    );
}

export default AuthGit;
