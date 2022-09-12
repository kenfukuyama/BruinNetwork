

import React from 'react'

import IconButton from '@mui/material/IconButton';

import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { useNavigate } from 'react-router-dom';





const EventsNavigation = ({inviationCounts}) => {
    const navigate = useNavigate();
    return (
        <div className="navigation-icons d-flex justify-content-center align-items-center gap-5">
            <IconButton color="info" onClick={(e) => navigate('/myevents/saved')}>
                <BookmarkIcon fontSize="medium" />
            </IconButton>

            <IconButton color="info" onClick={(e) => navigate('/myevents/posted')}>
                <LibraryBooksIcon fontSize="medium" />
            </IconButton>
        </div>
    )
}

export default EventsNavigation;