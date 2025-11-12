/**
 * Auth0ProviderWithHistory
 * 
 * Modern Auth0 provider that works with createBrowserRouter.
 * Uses browser history API instead of useNavigate hook.
 */

import { Auth0Provider } from "@auth0/auth0-react";
import type { AppState } from "@auth0/auth0-react";
import React from "react";

interface Auth0ProviderWithHistoryProps {
    children: React.ReactNode;
}

export const Auth0ProviderWithHistory: React.FC<Auth0ProviderWithHistoryProps> = ({ children }) => {
    // Read Auth0 configuration from environment variables
    const domain = import.meta.env.VITE_AUTH0_DOMAIN;
    const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
    const redirectUri = import.meta.env.VITE_AUTH0_CALLBACK_URL;
    const audience = import.meta.env.VITE_AUTH0_AUDIENCE;

    /**
     * Callback function that runs after successful authentication
     * Uses browser history API instead of useNavigate since we're outside router context
     */
    const onRedirectCallback = (appState?: AppState) => {
        // Use browser history API to navigate (works outside React Router context)
        window.history.replaceState(
            {},
            document.title,
            appState?.returnTo || window.location.pathname
        );
    };

    // Safety check: Ensure all required Auth0 configuration is present
    if (!(domain && clientId && redirectUri)) {
        console.error('Auth0 configuration missing. Please check your .env file.');
        return null;
    }

    return (
        <Auth0Provider
            domain={domain}
            clientId={clientId}
            authorizationParams={{
                redirect_uri: redirectUri,
                ...(audience && { audience }),
            }}
            onRedirectCallback={onRedirectCallback}
        >
            {children}
        </Auth0Provider>
    );
};