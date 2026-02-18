import { useState, useCallback } from "react";
import { Box, InputBase, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import {
  searchContainerSx,
  searchInputSx,
  searchButtonSx,
} from "../../styles/sharedGeneralStyles";

const SearchBar = ({ onSearch, placeholder = "Search..." }) => {
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = useCallback(() => {
    if (searchValue.trim()) {
      onSearch(searchValue.trim());
    }
  }, [searchValue, onSearch]);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Enter") {
        handleSearch();
      }
    },
    [handleSearch],
  );

  return (
    <Box sx={searchContainerSx}>
      <InputBase
        value={searchValue}
        onChange={({target : {value}}) => setSearchValue(value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        sx={searchInputSx}
      />
      <IconButton onClick={handleSearch} sx={searchButtonSx}>
        <SearchIcon sx={{ fontSize: 24 }} />
      </IconButton>
    </Box>
  );
};

export default SearchBar;
