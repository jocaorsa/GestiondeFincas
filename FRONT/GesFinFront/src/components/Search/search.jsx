import React from "react";
import { TextField } from "@material-ui/core";

const TableSearch = ({ searchQuery, handleSearchChange }) => {
  return (
    <TextField
      label="Search"
      value={searchQuery}
      onChange={handleSearchChange}
    />
  );
};

export default TableSearch;
