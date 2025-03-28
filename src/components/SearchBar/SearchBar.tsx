import React, { useState } from "react";
import "./SearchBar.css";

const SearchBar: React.FC<{ onSearch?: any }> = ({ onSearch }) => {
  const [searchText, setSearchText] = useState("");
  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && onSearch) {
      onSearch(searchText);
    }
  };
  return (
    <div className="search-bar">
      <i className="fa-light fa-search"></i>
      <input
        type="text"
        placeholder="Search product here"
        onKeyDown={handleSearch}
        value={searchText}
        onChange={(e) => {
          setSearchText(e.target.value);
          if (e.target.value === "") {
            onSearch("");
          }
        }}
      />
      <i
        className="fa-light fa-xmark"
        onClick={() => {
          setSearchText("");
          onSearch("");
        }}
      ></i>
    </div>
  );
};

export default SearchBar;
