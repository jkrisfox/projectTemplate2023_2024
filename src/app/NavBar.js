import { usePathname } from 'next/navigation';
import { Box, Button } from '@mui/material';
import Link from 'next/link';
import React from 'react';
 
export default function NavBar() {
  const pathname = usePathname();
  const links = [
    { path: '/', name: 'Home' },
    { path: '/profile', name: 'Profile' },
    { path: '/events', name: 'Events' },
    { path: '/equipment', name: 'Equipment' },
    { path: '/forum', name: 'Forum' },
    { path: '/login', name: 'Login'}
  ];

  return (
    <Box className="navbar-container">
      {links.map((l) => {
        const isActive = l.path === pathname;
        return (
          <Button
            component={Link}
            href={l.path}
            className={`navbar-button ${isActive ? 'active' : ''}`}
            key={l.path}
          >
            {l.name}
          </Button>
        );
      })}
    </Box>
  );
}
