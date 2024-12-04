import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import { faMinus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import fetchBookings from './DashboardApi';  

function Dashboard() {
  const [selectedService, setSelectedService] = useState(null);
  const [bookings, setBookings] = useState([]);  
  const [loading, setLoading] = useState(true);  
  const [error, setError] = useState(null);  

  const openPanel = (item) => {
    setSelectedService(item);
  };

  const closePanel = () => {
    setSelectedService(null);
  };

  useEffect(() => {
    const user_id = sessionStorage.getItem('session_id');  

 
    if (!user_id) {
      setError('User ID not found in session. Please log in.');
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        const result = await fetchBookings(user_id);  
        setBookings(result); 
        setLoading(false);  
      } catch (err) {
        setError('Error fetching data. Please try again later.');
        setLoading(false);
      }
    };

    fetchData();  
  }, []);  

  if (loading) {
    return <div>Loading...</div>;  
  }

  if (error) {
    return <div>{error}</div>;  
  }

  return (
    <div className='app-column'>
      <div className='main-text-black'>
        <p>All Bookings</p>
      </div>

      <div className="booking-list">
        {bookings.map((booking) => (
          <div key={booking.booking_id} className="booking-item">
            <p>Booking ID: {booking.booking_id}</p>
            <p>Booking Date: {booking.booking_date}</p>
            <p>Booking Time: {booking.booking_time}</p>
            <p>Booking Status: {booking.booking_status}</p>
            <p>Number of Shoes: {booking.numofshoes}</p>
            <p>Booking Cost: ${booking.booking_cost}</p>
            <p>Lane ID: {booking.lane_id}</p>
            <p>User ID: {booking.user_id}</p>
            <button onClick={() => openPanel(booking)}>View Details</button>
          </div>
        ))}
      </div>

      {selectedService && (
        <div className="details-panel">
          <button onClick={closePanel}>
            <FontAwesomeIcon icon={faMinus} />
            Close
          </button>
          <div>
            <h3>Booking Details</h3>
            <p>Booking ID: {selectedService.booking_id}</p>
            <p>Booking Date: {selectedService.booking_date}</p>
            <p>Booking Time: {selectedService.booking_time}</p>
            <p>Booking Status: {selectedService.booking_status}</p>
            <p>Number of Shoes: {selectedService.numofshoes}</p>
            <p>Booking Cost: ${selectedService.booking_cost}</p>
            <p>Lane ID: {selectedService.lane_id}</p>
            <p>User ID: {selectedService.user_id}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
