import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../scss/navbar.scss";
import { CLIENT_CURRENT } from "../constants";
import Grid from "@mui/system/Unstable_Grid/Grid";
import { Button } from "@mui/base";
<<<<<<< HEAD
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

//icons
import ManageAccountsRoundedIcon from '@mui/icons-material/ManageAccountsRounded';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import SettingsIcon from '@mui/icons-material/Settings';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import FilePresentIcon from '@mui/icons-material/FilePresent';
=======
>>>>>>> 425525ccfe97eab71c8fa14360ea603d03bdd232

const Navbar = ({ isAdmin }) => {
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorEl2, setAnchorEl2] = React.useState(null);
  const open = Boolean(anchorEl);
  const open2 = Boolean(anchorEl2);
  const iconColor = {color: "#007dc6", paddingRight: '10px'};

  const navigate = useNavigate();
  
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const activeUrl = window.location.pathname.replace('/','');
<<<<<<< HEAD

  let gps = {};
  let licenses = {};
  let settings = {};

  switch (activeUrl) {
    case 'home':
        licenses = {
          backgroundColor: '#eeaf1d'
        };
        break;
    case 'gps': 
        gps = {
          backgroundColor: '#eeaf1d'
        };
        break;
    case 'settings': 
        settings = {
          backgroundColor: '#eeaf1d'
        };
        break;
    }

  const handleLogoutMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleLogoutClose = () => {
    setAnchorEl(null);
  };

  const handleMobileMenu = (event) => {
    setAnchorEl2(event.currentTarget);
  };
  const handleMobileClose = () => {
    setAnchorEl2(null);
  };


=======
    
    let gps = {};
    let licenses = {};
    let settings = {};

    switch (activeUrl) {
        case 'home':
            licenses = {
              backgroundColor: '#eeaf1d'
            };
            break;
        case 'gps': 
            gps = {
              backgroundColor: '#eeaf1d'
            };
            break;
        case 'settings': 
            settings = {
              backgroundColor: '#eeaf1d'
            };
            break;
    }

>>>>>>> 425525ccfe97eab71c8fa14360ea603d03bdd232
  const fetchClientData = async () => {
    console.log("fetchClientData isAdmin : "  + isAdmin);
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(CLIENT_CURRENT, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok || response.status !== 200) {
        return { success: false, error: "Invalid credentials" };
      } else {
        const responseData = await response.text();
        console.log("responseData navbar:", responseData);
        const deserializedData = JSON.parse(responseData);
        setData(deserializedData);
        console.log("deserializedData navbar:", deserializedData);
        return { success: true, error: null };
      }
    } catch (error) {
      console.log("Data Error: " + error);
      setError(error.message);
    }
  };

  useEffect(() => {
    const { success, error } = fetchClientData();
  }, []);

  return (
    <div className="headerContainer">
      <Grid container alignItems={"center"}>
<<<<<<< HEAD
        <Grid xs={6}>
          <img src="images/logo2.png" className="logo_image" alt="logo" />
        </Grid>
        <Grid xs={6}>
          <div className="menuContainer">
              {isAdmin && (
                <Button style={licenses} className="ButtonColor">
                    <NavLink to="/home">
=======
        <Grid xs={4} xl={7}>
          <img src="images/logo2.png" className="logo_image" alt="logo" />
        </Grid>
        <Grid xs={8} xl={5}>
          <Grid container spacing={3}>
            <Grid xs={2}></Grid>
            <Grid xs={2}>
              {isAdmin && (
                <Button style={licenses}>
                    <NavLink
                      to="/home"
                      className=""
                      onClick={() => setMenuIcon(false)}
                    >
>>>>>>> 425525ccfe97eab71c8fa14360ea603d03bdd232
                      Licenses
                    </NavLink>
                </Button>
              )}
<<<<<<< HEAD
              <Button style={gps} className="ButtonColor">
                <NavLink to="/gps">
                  GPS
                </NavLink>
              </Button>
              <Button style={settings} className="ButtonColor">
=======
            </Grid>
            <Grid xs={2}>
              <Button style={gps}>
                <NavLink
                  to="/gps"
                  className=""
                  onClick={() => setMenuIcon(false)}
                >
                  GPS
                </NavLink>
              </Button>
            </Grid>
            <Grid xs={2}>
              <Button style={settings}>
>>>>>>> 425525ccfe97eab71c8fa14360ea603d03bdd232
                <NavLink
                  to="/settings"
                  className="navbar-link"
                >
                  Settings
                </NavLink>
              </Button>
<<<<<<< HEAD
              <div>
              <Button 
                style={{paddingRight: '1rem', paddingLeft: '1rem'}}
                className="profileIcon"
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleLogoutMenu}
              >
                <ManageAccountsRoundedIcon />
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleLogoutClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }} 
              >
                <MenuItem>
                  <PersonOutlinedIcon  style={iconColor}/>
                  {data?.firstName || "N/A"} {data?.lastName || "N/A"} ({data?.username || "N/A"})
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  <LogoutOutlinedIcon style={iconColor}/>
                  Logout
                </MenuItem>
              </Menu>
              </div>
          </div>
          <div className="menuContainerInMobileView">
              <Button 
               onClick={handleMobileMenu}
              >
                <MenuIcon />
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl2}
                open={open2}
                onClose={handleMobileClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
              >
                <MenuItem  onClick={() => navigate("/home")}>
                  <FilePresentIcon style={iconColor}/>
                  Licenses
                </MenuItem>
                <MenuItem onClick={() => navigate("/gps")}>
                  <GpsFixedIcon style={iconColor}/>
                  Gps
                </MenuItem>
                <MenuItem onClick={() => navigate("/Settings")}>
                  <SettingsIcon style={iconColor}/>
                  Settings
                </MenuItem>
                <MenuItem>
                  <PersonOutlinedIcon style={iconColor} />
                  {data?.firstName || "N/A"} {data?.lastName || "N/A"} ({data?.username || "N/A"})
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  <LogoutOutlinedIcon style={iconColor}/>
                  Logout
                </MenuItem>
              </Menu>
          </div>
=======
            </Grid>
            <Grid xs={2}>
              <Button className="username">
                  {data?.firstName || "N/A"} {data?.lastName || "N/A"} ({data?.username || "N/A"})
              </Button>
            </Grid>
            <Grid xs={2}>
              <Button>
                <NavLink
                  to="/"
                  className="navbar-link-btn"
                  onClick={() => handleLogout()}
                >
                  Logout
                </NavLink>
              </Button>
            </Grid>
          </Grid>
>>>>>>> 425525ccfe97eab71c8fa14360ea603d03bdd232
        </Grid>
      </Grid>
    </div>
  );
};

export default Navbar;
