import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_USERSERVICE_URL;

const UsernameAlreadyExistsApi = async ({ username, email }) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/CheckExistingUser`, {
            params: { username, email },
        });

        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 400) {
            throw new Error(error.response.data); 
        } else {
            throw new Error('Failed to connect to the server.');
        }
    }
};

export default UsernameAlreadyExistsApi;
