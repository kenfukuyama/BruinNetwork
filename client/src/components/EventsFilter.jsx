

import React from 'react'

import IconButton from '@mui/material/IconButton';

// import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import SortByAlphaIcon from '@mui/icons-material/SortByAlpha';
import BackspaceIcon from '@mui/icons-material/Backspace';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
// import { useNavigate } from 'react-router-dom';





const EventsFilter = ({setFilter}) => {
    // const navigate = useNavigate();
    return (
        <div className="navigation-icons d-flex justify-content-center align-items-center gap-5">
            <IconButton color="info" onClick={() => setFilter("SortByTitle")}>
                <SortByAlphaIcon fontSize="medium" />
            </IconButton>

            <IconButton color="info" onClick={() => setFilter("SortByDateAscending")}>
                <FormatListNumberedIcon fontSize="medium" />
            </IconButton>
            
            <IconButton onClick={() => setFilter("Reset")}>
                <BackspaceIcon fontSize="small" />
            </IconButton>
        </div>
    )
}

export default EventsFilter;