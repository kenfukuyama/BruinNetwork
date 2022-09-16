

import React from 'react'
import { useNavigate } from 'react-router-dom';
import Badge from '@mui/material/Badge';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import WhatshotIcon from '@mui/icons-material/Whatshot';



const NotificationsNavigation = ({spiritsGivenCounts ,inviationCounts}) => {
    const navigate = useNavigate();
    return (
        <div className="navigation-icons d-flex justify-content-center align-items-center gap-5">
            <Badge badgeContent={spiritsGivenCounts} color="warning" onClick={(e) => navigate('/users/notifications/spirits')}  style={{cursor : "pointer"}}>
                <WhatshotIcon fontSize="medium" color="action" />
            </Badge>
            <Badge badgeContent={inviationCounts} color="success" onClick={(e) => navigate('/users/notifications/requests')}  style={{cursor : "pointer"}}>
                <PersonAddIcon fontSize="medium" color="action" />
            </Badge>

        </div>
    )
    
}

export default NotificationsNavigation;