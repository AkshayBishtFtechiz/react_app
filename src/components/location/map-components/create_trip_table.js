import React, { useState, useEffect } from "react";
import SearchBar from "../SearchBar.js";
import { CREATE_TRIP_URL } from "../../../constants.js";
import CloseIcon from "@mui/icons-material/Close";
import ApiService from "../../../ApiService.js";
import { Modal, Box, Typography, Button, IconButton } from "@mui/material";
import "../../../scss/button.scss";

const CreateTripTable = ({
  showToast,
  selectedEmId,
  setIsTableVisible,
  setUpdatedTripPath,
  setSelectedEmId,
  setCreateTripInfo,
}) => {
  const [fromLat, setFromLat] = useState();
  const [fromLong, setFromLong] = useState();
  const [toLat, setToLat] = useState();
  const [toLong, setToLong] = useState();
  const [fromAddress, setFromAddress] = useState();
  const [toAddress, setToAddress] = useState();
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");
  const [open, setOpen] = useState(true); // Automatically open the modal

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleAddClick = async () => {
    if ((!fromLat && !fromLong) || (!toLat && !toLong)) {
      setError("Please fill both locations.");
      return;
    }

    setError("");

    const token = localStorage.getItem("token");

    const payload = {
      startLat: fromLat,
      startLong: fromLong,
      endLat: toLat,
      endLong: toLong,
      fromAddress: fromAddress,
      toAddress: toAddress,
      speed: 60,
      emulatorDetailsId: selectedEmId,
    };

    const { success, data, error } = await ApiService.makeApiCall(
      CREATE_TRIP_URL,
      "POST",
      payload,
      token
    );
    if (success) {
      showToast("Added successfully", "success");
      setSelectedEmId(0);
      setSelectedEmId(selectedEmId);
      setCreateTripInfo(data);
    } else {
      showToast(error, "error");
    }

    handleClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "300px",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          paddingTop:"0px",
          paddingLeft:"0px",
          paddingRight:"0px",
          paddingBottom:"1rem"
        }}
      >
        <IconButton
          edge="end"
          color="inherit"
          onClick={handleClose}
          aria-label="close"
          sx={{
            position: "absolute",
            top: 0,
            right: 10,
            color:"white"
          }}
        >
          <CloseIcon />
        </IconButton>
        <Typography variant="h6" component="h2" style={{paddingBottom:"10px",backgroundColor:"#007dc6",color:"white"}}>
          Create Trip
        </Typography>
        <div style={{ margin: "1rem 0" }}>
        <div style={{ display: "flex", justifyContent: "space-between",flexDirection:"column",alignItems:"center" }}>
          <div style={{ flex: 1}}>
          <SearchBar 
            setLat={setFromLat}
            setLong={setFromLong}
            setAddress={setFromAddress}
            inputValue={inputValue}
            setInputValue={setInputValue}
            handleInputChange={handleInputChange}
          />
        </div>
        <div style={{ margin: "1rem 0" }}>
          <SearchBar
            setLat={setToLat}
            setLong={setToLong}
            setAddress={setToAddress}
            inputValue={inputValue}
            setInputValue={setInputValue}
            handleInputChange={handleInputChange}
          />
          {error && <p className="error">{error}</p>}
        </div>
        </div>
        </div>
        <Button
          onClick={handleAddClick}
          style={{ cursor: "pointer", width: "auto", textAlign: "center",float:"right",backgroundColor:"#1976d2",color:"white",marginRight:"0.7rem" }}
        >
          Add
        </Button>
      </Box>
    </Modal>
  );
};

export default CreateTripTable;
