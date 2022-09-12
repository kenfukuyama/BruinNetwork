

import React from 'react'

import IconButton from '@mui/material/IconButton';

import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import ExploreIcon from '@mui/icons-material/Explore';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import { useNavigate } from 'react-router-dom';




const FriendsNavigation = () => {
    const navigate = useNavigate();

    return (
        <div className="navigation-icons d-flex justify-content-center align-items-center gap-5">
            <IconButton onClick={(e) => navigate('/users/friends')}>
                <PeopleAltIcon fontSize="medium" />
            </IconButton>
            <IconButton onClick={(e) => navigate('/users/friends/pending')}>
                <NotificationsActiveIcon fontSize="medium" />
            </IconButton>
            <IconButton onClick={(e) => navigate('/users')}>
                <ExploreIcon fontSize="medium" />
            </IconButton>
        </div>
    )
}

export default FriendsNavigation