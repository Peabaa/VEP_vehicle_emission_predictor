import React, { useState } from 'react'
import Car from "../../assets/carPic4.png"
import Logo from "../../assets/vep logo.png"
import "./VEP.css"

const VEP = () => {
  
  const [isStartScreen, setIsStartScreen] = useState(true);

  const handleStartClick  = () => {
    setIsStartScreen(false);
  };

  return (
    <div className="app-container">
      {isStartScreen ? (
        <div className="start-container">
          <div className="content">
            <div className="text-overlay">VEHICLE EMISSION<br />PREDICTOR</div>
            <div className="image-container">
              <img src={Car} alt="Car" className="carPic1" />
            </div>
              <img src={Logo} alt="VEP Logo" className="logoPic" />
            <button className="start-button" onClick={handleStartClick}>Start</button>
          </div>
        </div>
    ) : (
      <div className="main-ui-container">
          {/* This is your Main UI content */}
          <h1>Welcome to the Main UI</h1>
          <p>Here, you can add the core features and components of your application.</p>
          {/* Add your main application components or features here */}
        </div>
    ) }
    </div>
  );
}

export default VEP;