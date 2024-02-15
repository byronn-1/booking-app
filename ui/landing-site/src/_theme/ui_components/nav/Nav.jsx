import React from 'react';
import { useMediaQuery } from '@chakra-ui/react';
import MobileNav from './components/MobileNav';
import SideNav from './components/SideNav';

const Nav = () => {
  const [isMobile] = useMediaQuery(`(max-width: 30em)`);
  const [isTablet] = useMediaQuery(`(max-width: 80em)`);

  if (isMobile) {
    return <MobileNav />;
  }

  return <SideNav isTablet={isTablet} />;
};

export default Nav;
