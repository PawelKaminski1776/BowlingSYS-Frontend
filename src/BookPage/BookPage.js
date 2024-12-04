import React, { useState, useEffect } from 'react';
import './BookPage.css';
import { faMinus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SidePanel from './Sidepanel';
import { getAllServices } from './ViewApi'; 
import { insertBooking } from './InsertBookingApi'; 

function BookPage() {
  const [selectedService, setSelectedService] = useState(null);
  const [services, setServices] = useState([]);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [bookingDetails, setBookingDetails] = useState({
    bookingDate: '',
    bookingTime: '',
    bookingStatus: 'B',
    numOfShoes: 0,
    bookingCost: 0,
    laneId: 1, 
    userId: sessionStorage.getItem('session_id'),
  });

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await getAllServices();
        setServices(data); 
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };

    fetchServices(); 
  }, []); 

  const openPanel = (item) => {
    setSelectedService(item);
    setShowBookingForm(false); // Reset form visibility when opening a new service panel
    setBookingDetails((prevDetails) => ({
      ...prevDetails,
      bookingCost: item.price, // Preload the price when opening the panel
    }));
  };

  const closePanel = () => {
    setSelectedService(null);
    setShowBookingForm(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleBooking = async () => {
    try {
      await insertBooking(bookingDetails);
      alert('Booking successfully created!');
      closePanel();
    } catch (error) {
      alert('Failed to create booking. Please try again.');
    }
  };

  return (
    <div className='app-column'>
      <div className='main-text-black'>
        <p>Current available packages</p>
      </div>
      <div className='app-row'>
        {services.map((item, index) => (
          <div key={index} className='service-item'>
            <div 
              className='service-image'  
              style={{ 
                backgroundImage: `url(${item.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center', 
                backgroundRepeat: 'no-repeat' 
              }}
              aria-hidden="true"
            ></div>
            <div className='service-panel'>
              <div className='title-row'>
                <FontAwesomeIcon icon={faMinus} className='icon-minus'/>
                <h2>{item.title}</h2>
              </div>
              <p className='main-text-grey'>{item.description}</p>
              <p className='main-text-grey'>Price: {item.price}</p>
              <button 
                className='service-panel-button' 
                onClick={() => (selectedService === item ? closePanel() : openPanel(item))}
                aria-expanded={selectedService === item}
              >
                {selectedService === item ? 'Hide' : 'View More'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedService && (
  <SidePanel
    isOpen={!!selectedService}
    onClose={closePanel}
    title={selectedService?.title}
    description={selectedService?.extendeddescription}
    image={selectedService?.image}
    onBook={() => setShowBookingForm(true)} // Show the booking form
  >
    {showBookingForm && (
      <div className='booking-form'>
        <h3>Fill in your details to book</h3>
        <p>Price: {bookingDetails.bookingCost}</p>
        <input
          type='date'
          name='bookingDate'
          value={bookingDetails.bookingDate}
          onChange={handleInputChange}
          placeholder='Booking Date'
        />
        <input
          type='time'
          name='bookingTime'
          value={bookingDetails.bookingTime}
          onChange={handleInputChange}
          placeholder='Booking Time'
        />
        <input
          type='number'
          name='numOfShoes'
          value={bookingDetails.numOfShoes}
          onChange={handleInputChange}
          placeholder='Number of Shoes'
        />
        <button className='submit-booking-button' onClick={handleBooking}>
          Submit Booking
        </button>
      </div>
    )}
  </SidePanel>
)}

    </div>
  );
}

export default BookPage;
