


import React from 'react'

// * icon selections
import AdbIcon from '@mui/icons-material/Adb';
import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive';
import SportsBaseballIcon from '@mui/icons-material/SportsBaseball';
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';
import SportsVolleyballIcon from '@mui/icons-material/SportsVolleyball';
import SportsTennisIcon from '@mui/icons-material/SportsTennis';
import PedalBikeIcon from '@mui/icons-material/PedalBike';
import HailIcon from '@mui/icons-material/Hail';
import SportsBarIcon from '@mui/icons-material/SportsBar';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import Face3Icon from '@mui/icons-material/Face3';
import Face2Icon from '@mui/icons-material/Face2';
import FaceIcon from '@mui/icons-material/Face';
import SickIcon from '@mui/icons-material/Sick';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon';



const AvatarIcon = ({ iconValue, color }) => {
    const iconsList = {
        AccountCircleIcon: AccountCircleIcon,
        AdbIcon: AdbIcon,
        AirplanemodeActiveIcon: AirplanemodeActiveIcon,
        SportsBaseballIcon: SportsBaseballIcon,
        SportsBasketballIcon : SportsBasketballIcon,
        SportsVolleyballIcon : SportsVolleyballIcon,
        SportsTennisIcon : SportsTennisIcon,
        PedalBikeIcon : PedalBikeIcon,
        HailIcon : HailIcon,
        SportsBarIcon : SportsBarIcon,
        SportsEsportsIcon : SportsEsportsIcon,
        Face3Icon : Face3Icon,
        Face2Icon : Face2Icon,
        SickIcon : SickIcon,
        CatchingPokemonIcon : CatchingPokemonIcon
    }
    // console.log("you selected "  + iconValue);

    const AvatarIcon = iconsList[iconValue || 'AccountCircleIcon']
    return (
        <AvatarIcon fontSize="medium" sx={{ color: color }} />
    )
}

export default AvatarIcon;