

import React from 'react'

import IconButton from '@mui/material/IconButton';

import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import ExploreIcon from '@mui/icons-material/Explore';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import { useNavigate } from 'react-router-dom';
import Badge from '@mui/material/Badge';




const FriendsNavigation = ({inviationCounts}) => {
    const navigate = useNavigate();
    return (
        <div className="navigation-icons d-flex justify-content-center align-items-center gap-5">
            <IconButton onClick={(e) => navigate('/users/friends')}>
                <PeopleAltIcon fontSize="medium" />
            </IconButton>
            <Badge badgeContent={inviationCounts} color="warning" onClick={(e) => navigate('/users/friends/pending')}>
                <NotificationsActiveIcon fontSize="medium" color="action" />
            </Badge>
            <IconButton onClick={(e) => navigate('/users')}>
                <ExploreIcon fontSize="medium" />
            </IconButton>
        </div>
    )
}

export default FriendsNavigation;