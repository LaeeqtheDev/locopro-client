import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './PriceCal.css';
import axios from 'axios';

const PriceCal = () => {
  const [category, setCategory] = useState('');
  const [materialType, setMaterialType] = useState('');
  const [cementBags, setCementBags] = useState(0);
  const [steelKg, setSteelKg] = useState(0);
  const [sandCubicFeet, setSandCubicFeet] = useState(0);
  const [gravelCubicFeet, setGravelCubicFeet] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [landCost, setLandCost] = useState(0);
  const [userAddress, setUserAddress] = useState('');
  const [rentEstimate, setRentEstimate] = useState('');

  // Estimates for each category
  const estimates = {
    '5Marla': {
      cementBags: 100,
      steelKg: 500,
      sandCubicFeet: 300,
      gravelCubicFeet: 200
    },
    '10Marla': {
      cementBags: 200,
      steelKg: 1000,
      sandCubicFeet: 600,
      gravelCubicFeet: 400
    }
    // Add more categories if needed
  };

  useEffect(() => {
    if (category !== '') {
      fetchLandCost(category)
        .then((cost) => setLandCost(cost))
        .catch((error) => console.error('Error fetching land cost:', error));

      // Set default values based on selected category
      if (estimates[category]) {
        setCementBags(estimates[category].cementBags);
        setSteelKg(estimates[category].steelKg);
        setSandCubicFeet(estimates[category].sandCubicFeet);
        setGravelCubicFeet(estimates[category].gravelCubicFeet);
      }
    }
    getUserLocation();
  }, [category]);

  const fetchLandCost = async (category) => {
    const response = await axios.get(`https://example.com/land-cost?category=${category}&apikey=YOUR_API_KEY`);
    return response.data.cost;
  };

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=YOUR_GOOGLE_MAPS_API_KEY`);
          setUserAddress(response.data.results[0].formatted_address);
          estimateRent(response.data.results[0].formatted_address);
        } catch (error) {
          console.error('Error fetching user location:', error);
        }
      }, (error) => {
        console.error('Error getting user location:', error);
      });
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };

  const estimateRent = async (address) => {
    const options = {
      method: 'GET',
      url: 'https://realtymole-rental-estimate-v1.p.rapidapi.com/rentalPrice',
      params: {
        address: address,
        propertyType: 'Single Family',
        bedrooms: '4',
        bathrooms: '2',
        squareFootage: '1600',
        compCount: '5'
      },
      headers: {
        'X-RapidAPI-Key': 'f6222898b6mshdb0233946d2cd8ap1e2088jsn03caa0ae2021',
        'X-RapidAPI-Host': 'realtymole-rental-estimate-v1.p.rapidapi.com'
      }
    };

    try {
      const response = await axios.request(options);
      setRentEstimate(response.data);
    } catch (error) {
      console.error('Error estimating rent:', error);
    }
  };

  const calculateCost = () => {
    let cementCost = 0;
    let steelCost = 0;
    let sandCost = 0;
    let gravelCost = 0;

    switch (materialType) {
      case 'TypeA':
        cementCost = cementBags * 500;
        steelCost = steelKg * 100;
        sandCost = sandCubicFeet * 50;
        gravelCost = gravelCubicFeet * 40;
        break;
      case 'TypeB':
        cementCost = cementBags * 600;
        steelCost = steelKg * 120;
        sandCost = sandCubicFeet * 60;
        gravelCost = gravelCubicFeet * 50;
        break;
      default:
        break;
    }

    const total = cementCost + steelCost + sandCost + gravelCost + landCost;
    setTotalCost(total);
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="container">
        <div className="text-center mb-4">
          <h1 className='orangeText'> Construction Cost Calculator</h1>
          <p className='primaryText'>Calculate the cost of construction materials for different categories and material types</p>
        </div>
        <div className="row">
          <div className="col-lg-6">
            <div className="card mb-4">
              <div className="card-body">
                <h5 className="card-title">Price Calculator</h5>
                <form>
                  <div className="mb-3">
                    <label className="form-label">Select Category</label>
                    <select
                      className="form-control"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      <option value="">Select Category</option>
                      <option value="5Marla">5 Marla</option>
                      <option value="10Marla">10 Marla</option>
                      {/* Add options for other categories */}
                    </select>
                  </div>
                  {category && estimates[category] && (
                    <div className="mb-3">
                      <p>Estimated Materials for {category}:</p>
                      <ul>
                        <li>Cement Bags: {estimates[category].cementBags}</li>
                        <li>Steel (Kg): {estimates[category].steelKg}</li>
                        <li>Sand (Cubic Feet): {estimates[category].sandCubicFeet}</li>
                        <li>Gravel (Cubic Feet): {estimates[category].gravelCubicFeet}</li>
                      </ul>
                    </div>
                  )}
                  <div className="mb-3">
                    <label className="form-label">Select Material Type</label>
                    <select
                      className="form-control"
                      value={materialType}
                      onChange={(e) => setMaterialType(e.target.value)}
                    >
                      <option value="">Select Material Type</option>
                      <option value="TypeA">Type A</option>
                      <option value="TypeB">Type B</option>
                      {/* Add options for other material types */}
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Cement Bags</label>
                    <input
                      type="number"
                      className="form-control"
                      value={cementBags}
                      onChange={(e) => setCementBags(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Steel (Kg)</label>
                    <input
                      type="number"
                      className="form-control"
                      value={steelKg}
                      onChange={(e) => setSteelKg(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Sand (Cubic Feet)</label>
                    <input
                      type="number"
                      className="form-control"
                      value={sandCubicFeet}
                      onChange={(e) => setSandCubicFeet(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Gravel (Cubic Feet)</label>
                    <input
                      type="number"
                      className="form-control"
                      value={gravelCubicFeet}
                      onChange={(e) => setGravelCubicFeet(e.target.value)}
                    />
                  </div>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={calculateCost}
                  >
                    Calculate
                  </button>
                </form>
                {totalCost > 0 && (
                  <div className="mt-3">
                    <h5>Total Cost: PKR {totalCost}</h5>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="col-lg-6 d-flex justify-content-center align-items-center">
            <div className="image-container mb-4 mb-lg-0">
              <img src='imagestruct.jpg' alt='Construction' className="img-fluid" />
            </div>
          </div>
        </div>
        {userAddress && (
          <div className="container mt-4">
            <div className="text-center">
              <h5>Estimated Rent for your location:</h5>
              <p>{rentEstimate}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PriceCal;
