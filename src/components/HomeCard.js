// components/HomeCard.js
import React from 'react';
import { Box, Typography, Badge } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';

// The props are destructured in the function parameter list for ease of use.
function HomeCard({ title, location, price, imageUrl, status, address }) {
  return (
    <Box sx={{
      width: '100%',
      borderRadius: '8px',
      overflow: 'hidden',
      cursor: 'pointer',
      // boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.1)',
    }}>
      <Box sx={{
        position: 'relative',
        width: '100%',
        paddingTop: '56.25%', // 16:9 aspect ratio
      }}>
        <img
          src={imageUrl} // Using imageUrl prop
          alt={title} // Using title prop for the alt text
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            borderRadius: '8px',
            boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'
          }}
        />
      </Box>
      <Box sx={{ padding: 2 }}>
        <Typography variant="h6">{title}</Typography> {/* Using title prop */}
        <Typography variant="subtitle1" color="textSecondary" sx={{ marginBottom: 1 }}>
          {location} {/* Using location prop */}
        </Typography>
        <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: 1 }}>
          {`$${price}`} {/* Using price prop */}
        </Typography>
        {status && ( // Only display the badge if status is provided
          <Badge color="success" overlap="circular" sx={{ marginRight: 1 }}>
            <Typography variant="caption">{status.toUpperCase()}</Typography> {/* Using status prop */}
          </Badge>
        )}
        <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 1 }}>
          <LocationOnIcon fontSize="small" color="primary" />
          <Typography variant="caption" color="textSecondary" sx={{ marginLeft: 1 }}>
            {location} {/* Using address prop */}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default HomeCard;
