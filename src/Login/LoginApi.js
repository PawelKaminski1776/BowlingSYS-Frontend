import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_USERSERVICE_URL;

async function LoginApi(username, email, password) {
    console.log(API_BASE_URL.toString()+'/CheckLogin');
    try {
        const response = await axios.get(`${API_BASE_URL}/CheckLogin`, {
            params: {
                username: username || null,
                email: email || null,
                password: password,
            },
        });
        return response.data; 
    } catch (error) {
        console.error('Error during login API call:', error);
        throw error;
    }
}

export default LoginApi;
