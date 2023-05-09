// frontend/src/components/Navigation/index.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  return (
    <div className="nav-bar">

      <NavLink exact to="/" style={{ textDecoration: "none", fontWeight: "bold", color: "#fd4556"}}>

      <img id="logo-word" src="https://i.imgur.com/Anomg9X.png" style={{ height: "50px", marginLeft: "50px" }} alt="logo"></img>

      </NavLink>

      {isLoaded && (
        <ProfileButton user={sessionUser} />
      )}
    </div>
  );
}

export default Navigation;
