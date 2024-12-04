import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BOOKINGSERVICE_URL;

const fetchBookings = async (userid) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/getBookings`, {
            params: { userid }, 
        });
        return response.data.results;  
    } catch (error) {
        console.error('Error fetching bookings:', error);
        throw error;  
    }
};

export default fetchBookings;
