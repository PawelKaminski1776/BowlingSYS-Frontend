import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_VIEWSERVICE_URL;

export const getAllServices = async () => {
  const user_id = sessionStorage.getItem('session_id'); 

  if (!user_id) {
    console.error('User ID is missing from session.');
    throw new Error('User ID is required');
  }

  try {
    const response = await axios.get(`${API_BASE_URL}/LoadBowlingPanels`, {
      params: { user_id } 
    });
    return response.data.results;
  } catch (error) {
    console.error('Error fetching services:', error);
    throw error;
  }
};
