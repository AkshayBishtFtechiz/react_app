import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../scss/popup.scss";
import { USER_URL, USER_ASSIGN_EMULATOR_URL } from "../constants";


const PopUpAssignUser = ({ showToast,handleOpen, handleClose, open, emulatorToAssignUser , handleAssignedUserToEmulator }) => {
  const navigate = useNavigate();
  const [users, setUsers] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const handleUserSelect = async (userId) => {
    try {
      console.log(emulatorToAssignUser.id);
      console.log(userId);
      const { success,error,data } = await setUserToEmulator(emulatorToAssignUser.id, userId);

      if (success) {
        console.log("User added successfully");
        if(emulatorToAssignUser != null){
          handleAssignedUserToEmulator(success, error, data )
        } else {
          handleAssignedUserToEmulator(success, error, null )
        }
        showToast("User Added", "success"); 
      } else {
        showToast(error || "Failed to add user", "error"); // Call the showToast method with two arguments
        setError(error || "Failed to add user"); // Display appropriate error message
      }
    } catch (error) {
      console.log("Error occurred while adding user:", error);
      setError("An error occurred while adding user"); // Display a generic error message
    }
  };


  // Fetch data from API
  const fetchUsers = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(USER_URL, {
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
        const deserializedData = JSON.parse(responseData);
        setUsers(deserializedData);
        setLoading(false);
        return { success: true, error: null};
      }
    } catch (error) {
      console.log("User Data Error: " + error);
      setError(error.message);
      setLoading(false);
    }
  };


  const setUserToEmulator = async (emulatorId, UserId) => {
    console.log(emulatorId);
    console.log(UserId);

    const toAssign = {
      user: { id: UserId },
      emulatorDetails: { id: emulatorId },
    };

    const token = localStorage.getItem("token");
    console.log("token : ", token);
    const response = await fetch(USER_ASSIGN_EMULATOR_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(toAssign),
    });
    console.log("response:", response);
    if (!response.ok || response.status !== 200) {
      return { success: false, error: "Failed to assign user", data: null};
    }
    const result = await response.json();
    return { success: true, error : null, data: result};
  };

  useEffect(() => {
    setLoading(true);
    const userData = fetchUsers();
  }, []);

  useEffect(() => {
    setLoading(true);
    if (open) {
      const userData = fetchUsers();
      // Additional logic for handling the fetched data
    }
  }, [open]);

  return (
    <div>
    <Modal
      open={open}
      userToAssignToEmulator={emulatorToAssignUser}
      onClose={handleClose}
      users={users}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
    >
      {loading ? (
        <div>Loading...</div>
      ) : (
        <Box className="action_popup" >
          <h1>Select a user:</h1>
          <div className="action_popup_div" >
            <ul>
              {users?.map((user) => (
                <li
                  key={user.id}
                  onClick={() => handleUserSelect(user.id)}
                >
                  {user.firstName} {user.lastName}
                </li>
              ))}
            </ul>
          </div>
          {error && <p className="error">{error}</p>}
        </Box>
      )}
    </Modal>
  </div>
  
  );
};

export default PopUpAssignUser;
