import React from 'react';
import { Dropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

const ProfileMenu = ({ user, logout }) => {
  const navigate = useNavigate()
  return (
    <Dropdown>
      <Dropdown.Toggle variant="light" id="dropdown-basic">
        <img src={user?.image} alt="user" className="rounded-circle" style={{ width: '40px', height: '40px' }} />
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={()=> navigate("./favourites", {replace: true})}>Favourites</Dropdown.Item>
        <Dropdown.Item onClick={()=> navigate("./bookings", {replace: true})}>Bookings</Dropdown.Item>
       <Dropdown.Item onClick={()=>{
        localStorage.clear();
        logout();
       }}>Logout</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default ProfileMenu;
