import React from 'react';
import { HEADER_CONFIG } from './headerConfig';
import HeaderClient from './HeaderClient';

const Header = () => {
  return <HeaderClient navLinks={HEADER_CONFIG.navLinks} />;
};

export default Header;