import { TextField } from "@mui/material";
import React from "react";

const FilterBar = ({ filter, setFilter }) => {
    return (
        <span>
            <TextField
                id="outlined-basic"
                label="Outlined"
                variant="outlined"
                value={filter || ""}
                onChange={(e) => setFilter(e.target.value)}
            />
        </span>
    );
};

export default FilterBar;
