import ChartBarIcon from '@heroicons/react/24/solid/ChartBarIcon';
import CogIcon from '@heroicons/react/24/solid/CogIcon';
import LockClosedIcon from '@heroicons/react/24/solid/LockClosedIcon';
import ShoppingBagIcon from '@heroicons/react/24/solid/ShoppingBagIcon';
import UserIcon from '@heroicons/react/24/solid/UserIcon';
import UserPlusIcon from '@heroicons/react/24/solid/UserPlusIcon';
import UsersIcon from '@heroicons/react/24/solid/UsersIcon';
import XCircleIcon from '@heroicons/react/24/solid/XCircleIcon';
import { SvgIcon } from '@mui/material';
import PlusCircleIcon from '@heroicons/react/24/solid/PlusCircleIcon';
import ViewfinderCircleIcon from '@heroicons/react/24/solid/ViewfinderCircleIcon';
import Bars3Icon from '@heroicons/react/24/solid/Bars3Icon';
import InboxIcon from '@heroicons/react/24/solid/InboxIcon';
import StarIcon from '@heroicons/react/24/solid/StarIcon';
import ChatBubbleBottomCenterTextIcon from '@heroicons/react/24/solid/ChatBubbleBottomCenterTextIcon';
export const items = [
  {
    title: 'Overview',
    path: '/dashboard',
    icon: (
    <SvgIcon fontSize="small">
        <ViewfinderCircleIcon />
      </SvgIcon>
    )
  },
  // {
  //   title: 'Safety',
  //   path: '/safety',
  //   icon: (
  //     <SvgIcon fontSize="small">
  //       <UsersIcon />
  //     </SvgIcon>
  //   )
  // },
  {
    title: 'Add a new trip',
    path: '/add-trip',
    icon: (
      <SvgIcon fontSize="small">
        <PlusCircleIcon />
      </SvgIcon>
    )
  },
  {
    title: 'View all trips',
    path: '/view-trips',
    icon: (
      <SvgIcon fontSize="small">
        <Bars3Icon />
      </SvgIcon>
    )
  },
  {
    title: 'Flight Price Analysis',
    path: '/flight-price',
    icon: (
      <SvgIcon fontSize="small">
        <ShoppingBagIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Best attractions',
    path: '/best-attractions',
    icon: (
      <SvgIcon fontSize="small">
        <StarIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Settings',
    path: '/settings',
    icon: (
      <SvgIcon fontSize="small">
        <CogIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Profile',
    path: '/profile',
    icon: (
      <SvgIcon fontSize="small">
        <UserIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Messages',
    path: '/messages',
    icon: (
      <SvgIcon fontSize="small">
        <InboxIcon />
      </SvgIcon>
    )
  },
  {
    title: 'User Reviews',
    path: '/reviews',
    icon: (
      <SvgIcon fontSize="small">
        <ChatBubbleBottomCenterTextIcon />
      </SvgIcon>
    )
  },
  // {
  //   title: 'Login',
  //   path: '/login',
  //   icon: (
  //     <SvgIcon fontSize="small">
  //       <LockClosedIcon />
  //     </SvgIcon>
  //   )
  // },
  // {
  //   title: 'Register',
  //   path: '/auth/register',
  //   icon: (
  //     <SvgIcon fontSize="small">
  //       <UserPlusIcon />
  //     </SvgIcon>
  //   )
  // },
  // {
  //   title: 'Error',
  //   path: '/404',
  //   icon: (
  //     <SvgIcon fontSize="small">
  //       <XCircleIcon />
  //     </SvgIcon>
  //   )
  // }
];