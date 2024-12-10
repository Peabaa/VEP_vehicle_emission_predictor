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
  const [alertMessage, setAlertMessage] = useState("");

  const handleStartClick  = () => {
    setIsStartScreen(false);
  };

  const handleSubmit = () => {
    if (vehicleType && fuelType && engineType && fuelEfficiency && mileage) {
      const newMileage = parseFloat(mileage);
  
      if (submittedData.length > 0) {
        const latestMileage = parseFloat(submittedData[submittedData.length - 1].mileage);
        if (newMileage <= latestMileage) {
          alert("Mileage must be greater than the latest mileage entered.");
          return; 
        }
      }
  
      const newData = {
        vehicleType,
        fuelType,
        engineType,
        fuelEfficiency,
        mileage: newMileage,
      };
  
      if (submittedData.length > 0) {
        const previousData = submittedData[submittedData.length - 1];
        const previousMileage = parseFloat(previousData.mileage);
        const previousFuelEfficiency = parseFloat(previousData.fuelEfficiency);
  
        const adjustedFuelEfficiency =
          previousFuelEfficiency * Math.pow(1 - 0.02, (newMileage - previousMileage) / 100);
  
        newData.fuelEfficiency = adjustedFuelEfficiency.toFixed(2);
      }
  
      setSubmittedData((prevData) => [...prevData, newData]);
  
      setMileage("");
      setIsFormSubmitted(true);
    } else {
      alert("Please fill in all fields before submitting!");
    }
  };

  const handleClearData = () => {
    setSubmittedData([]); 
    setAlertMessage("");
    setIsFormSubmitted(false);
    setVehicleType(""); 
    setFuelType("");
    setEngineType("");
    setFuelEfficiency("");
    setMileage("");
  };

  const handleCalculate = () => {
    if (submittedData.length < 2) {
      setAlertMessage("Please submit at least 2 data points to perform the calculation.");
      return;
    }
  
    const emissionLimit = fuelType === "Diesel" ? 0.9 : 2.0;
  
    // Calculate CO emission for each submitted data point
    const dataPoints = submittedData.map((data) => {
      const fuelConsumption = 1 / parseFloat(data.fuelEfficiency);
      const emissionFactor = {
        Motorcycle: 0.5,
        Sedan: 2.9,
        Hatchback: 1.96,
        SUV: 3.0,
        Van: 3.5,
        "Pickup Truck": 5.12,
        "Truck (4 Wheels and Up)": 6.2,
      }[data.vehicleType] || 2.9; // Default to Sedan if no match
  
      const coEmission = fuelConsumption * emissionFactor;
      return { mileage: parseFloat(data.mileage), coEmission };
    });
  
    console.log("Data Points:", dataPoints);
  
    // Perform divided difference extrapolation
    const calculateViolationMileage = (points, limit) => {
      const n = points.length;
      if (n < 2) return points[0].mileage;
  
      // Initialize divided differences table with mileage values
      let dividedDifferences = [];
      for (let i = 0; i < n; i++) {
        dividedDifferences[i] = [points[i].mileage];
      }
  
      // Compute higher-order divided differences
      for (let i = 1; i < n; i++) {
        for (let j = 0; j < n - i; j++) {
          const diff =
            (dividedDifferences[j + 1][i - 1] - dividedDifferences[j][i - 1]) /
            (points[j + i].coEmission - points[j].coEmission);
          dividedDifferences[j].push(diff);
        }
      }
  
      console.log("Divided Differences Table:", dividedDifferences);
  
      // Perform extrapolation using Newton's formula
      let predictedMileage = dividedDifferences[0][0]; 
      let term = 1;
  
      for (let i = 1; i < n; i++) {
        term *= (limit - points[i - 1].coEmission); 
        predictedMileage += dividedDifferences[0][i] * term; 
        console.log(`Term ${i}: ${term}, Predicted Mileage: ${predictedMileage}`);
      }
  
      return isNaN(predictedMileage) || !isFinite(predictedMileage) ? -1 : predictedMileage;
    };
  
    const linearExtrapolation = (points, limit) => {
      const lastPoint = points[points.length - 1];
      const secondLastPoint = points[points.length - 2];
  
      const slope = (lastPoint.coEmission - secondLastPoint.coEmission) /
                    (lastPoint.mileage - secondLastPoint.mileage);
  
      return lastPoint.mileage + (limit - lastPoint.coEmission) / slope;
    };
  
    let predictedMileage = calculateViolationMileage(dataPoints, emissionLimit);
  
    // Reliability Threshold
    const maxExtrapolationFactor = 2;
    const maxAllowedMileage = dataPoints[dataPoints.length - 1].mileage * maxExtrapolationFactor;
  
    if (predictedMileage === -1 || predictedMileage < 0 || predictedMileage > maxAllowedMileage) {
      console.log("Prediction deemed unreliable. Switching to fallback method.");
      predictedMileage = linearExtrapolation(dataPoints, emissionLimit);
    }
  
    console.log("Predicted Mileage:", predictedMileage);
  
    if (predictedMileage === -1) {
      setAlertMessage("Unable to predict the mileage of violation. Please check your data.");
    } else {
      setAlertMessage(
        `The predicted mileage of violation is approximately: ${predictedMileage.toFixed(
          2
        )} km`
      );
    }
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
                onChange={(e) => {
                  const value = parseFloat(e.target.value);
                  if (value >= 0 || e.target.value === "") { // Allow only non-negative numbers or empty input
                    setFuelEfficiency(e.target.value);
                  } else {
                    alert("Fuel Efficiency must be a positive number.");
                  }
                }} 
                placeholder="Enter Fuel Efficiency (km/liters)" 
                disabled={isFormSubmitted}
              />
            </div>
            <div className="info-item">
              <label>Mileage</label>
              <input 
                type="number" 
                value={mileage} 
                onChange={(e) => {
                  const value = parseFloat(e.target.value);
                  if (value >= 0 || e.target.value === "") { // Allow only non-negative numbers or empty input
                    setMileage(e.target.value);
                  } else {
                    alert("Mileage must be a positive number.");
                  }
                }}  
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
            <div className="table-content">
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
              </div>
              {alertMessage && (
                <div className="alert-message">
                  <p>{alertMessage}</p>
                </div>
              )}
            <div className="modal-buttons">
              <button className="clear-button" onClick={handleClearData}>Clear</button>
              <button className="calculate-button" onClick = {handleCalculate}>Calculate</button>
              <button className="close-modal" onClick={closeModal}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default VEP;