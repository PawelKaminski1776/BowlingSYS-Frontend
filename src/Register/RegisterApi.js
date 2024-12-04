import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_USERSERVICE_URL;

const RegisterApi = async ({ username, email, password, firstname, surname }) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/AddNewAccount`, {
            Username: username,
            Email: email,
            Password: password,
            Forename: firstname,
            Surname: surname,
        });
        return response.data;
    } catch (error) {
        console.error('Error registering user:', error);
        throw error;
    }
};

export default RegisterApi;
