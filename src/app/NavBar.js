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
    { path: '/forums', name: 'Forums' },
    { path: '/login', name: 'Login'}
  ];

  return (
    <Box className="navbar-container">
      {links.map((l) => {
        const isActive = l.path === pathname;
        return (
          <Link
            component={Link}
            href={l.path}
            className={`navbar-button ${isActive ? 'active' : ''}`}
            key={l.path}
          >
            {l.name}
          </Link>
        );
      })}
    </Box>
  );
}
