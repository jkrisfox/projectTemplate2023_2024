import React, { useEffect, useState } from "react";
import { Stack } from "@mui/system";
import { Paper, Box, Typography } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';

export default function FilterFriends({ friendList }) {
  return (
    <Box sx={{ width: "80%" }}>
      <Stack
        spacing={2}
        sx={{
          width: "100%",
          maxHeight: 500,
        }}
      >
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "stretch",
          }}
        >
          {friendList.map((item) => (
            <Paper
              key={item.id}
              sx={{
                textAlign: "left",
                // margin: ""
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  margin: "0 20px",
                }}
              >
                <Typography
                  style={{ display: "flex", alignItems: "center", height: 70 }}
                >
                  {item.image} - {item.name}
                </Typography>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: "20%",
                  }}
                >
                  <Typography
                    style={{
                      display: "flex",
                      alignItems: "center",
                      height: 70,
                    }}
                  >
                    <IconButton
                      color="primary"
                      aria-label="add to shopping cart"
                    >
                      <AddIcon />
                    </IconButton>
                  </Typography>
                  <Typography
                    style={{
                      display: "flex",
                      alignItems: "center",
                      height: 70,
                    }}
                  >
                    {item.status}
                  </Typography>
                </div>
              </div>
            </Paper>
          ))}
        </div>
      </Stack>
    </Box>
  );
}
