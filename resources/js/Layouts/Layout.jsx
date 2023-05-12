import { useCallback, useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import { SideNav } from './SideNav';
import { TopNav } from './TopNav';
import { GuestNav } from './GuestNav';
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@/theme/index';

const SIDE_NAV_WIDTH = 280;



const LayoutRoot = styled('div')(({ theme }) => ({
  display: 'flex',
  flex: '1 1 auto',
  maxWidth: '100%',
  [theme.breakpoints.up('lg')]: {
    paddingLeft: SIDE_NAV_WIDTH
  }
}));

const LayoutContainer = styled('div')({
  display: 'flex',
  flex: '1 1 auto',
  flexDirection: 'column',
  width: '100%'
});

export const Layout = ((props) => {
  const { auth, children } = props;
  const [openNav, setOpenNav] = useState(false);
  const theme = createTheme();

  return (
    <>
    <ThemeProvider theme={theme}>
    
      {route().current() == "login" || route().current() == "register" ||  route().current() == "welcome" ||  route().current() == "password.request"  ? 
      <GuestNav auth={auth} onNavOpen={() => setOpenNav(true)}  /> :
      <>
        <TopNav auth={auth} onNavOpen={() => setOpenNav(true)} />
        <SideNav auth={auth}
          onClose={() => setOpenNav(false)}
          open={openNav}
        />
      </>
    }

    {route().current() == "login" || route().current() == "register" ||  route().current()  == "welcome" || route().current() == "password.request"  ? 
      <>
      {children} 
      </>
      :
      <>
        <LayoutRoot theme={theme}>
        <LayoutContainer>
          {children}
        </LayoutContainer>
      </LayoutRoot>
      </>
    }
     
    </ThemeProvider>
    </>
  );
});