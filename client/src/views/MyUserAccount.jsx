

import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react'
import ScaleLoader from 'react-spinners/ScaleLoader';
import { LoggedinContext } from '../context/LoggedinContext';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import Avatar from '@mui/material/Avatar';
// import {blue} from '@mui/material/colors';


import { makeStyles } from "@material-ui/core/styles";


import {
    Switch,
    FormGroup,
    FormControlLabel,
} from '@material-ui/core';

import IconButton from '@mui/material/IconButton';
import Chip from '@mui/material/Chip';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';

// import { createTheme, ThemeProvider} from '@mui/material/styles';
//  popper import
import Box from '@mui/material/Box';
// import Popper from '@mui/material/Popper';
// import InfoIcon from '@mui/icons-material/Info';
import Badge from '@mui/material/Badge';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';


// * icon selections
// import AdbIcon from '@mui/icons-material/Adb';
// import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive';
// import SportsBaseballIcon from '@mui/icons-material/SportsBaseball';
// import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';
// import SportsVolleyballIcon from '@mui/icons-material/SportsVolleyball';
// import SportsTennisIcon from '@mui/icons-material/SportsTennis';
// import PedalBikeIcon from '@mui/icons-material/PedalBike';
// import HailIcon from '@mui/icons-material/Hail';
// import SportsBarIcon from '@mui/icons-material/SportsBar';
// import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
// import Face3Icon from '@mui/icons-material/Face3';
// import Face2Icon from '@mui/icons-material/Face2';
// import FaceIcon from '@mui/icons-material/Face';
// import SickIcon from '@mui/icons-material/Sick';
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon';

import AvatarIcon from '../components/AvatarIcon';





// * style for button
const useStyles = makeStyles(theme => ({
    customHoverFocus: {
        "&:hover, &.Mui-focusVisible": { backgroundColor: "white", padding: "3px" }
    }
}));


const MyUserAccount = () => {

    // avatar icons 
    const listIcons = [
        "AccountCircleIcon",
        "AirplanemodeActiveIcon",
        "SportsBaseballIcon",
        "SportsBasketballIcon",
        "SportsVolleyballIcon",
        "SportsTennisIcon",
        "PedalBikeIcon",
        "HailIcon",
        "SportsBarIcon",
        "SportsEsportsIcon",
        "Face3Icon",
        "Face2Icon",
        "FaceIcon",
        "SickIcon",
        "CatchingPokemonIcon",
        "AirplanemodeInactiveIcon",
        "AppleIcon",
        "AndroidIcon",
        "AdbIcon",
        "ArchitectureIco",
        "BalanceIco",
        "BatteryCharging20Ico",
        "BatteryCharging80Ico",
        "BatteryChargingFullIco",
        "Brightness4Ico",
        "CampaignIco",
        "CellTowerIco",
        "CloudCircleIco",
        "DiningIco",
        "Diversity2Ico",
        "Diversity3Ico",
        "Diversity1Ico",
        "EngineeringIco",
        "FitnessCenterIco",
        "GitHubIco",
        "HouseboatIco",
        "LanguageIco",
        "LibraryMusicIco",
        "LocalFloristIco",
        "LocalFireDepartmentIco",
        "LocalAtmIco",
        "NightsStayIco",
        "NordicWalkingIco",
        "PetsIco",
        "PsychologyIco",
        "RestaurantIco",
        "RocketLaunchIco",
        "SelfImprovementIco",
        "SportsFootballIco",
        "SportsSoccerIco",
        "SuperscriptIco",
        "SupervisedUserCircleIco",
        "SwipeRightIco",
        "TranslateIco"
    ]

    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [updated, setUpdated] = useState(false);
    const { loggedinInfo } = useContext(LoggedinContext);
    const [interest, setInterest] = useState("");
    const navigate = useNavigate();

    const [errors, setErrors] = useState({});

    const colorClass = useStyles();

    // # extrea configuration
    // const theme = createTheme({
    //     palette: {
    //         white: {
    //             main: '#ffffff',
    //         }
    //     }
    // });

    // # array for years
    const yearChoices = [
                        "1st - Freshman", 
                        "2nd - Sophomore",
                        "3rd - Junior",
                        "4th - Senior",
                        "Graduate - Master",
                        "Graduate - PhD",
                        "Medical Student",
                        "Law Student",
                        "Professor",
                        "Faculty",
                        "Other"]

    useEffect(() => {
        if (!loggedinInfo.loggedin) {
            navigate('/login');
            return;
        }

        axios.get('http://localhost:8000/api/users/' + loggedinInfo.loggedinId)
            .then(res => {
                // console.log(res.data);
                setUser(res.data);
            })
            .finally(() => {setLoading(false)});

    }, [loggedinInfo.loggedin, loggedinInfo.loggedinId, navigate])

    // * popper effects
    // * anchor
    const [none, setNone] = useState("none");

    // const handleClick = (event) => {
    //     setAnchorEl(anchorEl ? null : event.currentTarget);
    // };

    // const open = Boolean(anchorEl);
    // const popId = open ? 'simple-popper' : undefined;





    const updateUser = (e) => {
        // console.log("running");

        if (Object.keys(errors).length > 0) {
            // console.log("not updated");
            return;
        }
        axios.put('http://localhost:8000/api/users/' + loggedinInfo.loggedinId, user)
                    .then(res => {
                        // console.log(res.data);
                        // console.log("updated");
                        setUpdated(true);
                        setErrors({});
                    })
                    .catch(err => { 
                        // console.log("running12");
                        let errResponse = err.response.data.errors;
                        let errObj = {};
                        for (const key in errResponse) {
                            errObj[key] = errResponse[key].message;
                        }
                        // console.log(errObj);
                        setErrors(errObj);
                    });
    }


    // ! handle input change
    const handleChange = (e) => {
        // ! front end validation
        let errObj = {...errors};
        if (e.target.name === "nickname") {
            
            if (! (e.target.value.length >= 2 && e.target.value.length <= 30)) {
                errObj['nickname'] = "nickname must be between 2 to 30 characters";
            }
            else {
                delete errObj.nickname;
            }
        }
        if (e.target.name === "major") {
            
            if (! (e.target.value.length <= 50)) {
                errObj['major'] = "Major must be 50 characters or shorter. If you have a long major name, please use an acronym.";
            }
            else {
                delete errObj.major;
            }
        }
        if (e.target.name === "bio") {
            
            if (! (e.target.value.length <= 200)) {
                errObj['bio'] = "bio must be 200 characters or shorter";
            }
            else {
                delete errObj.bio;
            }
        }

        if (e.target.name === "instagramUsername") {
            
            if (! (e.target.value.length <= 30)) {
                errObj['instagramUsername'] = "instagram username must be 30 characters or shorter";
            }
            else {
                delete errObj.instagramUsername;
            }
        }



        setErrors(errObj);

        setUser({ ...user, [e.target.name]: e.target.value });
    }

    const handleYearChange = (e) => {

        // selected -1;
        let yearArr;
        if (e.target.value < 0) {
            // return;
            yearArr = ["-1", "" ]

        } else {
            yearArr = [e.target.value, yearChoices[e.target.value]];
        }
        // console.log(e.target.value);
        // obj[e.target.value] = yearChoices[e.target.value];
        setUser({...user, year : yearArr})
    }

    const handleContact = (e, i) => {
        // deep copy
        let tempContacts = JSON.parse(JSON.stringify(user.contacts)); 

        // console.log(tempContacts[i][0]);
        tempContacts[i][0] = e.target.value;


        setUser({ ...user, contacts : tempContacts});

        let errObj = {...errors};
        let isOk = true;
        for (let i = 0; i < user.contacts.length; i++) {
            if (user.contacts[i][0].length > 100) {
                errObj['contact'] = "contact can not be longer than 100 characters";
                isOk = false;
            }
        }
        if (isOk) {
            delete errObj.contact;
        }
        setErrors(errObj);
    }


    const handleContactVisiblity = (e, i)  => {
        let tempContacts = JSON.parse(JSON.stringify(user.contacts)); 
        tempContacts[i][1] = !tempContacts[i][1]
        setUser({ ...user, contacts : tempContacts});
    }


    const handleInterestChange = (e) => {
        setInterest(e.target.value);
        let errObj = {...errors};
        let isOk = true;
        // * check wehhte they larey have 10 intersts or the lenght of interst is 30 characters or shorter
        if (Object.keys(user.interests).length >= 10) {
            errObj['interest'] = "You can only add 10 interests to your profile";
            isOk = false;
        }
        if (interest.length > 30) {
            errObj['interest'] = "Interest needs to be 30 characters or shorter";
            isOk = false;
        }
        if (isOk) {
            delete errObj.interest;
        } 
        setErrors(errObj);
    }


    const handleBlurInterest = (e) => {
        let errObj = {...errors};
        if (Object.keys(user.interests).length <= 10) {
            delete errObj.interest;
        }
        setErrors(errObj);
    }

    const handleInterestSubmit = (e) => {
        // TODO only allows up to 7 interests
        if (!interest || "interest" in errors) {
            return;
        }

        if (Object.keys(user.interests).length >= 10) {
            return;
        }


        let obj = {};
        obj[interest] = 1;
        let tempUser = { ...user, interests: { ...user.interests, ...obj } };
        setUser(tempUser);
        setInterest("");

        // change all the errors for interest
        let errObj = {...errors};
        delete errObj.interest;
        setErrors(errObj);


    }

    const deleteInterest = (e, value) => {
        let tempInterest = JSON.parse(JSON.stringify(user.interests));
        delete tempInterest[value];
        let tempUser = { ...user, interests: tempInterest };
        setUser(tempUser);
    }

    const changeAvator = (value) => {
        setUser({ ...user, avatarIcon: value });
    }
    // * oepne popper
    // const togglePopper = () => {

    // };


    return (
        <div className="vh-100">
            <div className="container py-5 align-items-center">
                <div className="row d-flex justify-content-center align-items-center mt-4">
                    <div className="col col-md-9 col-lg-7 col-xl-5">
                        {!user || loading ?
                            (<ScaleLoader size={100} color="white" loading={loading} cssOverride={{ display: "block", position: "fixed", bottom: "5%", right: "10%" }} />)
                            :
                            (
                                <div className="card bg-transparent text-white fade-in scroll-box" style={{overflowY : "scroll", maxHeight: "93vh"}}>
                                    {/* <h4 className="card-header p-4 text-white">{user.nickname} <em><small>(@{user.username})</small></em></h4> */}
                                    <div className="d-flex align-items-center mb-4 justify-content-between">
                                        <div className="d-flex userName  align-items-center">
                                            <div className="">
                                                {/* <img src=""
                                                            alt="Generic placeholder image" className="img-fluid rounded-circle border border-dark border-3"
                                                        style={{width: "70px"}}/> */}


                                                <Badge
                                                    overlap="circular"
                                                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                                    badgeContent={

                                                        <IconButton className={colorClass.customHoverFocus} onClick={(e) => {setNone("")}} sx={{color : "#fff", padding: "10px"}}>
                                                            <EditIcon fontSize="medium" color="primary" />
                                                        </IconButton>
                                                    }
                                                >
                                                    <Avatar sx={{ bgcolor: [user.avatarColor]}}>
                                                        <AvatarIcon iconValue={user.avatarIcon} />
                                                    </Avatar>
                                                </Badge>


                                            </div>

                                            {/* // *popper for the spritis */}
                                            {/* <Popper
                                                id={popId}
                                                open={open}
                                                anchorEl={anchorEl}
                                                placement="right-start"
                                                onClick={handleClick}
                                                modifiers={[
                                                    {
                                                        name: 'flip',
                                                        enabled: true,
                                                        options: {
                                                            altBoundary: true,
                                                            rootBoundary: 'viewport',
                                                            padding: 8,
                                                        }
                                                    },
                                                    // {
                                                    //     offset: {
                                                    //         enabled: true,
                                                    //         offset: '0, 30'
                                                    //     }
                                                    // },
                                                    {
                                                        name: 'preventOverflow',
                                                        enabled: true,
                                                        options: {
                                                            altAxis: true,
                                                            altBoundary: true,
                                                            tether: true,
                                                            rootBoundary: 'document',
                                                            padding: 8,
                                                        },
                                                    
                                                ]}> */}
                                                <Box sx={{ border: 1, pt: 1, px: 1, bgcolor: '#fff', borderRadius: "15px", borderColor: "#808080", zIndex: "1000"}} 
                                                    style={{ position: 'fixed', top: "20%", display: [none], maxHeight: "70vh", overflowY : "scroll"}}
                                                    className="w-sm-75 w-md-32 w-lg-32 w-xl-25">
                                                    <div className="d-flex justify-content-end">
                                                        <div className="close-button">
                                                            <IconButton onClick={(e) => {setNone("none")}}>
                                                                <CloseIcon fontSize="medium" sx={{ color: "#000" }}  />
                                                            </IconButton>
                                                        </div>
                                                    </div>
                                                    <div className="d-flex flex-wrap justify-content-center">
                                                        <input
                                                            type="color"
                                                            name="avatarColor"
                                                            value = {user.avatarColor}
                                                            onChange={handleChange}
                                                            className="form-control"/>



                                                    {
                                                        listIcons.map((icon, i) => {
                                                            // console.log(icon);
                                                            
                                                            return (
                                                                <div key={i}>
                                                                    <IconButton onClick={(e) => {changeAvator(icon)}}>
                                                                        <AvatarIcon iconValue={icon} color="#888" />
                                                                    </IconButton>

                                                                </div>
                                                            )
                                                        })
                                                    }
                                                    {/* <IconButton  onClick={() => { }}>
                                                        <AvatarIcon iconValue="AdbIcon" />
                                                    </IconButton>
                                                     */}

                                                    </div>
                                                    <div className="d-flex justify-content-center">
                                                        <div className="close-button" onClick={updateUser}>
                                                            <button className='btn btn-outline-primary my-2'>
                                                                {updated ? "✓ Updated" : "Update"}
                                                            </button>
                                                        </div>
                                                    </div>
                                                </Box>

                                            {/* </Popper> */}

                                            <div className="d-flex flex-column ms-3">
                                                <div className="">
                                                    <h4 className="mb-0">{user.nickname} </h4>
                                                </div>
                                                <div className="">
                                                    <p className="mb-0">@{user.username}</p>
                                                </div>
                                            </div>
                                        </div>

                                        <button className="btn btn-outline-info" onClick = {(e) => (navigate(`/users/${loggedinInfo.loggedinId}`))}>
                                            View Your Profile
                                        </button>
                                    </div>

                                    <div className="card-body">
                                        {/* <div className="mb-2">
                                            <label className="form-label text-white">Username</label><br />
                                            <input
                                                type="text"
                                                placeholder='username'
                                                name="username"
                                                value={user.username}
                                                onChange={handleChange}
                                                className={`form-control ${errors.username ? "border-danger" : "" }`} />

                                                {errors.username ?
                                                    <span className="form-text text-danger">
                                                        {errors.username}
                                                    </span>
                                                    : <></>}


                                        </div> */}
                                        <div className="mb-2">
                                            <label className="form-label text-white">Nickname</label><br />
                                            <input
                                                type="text"
                                                placeholder='nickname'
                                                name="nickname"
                                                value={user.nickname}
                                                onChange={handleChange}
                                                className={`form-control ${errors.nickname ? "border-danger" : "" }`} />

                                            {errors.nickname ?
                                                <span className="form-text text-danger">
                                                    {errors.nickname}
                                                </span>
                                                : <></>}
                                        </div>

                                        <div className="mb-2">
                                            <label className="form-label text-white">Year</label><br />
                                            <select className='form-control' onChange={handleYearChange} defaultValue = {user.year[0] === "-1" || !user.year  ? -1 : user.year[0]}>
                                                {/* { user.year[0] == -1 || !user.year ? 
                                                <>
                                                    <option value="-1">Choose Your Year</option>
                                                    { yearChoices.map((year, i) => {
                                                    return <option key={i} value={i}>{year}</option>
                                                    })}
                                                {/* <option value={-1}> No selected yet</option> */}
                                                {/* </> : 
                                                <>
                                                { yearChoices.map((year, i) => {
                                                    return <option key={i} value={i}>{year}</option>
                                                })}
                                                </>}   */}
                                                
                                                {/* { yearChoices.map((year, i) => {
                                                    return <option key={i} value={i}>{year}</option>
                                                })} */}


                                                    <option value="-1">Choose Your Year</option>
                                                    { yearChoices.map((year, i) => {
                                                    return <option key={i} value={i}>{year}</option>
                                                    })}



                                            </select>
                                        </div>


                                        <div className="mb-2">
                                            <label className="form-label text-white">Major</label><br />
                                            <input
                                                type="text"
                                                placeholder='major'
                                                name="major"
                                                value={user.major}
                                                onChange={handleChange}
                                                className={`form-control ${errors.major ? "border-danger" : "" }`} />

                                                
                                            {errors.major ?
                                                <span className="form-text text-danger">
                                                    {errors.major}
                                                </span>
                                                : <></>}
                                        </div>

                                        <div className="mb-2">
                                            <label className="form-label text-white">Bio</label><br />
                                            <textarea
                                                placeholder='Bio'
                                                name="bio"
                                                rows="3"
                                                value={user.bio}
                                                onChange={handleChange}
                                                className={`form-control scroll-box ${errors.bio ? "border-danger" : "" }`} />
                                                
                                            {errors.bio ?
                                                <span className="form-text text-danger">
                                                    {errors.bio}
                                                </span>
                                                : <></>}
                                        </div>
                                        
                                        {/* <div className="h3">
                                            <span></span>
                                            <span className="mb-2" style={{}}><i id="instagram-icon" className="bi-instagram p-2"></i> Instagram</span> 
                                        </div> */}

                                        <div className="d-flex h5 align-items-center justify-content-center gap-3 mt-3">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-instagram" viewBox="0 0 16 16">
                                                <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z" />
                                            </svg>
                                            <div className="div">
                                                <p className="" style={{marginBottom : "0px"}}>Instagram</p>
                                            </div>
                                        </div>


                                        <div className="input-group mb-3">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text" id="basic-addon1">@</span>
                                                </div>
                                                <input type="text" 
                                                name="instagramUsername"
                                                value= {user.instagramUsername}
                                                onChange={handleChange}
                                                className={`form-control ${errors.instagramUsername ? "border-danger" : "" }`}
                                                placeholder="Instagram username" 
                                                aria-label="Username" 
                                                aria-describedby="basic-addon1"/>
                                        </div>
                                        {errors.instagramUsername ?
                                                    <span className="form-text text-danger">
                                                        {errors.instagramUsername}
                                                    </span>
                                                    : <></>}

                                        <div className="d-flex gap-3 justify-content-center">
                                            <div className="mb-3">
                                                <label className="form-label text-white">Contact 1</label><br />
                                                <input
                                                    type="text"
                                                    value={user.contacts[0][0]}
                                                    onChange={(e) => (handleContact(e, 0))}
                                                    className="form-control mb-1" />
                                                <div className="d-flex justify-content-center">
                                                    <FormGroup>
                                                        <FormControlLabel control={<Switch checked={user.contacts[0][1]} size="small" onChange={e => handleContactVisiblity(e, 0)} />} label={user.contacts[0][1] ? "Public" : "Friends Only"} labelPlacement="bottom" />
                                                    </FormGroup>
                                                </div>
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label text-white">Contact 2</label><br />
                                                <input
                                                    type="text"
                                                    value={user.contacts[1][0]}
                                                    onChange={(e) => (handleContact(e, 1))}
                                                    className="form-control mb-1" />
                                                <div className="d-flex justify-content-center">
                                                    <FormGroup>
                                                        <FormControlLabel control={<Switch checked={user.contacts[1][1]} size="small" onChange={e => handleContactVisiblity(e, 1)} />} label={user.contacts[1][1] ? "Public" : "Friends Only"} labelPlacement="bottom" />
                                                    </FormGroup>
                                                </div>
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label text-white">Contact 3</label><br />
                                                <input
                                                    type="text"
                                                    value={user.contacts[2][0]}
                                                    onChange={(e) => (handleContact(e, 2))}
                                                    className="form-control mb-1" />
                                                <div className="d-flex justify-content-center">
                                                    <FormGroup>
                                                        <FormControlLabel control={<Switch checked={user.contacts[2][1]} size="small" onChange={e => handleContactVisiblity(e, 2)} />} label={user.contacts[2][1] ? "Public" : "Friends Only"} labelPlacement="bottom" />
                                                    </FormGroup>
                                                </div>
                                            </div>
                                        </div>
                                        {errors.contact ?
                                                <span className="form-text text-danger">
                                                    {errors.contact}
                                                </span>
                                                : <></>}


                                        <div className="mb-3">
                                            <label className="form-label text-white">Interests</label><br />
                                            <div className="d-flex justify-content-center gap-3">
                                                <input type="text"
                                                    name="interest"
                                                    value={interest}
                                                    onChange={e => handleInterestChange(e)}
                                                    onBlur = {e => handleBlurInterest(e)}
                                                    className={`form-control mb-1 w-50 ${errors.interest ? "border-danger" : "" }`}/>
                                                
                                                {/* <ThemeProvider theme={theme}> */}
                                                    <IconButton style={{color : "#fff"}} aria-label="add to interest" onClick={handleInterestSubmit}>
                                                        <PlaylistAddIcon fontSize="medium" />
                                                    </IconButton>
                                                {/* </ThemeProvider> */}
                                            </div>
                                            {errors.interest ?
                                                <span className="form-text text-danger">
                                                    {errors.interest}
                                                </span>
                                                : <></>}
                                        </div>

                                        <div className="d-flex gap-2 mb-3 w-100 flex-wrap">
                                            {user.interests ? <>
                                                {Object.keys(user.interests).map((interest, i) => {
                                                    return <Chip label={interest} variant="outlined" style={{backgroundColor : "#2E7D32", borderRadius : "15px", color: "#fff"}} onDelete={(e) => deleteInterest(e, interest)} key={i} />
                                                })}
                                            </> : <></>  
                                            }
                                        </div>
                                        
                                        <button className="btn btn-primary w-25 mb-3" onClick={updateUser}>{updated ? "✓ Updated" : "Update"}</button>


                                    </div>
                                </div>
                            )}
                    </div>
                </div>

            </div>

        </div>
    )


}

export default MyUserAccount