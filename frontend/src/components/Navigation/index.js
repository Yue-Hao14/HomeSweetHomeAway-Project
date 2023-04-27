// frontend/src/components/Navigation/index.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  return (
    <div className='navigation'>
      <div className='logo'>
        <NavLink exact to="/">
          <i className="fa-solid fa-house" />
          <span>HomeSweetHomeAway</span>
        </NavLink>
      </div>
      <div className='right-container'>
        {isLoaded && sessionUser &&
            <NavLink exact to="/spots/new">Create a New Spot</NavLink>
        }
        {isLoaded && (
            <ProfileButton user={sessionUser} />
        )}
      </div>
    </div>
  );
}

export default Navigation;
