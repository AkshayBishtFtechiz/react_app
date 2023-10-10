import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import ApiService from "../../../../../ApiService";
import { MESSAGE_SEND_MSG } from "../../../../../constants";
import UploadFiles from "./components/upload-files.component.js";
import "../../../../../scss/ContactForm.scss"

export function ContactForm({
  dialogType,
  emulatorId,
  selectedPhoneNumber,
  showToast,
}) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");
  const [messageError, setMessageError] = useState("");
  const [numberError, setPhoneNumberError] = useState("");


  const validatePhoneNumber = (number) => {
    if (!number) {
      setPhoneNumberError("Phone number is required.");
      return false;
    }

    if (number.replace(/\D/g, "").length > 13) {
      setPhoneNumberError("Phone number is too long.");
      return false;
    }

    setPhoneNumberError("");
    return true;
  };

  const validateMessage = (text) => {
    if (!text) {
      setMessageError("Message is required.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validatePhoneNumber(phoneNumber) && validateMessage(message)) {
      const payload = {
        emulatorId: emulatorId,
        message: message,
        number: phoneNumber,
      };
      const token = localStorage.getItem("token");
      const { success, data, error } = await ApiService.makeApiCall(
        MESSAGE_SEND_MSG,
        "POST",
        payload,
        token,
        null
      );
      if (success) {
        setPhoneNumber("");
        setMessage("");
        setPhoneNumberError("");
        setMessageError("");
        showToast("Data submit Successfully", "success");
      } else if (error) {
        showToast(`error: ${error.message}`, "error");
      }
    }
  };

  return (
    <div className="sms_form">
      <form onSubmit={handleSubmit}>
        {/* Form inputs */}
        <input
          className="smsInput"
          type="text"
          placeholder="Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <textarea
          className="smsTextarea"
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <UploadFiles />

        {/*Submit button */}
        <Button type="submit" variant="contained" color="primary">
          SEND
        </Button>
      </form>
    </div>
  );
}
