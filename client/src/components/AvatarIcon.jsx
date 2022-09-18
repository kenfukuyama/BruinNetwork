


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

import AirplanemodeInactiveIcon from '@mui/icons-material/AirplanemodeInactive';
import AndroidIcon from '@mui/icons-material/Android';
import AppleIcon from '@mui/icons-material/Apple';
import ArchitectureIcon from '@mui/icons-material/Architecture';
import BalanceIcon from '@mui/icons-material/Balance';
import BatteryCharging20Icon from '@mui/icons-material/BatteryCharging20';
import BatteryCharging80Icon from '@mui/icons-material/BatteryCharging80';
import BatteryChargingFullIcon from '@mui/icons-material/BatteryChargingFull';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import CampaignIcon from '@mui/icons-material/Campaign';
import CellTowerIcon from '@mui/icons-material/CellTower';
import CloudCircleIcon from '@mui/icons-material/CloudCircle';
import DiningIcon from '@mui/icons-material/Dining';
import Diversity2Icon from '@mui/icons-material/Diversity2';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import Diversity1Icon from '@mui/icons-material/Diversity1';
import EngineeringIcon from '@mui/icons-material/Engineering';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import GitHubIcon from '@mui/icons-material/GitHub';
import HouseboatIcon from '@mui/icons-material/Houseboat';
import LanguageIcon from '@mui/icons-material/Language';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import LocalFloristIcon from '@mui/icons-material/LocalFlorist';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import NightsStayIcon from '@mui/icons-material/NightsStay';
import NordicWalkingIcon from '@mui/icons-material/NordicWalking';
import PetsIcon from '@mui/icons-material/Pets';
import PsychologyIcon from '@mui/icons-material/Psychology';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import SelfImprovementIcon from '@mui/icons-material/SelfImprovement';
import SportsFootballIcon from '@mui/icons-material/SportsFootball';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import SuperscriptIcon from '@mui/icons-material/Superscript';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import SwipeRightIcon from '@mui/icons-material/SwipeRight';
import TranslateIcon from '@mui/icons-material/Translate';





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
        FaceIcon : FaceIcon,
        SickIcon : SickIcon,
        CatchingPokemonIcon : CatchingPokemonIcon,
        AirplanemodeInactiveIcon :  AirplanemodeInactiveIcon,
        AndroidIcon :AndroidIcon,
        AppleIcon: AppleIcon,
        ArchitectureIco :ArchitectureIcon,
        BalanceIco: BalanceIcon,
        BatteryCharging20Ico: BatteryCharging20Icon,
        BatteryCharging80Ico: BatteryCharging80Icon,
        BatteryChargingFullIco: BatteryChargingFullIcon,
        Brightness4Ico: Brightness4Icon,
        CampaignIco: CampaignIcon,
        CellTowerIco: CellTowerIcon,
        CloudCircleIco: CloudCircleIcon,
        DiningIco: DiningIcon,
        Diversity2Ico: Diversity2Icon,
        Diversity3Ico: Diversity3Icon,
        Diversity1Ico: Diversity1Icon,
        EngineeringIco: EngineeringIcon,
        FitnessCenterIco: FitnessCenterIcon,
        GitHubIco: GitHubIcon,
        HouseboatIco: HouseboatIcon,
        LanguageIco: LanguageIcon,
        LibraryMusicIco: LibraryMusicIcon,
        LocalFloristIco: LocalFloristIcon,
        LocalFireDepartmentIco: LocalFireDepartmentIcon,
        LocalAtmIco: LocalAtmIcon,
        NightsStayIco: NightsStayIcon,
        NordicWalkingIco: NordicWalkingIcon,
        PetsIco: PetsIcon,
        PsychologyIco: PsychologyIcon,
        RestaurantIco: RestaurantIcon,
        RocketLaunchIco: RocketLaunchIcon,
        SelfImprovementIco: SelfImprovementIcon,
        SportsFootballIco: SportsFootballIcon,
        SportsSoccerIco: SportsSoccerIcon,
        SuperscriptIco: SuperscriptIcon,
        SupervisedUserCircleIco: SupervisedUserCircleIcon,
        SwipeRightIco: SwipeRightIcon,
        TranslateIco: TranslateIcon
    }
    // console.log("you selected "  + iconValue);

    const AvatarIcon = iconsList[iconValue || 'AccountCircleIcon']
    return (
        <AvatarIcon fontSize="medium" sx={{ color: color }} />
    )
}

export default AvatarIcon;



