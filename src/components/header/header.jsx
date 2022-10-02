import React from 'react';
import './header.scss';

function Header({ children }) {
  return <header className='header'>{children}</header>;
}

export default Header;
