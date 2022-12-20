
import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import { useSelector } from 'react-redux';


import "./navbar.css"
const NavBar = () => {
  const history = useHistory()
  // const [loginDropDown, setLoginDropDown] = useState(false)
  const [userDropdown, setUserDropdown] = useState(false)
  // console.log("DROPDOWN STATUS L", userDropdown)
  const currentUser = useSelector(state => state.session.user)
  function loginRedirect() {
    history.push('/login')
  }
  function storeRedirect() {
    history.push('/')
  }
  function redirectToLinkedIn() {
    window.location.assign("https://www.linkedin.com/in/jason-arnold-539005183/")
  }
  function redirectToGithub() {
    window.location.assign("https://github.com/QuantitativeSneezing")
  }
  return (
    <div className='navbar-outer'>
      <div className='navbar-group'>
        <div className='header' onClick={storeRedirect}>
          Store
        </div>
        <div className='header' onClick={redirectToGithub}>
          Jason's Github
        </div>
        <div className='header' onClick={redirectToLinkedIn}>
          Jason's LinkedIn
        </div>

      </div>
      {currentUser && (
        <div className='user-container-area'
          onMouseEnter={() => setUserDropdown(true)}
          onMouseLeave={() => setUserDropdown(false)}>
          <div className='menu-button'> {currentUser.username}</div>
          <div>

          </div>
          {userDropdown && (
            <div className='hovering'>
              <div>
                <NavLink to='/' exact={true} activeClassName="menu-button" className="menu-button">
                  Home
                </NavLink>
              </div>

              <div>
                <NavLink to='/cart' exact={true} activeClassName="menu-button" className="menu-button">
                  Cart
                </NavLink>
              </div>
              <div>
                <NavLink to='/library' exact={true} activeClassName="menu-button" className="menu-button">
                  Library
                </NavLink>
              </div>
              <div>
                <NavLink to='/friends' exact={true} activeClassName="menu-button" className="menu-button">
                  Friends
                </NavLink>
              </div>
              <div>
                <LogoutButton />
              </div>
            </div>)}
        </div>


      )}
      {!currentUser && (
        <div className='userless-container-area'
          onMouseEnter={() => setUserDropdown(true)}
          onMouseLeave={() => setUserDropdown(false)}>
          <div className='menu-button' onClick={loginRedirect}>Login</div>
          <div>
            <NavLink to='/sign-up' exact={true} activeClassName="menu-button" className="menu-button">
              Sign Up
            </NavLink>
          </div>
        </div>
      )}
    </div>
  );
}

export default NavBar;
