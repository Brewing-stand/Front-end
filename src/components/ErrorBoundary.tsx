import React, {Component, ReactNode} from "react";

interface ErrorBoundaryProps {
    children: ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
    error: Error | null;
    errorInfo: React.ErrorInfo | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = {
            hasError: false,
            error: null,
            errorInfo: null,
        };
    }

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        // Update state to indicate an error occurred
        return {hasError: true, error, errorInfo: null};
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
        // Log the error to an error reporting service (optional)
        console.error("Error caught by ErrorBoundary:", error, errorInfo);
        this.setState({errorInfo});
    }

    render() {
        if (this.state.hasError) {
            // Render fallback UI
            return (
                <div style={{padding: "20px", backgroundColor: "red", color: "white"}}>
                    <h2>Something went wrong.</h2>
                    <p>We are working to fix the issue.</p>
                    <details>
                        <summary>Details</summary>
                        <pre>{this.state.error?.toString()}</pre>
                        <pre>{this.state.errorInfo?.componentStack}</pre>
                    </details>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
