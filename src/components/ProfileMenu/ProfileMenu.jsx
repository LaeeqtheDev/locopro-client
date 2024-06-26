import React from 'react';
import { Dropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

const ProfileMenu = ({ user, logout }) => {
  const navigate = useNavigate();

  const handleFavouritesClick = () => {
    navigate("/favourites", { replace: true });
  };

  const handleBookingsClick = () => {
    navigate("/bookings", { replace: true });
  };

  const handleLogoutClick = () => {
    localStorage.clear(); // Clear local storage or any other necessary cleanup
    logout(); // Call logout function provided by Auth0 or your authentication service
  };

  return (
    <Dropdown>
      <Dropdown.Toggle variant="light" id="dropdown-basic">
        <img src={user?.picture} alt="user" className="rounded-circle" style={{ width: '40px', height: '40px' }} />
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={handleFavouritesClick}>Favourites</Dropdown.Item>
        <Dropdown.Item onClick={handleBookingsClick}>Bookings</Dropdown.Item>
        <Dropdown.Item onClick={handleLogoutClick}>Logout</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default ProfileMenu;
