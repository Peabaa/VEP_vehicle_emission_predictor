import React from 'react'
import Car from "../../assets/carPic.png"
import "./Start.css"

const Start = () => {
  return (
    <div className="start-container">
      <button className="start-button">Start</button>
      <img src={Car} alt="Car 1" className="carPic1" />
    </div>
  );
}

export default Start;