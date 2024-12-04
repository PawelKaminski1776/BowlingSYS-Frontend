import axios from 'axios';

const API_URL =  process.env.REACT_APP_API_MAKEBOOKINGSERVICE_URL;

export const insertBooking = async (bookingData) => {
  try {
    console.log(bookingData);
    bookingData.bookingTime = bookingData.bookingTime.slice(0, 2);
    bookingData.bookingCost = bookingData.bookingCost.slice(1, 3);
    
    const response = await axios.post(`${API_URL}/SendBooking`, bookingData);
    return response.data;
  } catch (error) {
    console.error('Error inserting booking:', error);
    throw error;
  }
};