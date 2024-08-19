import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../jwt_tokens.js';
import { jwtDecode } from 'jwt-decode';
import djangoApiConnection from '../django_api.js';

function ProtectedRoute({ children }) {
    const [authorized, setAuthorized] = useState(null);

    useEffect(() => {
        authorization().catch(() => setAuthorized(false));
    }, []);

    //refreshes access token
    const refreshToken = async () => {
        //gets refresh token
        const refreshToken = localStorage.getItem(REFRESH_TOKEN);

        try {
            //sends POST request to get a new access token
            const response = await djangoApiConnection.post("token/refresh/", {refresh: refreshToken});

            if (response.status === 200) {
                //sets the new access token
                localStorage.setItem(ACCESS_TOKEN, response.data.access);
                setAuthorized(true);
            }
            else {
                setAuthorized(false);
            }
        }
        catch (error) {
            console.log(error);
            setAuthorized(false);
        }
    }

    const authorization = async () => {
        //gets access token
        const accessToken = localStorage.getItem(ACCESS_TOKEN);

        if (!accessToken) {
            setAuthorized(false);
            return;
        }

        //decodes token
        const decodedAccessToken = jwtDecode(accessToken);

        //gets expiration date
        const accessTokenExpiration = decodedAccessToken.exp;

        //gets date in seconds
        const date = Date.now() / 1000;

        //if access token expired, refresh the token
        if (accessTokenExpiration < date) {
            await refreshToken();
        }
        else {
            setAuthorized(true);
        }

        return authorized ? children : <Navigate to="/"/>;
    };
}

export default ProtectedRoute;