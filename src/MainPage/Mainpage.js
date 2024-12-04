import React from 'react';
import './Mainpage.css';
import myImage from '../Assets/Images/creator.jpg';

function Mainpage() {

  return (
    <div className="App-Row">
      <div className="App-Column">
      <h2 className='center-text'>Meet the Creator!</h2>
      <figure className='center-image' >
      <img src={myImage} alt="Description of image"/>
      <figcaption>Pawel Kaminski, Software Engineering Student</figcaption>
      </figure>
      </div>
      <div className="App-Column">
      <h2 className='center-text'>About This Site</h2>
      <p>This was one of my first ideas, even in first year as it would greatly benefit everyone in the irish society.
        The scope of this idea might be too big to realize as there will be mainly different factors and process implemented in one project.
        </p>
      <p>
      Ireland is suffering from a housing crisis, this idea to help the current population with finding affordable 
      houses for renting and purchasing. 
      The scope as I already mentioned would be very large, it require very strong Front-end and Back-end backbone to 
      power all the different Api calls for analytics. Firstly I would need location tracking and API calls to home 
      renting/buying sites that would come up on the website depending on the given persons location.
      </p>

      <p>Secondly I would make python machine learning scripts to analyse the data and come up 
        with predictions of such as when to buy a home? Rent decreasing or increasing in 
        certain areas? Etc. with these tools at their disposal the people having access to the website would it easy to find a home. </p>

    <p>
    Thirdly the frameworks and architecture will be chosen by me, which as in the title 
    will be a Micro-Service architecture model, with the front-end being linked together 
    with api calls and Authentication. For the Back-end it will be c# .net 8 based but not sure yet,
     for frontend it will be react.js or angular.js. I will also be using python scripts as mentions.
      I will create my own template for the services and the front-end.
    </p>
      </div>
    </div>
  );
}

export default Mainpage;
