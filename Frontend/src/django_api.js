import axios from 'axios';
import { ACCESS_TOKEN } from "./jwt_tokens.js";

//gets api from backend
const djangoApiConnection = axios.create({baseURL: import.meta.env.VITE_DJANGO_API_CONNECTION});

djangoApiConnection.interceptors.request.use(
    (config) => {
        //gets access token
        const accessToken = localStorage.getItem(ACCESS_TOKEN);

        if (accessToken) {
            //adds access token to authorization header
            config.headers.Authorization = `Bearer ${accessToken}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default djangoApiConnection;