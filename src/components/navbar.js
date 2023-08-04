import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../scss/navbar.scss";
import { CLIENT_CURRENT } from "../constants";
import Grid from "@mui/system/Unstable_Grid/Grid";
import { Button } from "@mui/base";

const Navbar = ({ isAdmin }) => {
  const [menuIcon, setMenuIcon] = useState(false);
  const [data, setData] = useState();
  const [error, setError] = useState();

  const navigate = useNavigate();
  
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const activeUrl = window.location.pathname.replace('/','');
    
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
                      Licenses
                    </NavLink>
                </Button>
              )}
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
                <NavLink
                  to="/settings"
                  className="navbar-link"
                  onClick={() => setMenuIcon(false)}
                >
                  Settings
                </NavLink>
              </Button>
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
        </Grid>
      </Grid>
    </div>
  );
};

export default Navbar;
