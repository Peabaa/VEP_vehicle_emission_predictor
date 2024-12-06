import React from 'react'
import Car from "../../assets/carPic4.png"
import Logo from "../../assets/vep logo.png"
import "./Start.css"

const Start = () => {
  return (
    <div className="start-container">
      <div className="content">
        <div className="text-overlay">VEHICLE EMISSION<br />PREDICTOR</div>
        <div className="image-container">
          <img src={Car} alt="Car" className="carPic1" />
        </div>
          <img src={Logo} alt="VEP Logo" className="logoPic" />
        <button className="start-button">Start</button>
      </div>
    </div>
  );
}

export default Start;