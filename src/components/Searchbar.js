// components/SearchBar.js
import React, { useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import app from '../../firebase/firebaseConfig'

// Styled components using MUI's styled utility for custom styles
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  color: "white",
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  fontWeight: "bold",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // Vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "60ch",
    },
  },
}));

// SearchBar component
const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const router = useRouter();
  
    const handleInputChange = (event) => {
      setSearchTerm(event.target.value);
    };
  
    const handleSearch = (event) => {
      event.preventDefault(); // prevent the default form submission
      router.push(`/search?query=${encodeURIComponent(searchTerm)}`); // navigate to the search page with the query parameter
    };
  
    return (
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <form onSubmit={handleSearch}>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
            value={searchTerm}
            onChange={handleInputChange}
          />
        </form>
      </Search>
    );
  };
  
  export default SearchBar;