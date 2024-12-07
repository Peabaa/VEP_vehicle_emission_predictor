import React, { useState } from 'react'
import Car from "../../assets/carPic4.png"
import Logo from "../../assets/vep logo.png"
import "./VEP.css"

const VEP = () => {
  
  const [isStartScreen, setIsStartScreen] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);  // Pop-up Window for Data Table
  const [vehicleType, setVehicleType] = useState("");
  const [fuelType, setFuelType] = useState("");
  const [engineType, setEngineType] = useState("");
  const [fuelEfficiency, setFuelEfficiency] = useState("");
  const [mileage, setMileage] = useState("");

  const handleStartClick  = () => {
    setIsStartScreen(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="app-container">
      {isStartScreen ? (
        <div className="start-container">
          <div className="content-start">
            <div className="name-start">VEHICLE EMISSION<br />PREDICTOR</div>
            <div className="image-start">
              <img src={Car} alt="Car" className="carPic1" />
            </div>
              <img src={Logo} alt="VEP Logo" className="logoPic-start" />
            <button className="start-button" onClick={handleStartClick}>Start</button>
          </div>
        </div>
    ) : (
      <div className="main-container">
        <div className="content-main">
          <div className="name-main">VEHICLE EMISSION<br />PREDICTOR</div>
          <div className="image-main">
            <img src={Car} alt="Car" className="carPic2" />
          </div>
          <img src={Logo} alt="VEP Logo" className="logoPic-main" />
          <div className="vehicle-info">Vehicle Information</div>
          <div className="info-container">
            <div className="info-item">
              <label>Vehicle Type</label>
              <select value={vehicleType} onChange={(e) => setVehicleType(e.target.value)}>
              <option value="" disabled hidden>Select Vehicle Type</option>
              <option value="motorcycle">Motorcycle</option>
              <option value="sedan">Sedan</option>
              <option value="hatchback">Hatchback</option>
              <option value="suv">SUV</option>
              <option value="van">Van</option>
              <option value="pickup">Pickup Truck</option>
              <option value="truck_4">Truck - 4 Wheeler</option>
              <option value="truck_6">Truck - 6 Wheeler</option>
              </select>
            </div>
            <div className="info-item">
            <label>Fuel Type</label>
              <select value={fuelType} onChange={(e) => setFuelType(e.target.value)}>
              <option value="" disabled hidden>Select Fuel Type</option>
              <option value="diesel">Diesel</option>
              <option value="Gasoline">Gasoline</option>
              </select>
            </div>
            <div className="info-item">
              <label>Engine Type</label>
              <input 
                type="text" 
                value={engineType} 
                onChange={(e) => setEngineType(e.target.value)} 
                placeholder="Enter Engine Type" 
              />
            </div>
            <div className="info-item">
              <label>Fuel Efficiency</label>
              <input 
                type="number" 
                value={fuelEfficiency} 
                onChange={(e) => setFuelEfficiency(e.target.value)} 
                placeholder="Enter Fuel Efficiency (liters/km)" 
              />
            </div>
            <div className="info-item">
              <label>Mileage</label>
              <input 
                type="number" 
                value={mileage} 
                onChange={(e) => setMileage(e.target.value)} 
                placeholder="Enter Mileage (km)" 
              />
            </div>
          </div>
          <div className="menu"></div>
          <button className="data-button" onClick={openModal}>Data Table</button>
        </div>
      </div>
    )}

    {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Data Table</h2>
            <p>This is where the data table will be displayed.</p>
            <button className="close-modal" onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default VEP;