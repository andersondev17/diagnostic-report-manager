// components/ErrorBoundary.tsx
'use client';

import { AlertCircle } from 'lucide-react';
import { Component, ReactNode } from 'react';

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
}

interface State {
    hasError: boolean;
    error?: Error;
    errorInfo?: React.ErrorInfo;
}

export class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.error('Error caught by boundary:', error, errorInfo);

        // Log to error tracking service (e.g., Sentry)
        if (process.env.NODE_ENV === 'production') {
            // logErrorToService(error, errorInfo);
        }

        this.setState({ error, errorInfo });
    }

    render() {
        if (this.state.hasError) {
            if (this.props.fallback) {
                return this.props.fallback;
            }

            return (
                <div
                    className="min-h-screen flex items-center justify-center bg-background p-4"
                    role="alert"
                    aria-live="assertive"
                >
                    <div className="max-w-md w-full bg-card border rounded-lg shadow-lg p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <AlertCircle className="w-8 h-8 text-destructive" />
                            <h2 className="text-2xl font-bold">Something went wrong</h2>
                        </div>

                        <p className="text-muted-foreground mb-4">
                            We're sorry, but something unexpected happened. Our team has been notified.
                        </p>

                        {process.env.NODE_ENV === 'development' && this.state.error && (
                            <details className="mb-4 p-3 bg-muted rounded text-sm">
                                <summary className="cursor-pointer font-semibold">
                                    Error Details
                                </summary>
                                <pre className="mt-2 overflow-auto">
                                    {this.state.error.toString()}
                                    {'\n\n'}
                                    {this.state.errorInfo?.componentStack}
                                </pre>
                            </details>
                        )}

                        <button
                            onClick={() => window.location.reload()}
                            className="btn-primary w-full"
                        >
                            Reload Page
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}