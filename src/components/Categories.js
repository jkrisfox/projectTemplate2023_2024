// components/Categories.js
import React from 'react';
import { Paper, Chip, Stack } from '@mui/material';
import { useRouter } from 'next/navigation'; // Note: Update this import to match your routing library if needed.

const Categories = () => {
  const categories = [
    "Furniture",
    "Electronics",
    "School Supplies",
    "Home Decor",
    "Clothing and Accessories",
    "Appliances",
    "Bicycles and Transportation",
    "Textbooks",
    "Sports and Fitness Equipment",
    "Home Office",
    "Miscellaneous",
  ];

  const router = useRouter();

  const handleCategoryClick = (category) => {
    router.push(`/search?query=${category}`);
  };

  return (
    <Paper elevation={0} sx={{ p: 2, backgroundColor: 'transparent', overflow: 'auto' }}>
      <Stack direction="row" spacing={1} justifyContent="flex-start" alignItems="center" sx={{ gap: { xs: '10px', sm: '20px' }, justifyContent: 'center', flexWrap: 'wrap' }}>
        {categories.map((category, index) => (
          <Chip
            key={index}
            label={category}
            onClick={() => handleCategoryClick(category)}
            sx={{
              fontSize: '0.875rem',
              fontWeight: 'bold',
              backgroundColor: '#f5f5f5',
              color: '#2B7257', // Use the color for text
              // borderColor: '#2B7257', // Use the color for border
              // '&:hover': {
              //   backgroundColor: '#e0e0e0',
              //   color: '#ffffff', // Change text color on hover if desired
              // },
              '&.MuiChip-root': {
                marginRight: 0, // Reset the margin to fix alignment
                marginBottom: '5px', // Add space below chips for wrapping
              },
            }}
            variant="outlined"
          />
        ))}
      </Stack>
    </Paper>
  );
};

export default Categories;
