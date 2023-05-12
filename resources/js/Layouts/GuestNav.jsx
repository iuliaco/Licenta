import PropTypes from 'prop-types';
import BellIcon from '@heroicons/react/24/solid/BellIcon';
import UsersIcon from '@heroicons/react/24/solid/UsersIcon';
import Bars3Icon from '@heroicons/react/24/solid/Bars3Icon';
import MagnifyingGlassIcon from '@heroicons/react/24/solid/MagnifyingGlassIcon';
import {
  Avatar,
  Badge,
  Box,
  IconButton,
  Stack,
  SvgIcon,
  Tooltip,
  useMediaQuery,
  Typography,
  Button
} from '@mui/material';

import { alpha } from '@mui/material/styles';
import { usePopover } from './../hooks/use-popover';
import { AccountPopover } from './AccountPopover';
import { Link } from '@inertiajs/react';

const SIDE_NAV_WIDTH = 280;
const TOP_NAV_HEIGHT = 64;

export const GuestNav = (props) => {
  const { auth, onNavOpen } = props;
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  const accountPopover = usePopover();

  return (
    <>
      <Box
        component="header"
        sx={{
          backdropFilter: 'blur(6px)',
          backgroundColor: (theme) => alpha(theme.palette.background.default, 0.8),
          position: 'sticky',
          top: 0,
          width: '100%',
          zIndex: (theme) => theme.zIndex.appBar
        }}
      >
        <Stack
          alignItems="center"
          direction="row"
          justifyContent="space-between"
          spacing={2}
          sx={{
            minHeight: TOP_NAV_HEIGHT,
            px: 2
          }}
        >
            <Stack
            alignItems="center"
            direction="row"
            spacing={2}
            />
            
          <Stack
            alignItems="center"
            direction="row"
            spacing={2}
          >
            <Box
            sx={{
            py: 1.5,
            px: 2
            }}
            >
        {(!auth || !auth.user) &&
        <>
        <Link href={route('login')}>
            <Button   style={{
                color: "#1C2536",
            }}>
                <Typography variant="overline">
                Login
                </Typography>
            </Button>
        </Link>
        <Link href={route('register')}>
            <Button   style={{
                color: "#1C2536",
            }}>
                <Typography variant="overline">
                Register
                </Typography>
            </Button>
        </Link>
        <Link href={route('welcome')}>
            <Button   style={{
                color: "#1C2536",
            }}>
                <Typography variant="overline">
                Landing page
                </Typography>
            </Button>
        </Link>
        </>
        }
        {auth && auth.user &&
        <>
        <Link href={route('dashboard')}>
            <Button   style={{
                color: "#1C2536",
            }}>
                <Typography variant="overline">
                Dashboard
                </Typography>
            </Button>
        </Link>
        </>
        }
        </Box>
            { auth && auth.user &&
            <Avatar
              onClick={accountPopover.handleOpen}
              ref={accountPopover.anchorRef}
              sx={{
                cursor: 'pointer',
                height: 40,
                width: 40
              }}
              src="/assets/avatars/avatar-anika-visser.png"
            />
            }
          </Stack>
        </Stack>
      </Box>
      { auth && auth.user &&
      <AccountPopover
        auth={auth}
        anchorEl={accountPopover.anchorRef.current}
        open={accountPopover.open}
        onClose={accountPopover.handleClose}
      />
    }
    </>
  );
};

GuestNav.propTypes = {
  onNavOpen: PropTypes.func
};