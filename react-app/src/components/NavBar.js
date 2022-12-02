
import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import { useSelector } from 'react-redux';
const NavBar = () => {
  const currentUser= useSelector(state=>state.session.user)
  return (
    // <div className='navbar-outer'>
    <nav>
      <div>
        <div>
          <NavLink to='/' exact={true} activeClassName='active'>
            Home
          </NavLink>
        </div>
        <div>
          <NavLink to='/login' exact={true} activeClassName='active'>
            Login
          </NavLink>
        </div>
        <div>
          <NavLink to='/sign-up' exact={true} activeClassName='active'>
            Sign Up
          </NavLink>
        </div>
        {/* <div>
          <NavLink to='/users' exact={true} activeClassName='active'>
            Users
          </NavLink>
        </div> */}
        <div>
          <NavLink to='/cart' exact={true} activeClassName='active'>
            CART
          </NavLink>
        </div>
        <div>
          <NavLink to='/library' exact={true} activeClassName='active'>
            LIBRARY
          </NavLink>
        </div>
        <div>
          <LogoutButton />
        </div>
      </div>
    </nav>
    // {currentUser && currentUser.name}
    // </div>
  );
}

export default NavBar;
