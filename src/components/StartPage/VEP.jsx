import React, { useState } from 'react'
import Car from "../../assets/carPic4.png"
import Logo from "../../assets/vep logo.png"
import "./VEP.css"

const VEP = () => {
  
  const [isStartScreen, setIsStartScreen] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);  // Pop-up Window for Data Table
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [vehicleType, setVehicleType] = useState("");
  const [fuelType, setFuelType] = useState("");
  const [engineType, setEngineType] = useState("");
  const [fuelEfficiency, setFuelEfficiency] = useState("");
  const [mileage, setMileage] = useState("");
  const [submittedData, setSubmittedData] = useState([]);

  const handleStartClick  = () => {
    setIsStartScreen(false);
  };

  const handleSubmit = () => {
    if (vehicleType && fuelType && engineType && fuelEfficiency && mileage) {
      const newData = {
        vehicleType,
        fuelType,
        engineType,
        fuelEfficiency,
        mileage
      };

      setSubmittedData(prevData => [...prevData, newData]);

      setMileage("");

      setIsFormSubmitted(true);

    } else {
      alert("Please fill in all fields before submitting!");
    }
  };

  const handleClearData = () => {
    setSubmittedData([]); 
    setIsFormSubmitted(false);
    setVehicleType(""); 
    setFuelType("");
    setEngineType("");
    setFuelEfficiency("");
    setMileage("");
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleVehicleTypeChange = (e) => {
    if (!isFormSubmitted) {
      setVehicleType(e.target.value);
    }
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
              <select value={vehicleType}
                onChange={handleVehicleTypeChange}
                disabled={isFormSubmitted}
              >
              <option value="" disabled hidden>Select Vehicle Type</option>
              <option value="Motorcycle">Motorcycle</option>
              <option value="Sedan">Sedan</option>
              <option value="Hatchback">Hatchback</option>
              <option value="SUV">SUV</option>
              <option value="Van">Van</option>
              <option value="Pickup Truck">Pickup Truck</option>
              <option value="Truck (4 Wheels and Up)">Truck (4 Wheels and Up)</option>
              </select>
            </div>
            <div className="info-item">
            <label>Fuel Type</label>
              <select value={fuelType}
                onChange={(e) => setFuelType(e.target.value)}
                disabled={isFormSubmitted}
              >
              <option value="" disabled hidden>Select Fuel Type</option>
              <option value="Diesel">Diesel</option>
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
                disabled={isFormSubmitted}
              />
            </div>
            <div className="info-item">
              <label>Fuel Efficiency</label>
              <input 
                type="number" 
                value={fuelEfficiency} 
                onChange={(e) => setFuelEfficiency(e.target.value)} 
                placeholder="Enter Fuel Efficiency (km/liters)" 
                disabled={isFormSubmitted}
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
          <div className="button-container">
            <button className="submit-button" onClick={handleSubmit}>Submit</button>
            <button className="data-button" onClick={openModal}>Data Table</button>
          </div>
        </div>
      </div>
    )}

    {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <table>
                <thead>
                  <tr>
                    <th>Vehicle Type</th>
                    <th>Fuel Type</th>
                    <th>Engine Type</th>
                    <th>Fuel Efficiency</th>
                    <th>Mileage</th>
                  </tr>
                </thead>
                <tbody>
                  {submittedData.map((data, index) => (
                    <tr key={index}>
                      <td>{data.vehicleType}</td>
                      <td>{data.fuelType}</td>
                      <td>{data.engineType}</td>
                      <td>{data.fuelEfficiency}</td>
                      <td>{data.mileage}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            <div className="modal-buttons">
              <button className="clear-button" onClick={handleClearData}>Clear</button>
              <button className="close-modal" onClick={closeModal}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default VEP;