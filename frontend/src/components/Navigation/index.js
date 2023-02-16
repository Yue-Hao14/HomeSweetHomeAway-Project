// frontend/src/components/Navigation/index.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  return (
    <ul className='navigation'>
      <div className='logo'>
        <NavLink exact to="/">
          <i class="fa-solid fa-house" />
        </NavLink>
        <span>HomeSweetHomeAway</span>
      </div>
      <div className='creat-profile-container'>
      {isLoaded && sessionUser &&
        <div>
          <NavLink exact to="/spots/new">Create a New Spot</NavLink>
        </div>
      }
      {isLoaded && (
        <ul>
          <ProfileButton user={sessionUser} />
        </ul>
      )}
      </div>
    </ul>
  );
}

export default Navigation;
