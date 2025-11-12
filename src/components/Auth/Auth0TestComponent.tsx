/**
 * Auth0TestComponent
 * 
 * Simple component to test Auth0 integration.
 * Shows login/logout buttons and displays user info when authenticated.
 */

import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

export const Auth0TestComponent: React.FC = () => {
    const {
        isLoading,
        isAuthenticated,
        error,
        user,
        loginWithRedirect,
        logout,
    } = useAuth0();

    const handleLogin = async () => {
        await loginWithRedirect({
            appState: {
                returnTo: "/",
            },
            authorizationParams: {
                prompt: "login",
            }
        });
    }

    // Loading state
    if (isLoading) {
        return <div className="text-center p-4">Loading Auth0...</div>;
    }

    // Error state
    if (error) {
        return (
            <div className="text-red-500 p-4">
                <h3>Auth0 Error:</h3>
                <p>{error.message + ' - ' + error.cause}</p>
            </div>
        );
    }

    // Not authenticated state
    if (!isAuthenticated) {
        return (
            <div className="p-4 text-center">
                <h2 className="text-xl mb-4">Auth0 Test - Not Logged In</h2>
                <button
                    onClick={handleLogin}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Log In with Auth0
                </button>
            </div>
        );
    }

    // Authenticated state
    return (
        <div className="p-4">
            <h2 className="text-xl mb-4">Auth0 Test - Logged In!</h2>

            <div className="mb-4 p-4 bg-gray-100 rounded">
                <h3 className="text-lg font-semibold mb-2">User Info:</h3>
                <p><strong>Name:</strong> {user?.name || 'No name'}</p>
                <p><strong>Email:</strong> {user?.email || 'No email'}</p>
                <p><strong>User ID:</strong> {user?.sub || 'No ID'}</p>
                {user?.picture && (
                    <div className="mt-2">
                        <strong>Picture:</strong>
                        <br />
                        <img src={user.picture} alt="User" className="w-16 h-16 rounded-full mt-1" />
                    </div>
                )}
            </div>

            <button
                onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
                Log Out
            </button>
        </div>
    );
};