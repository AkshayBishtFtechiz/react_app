import React, { useState } from "react";
import { Button, Card, CardContent, CardHeader, CardActions } from "@mui/material";
import { DOWNLOAD_APK_URL, COPY_DOWNLOAD_APK_URL } from "../constants";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './../scss/downloadApk.scss';  

//icons
import LinkOutlinedIcon from '@mui/icons-material/LinkOutlined';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';

const DownloadApk = () => {
  const [loading, setLoading] = useState(false);

  const handleDownloadFile = async () => {
    setLoading(true); // Set loading to true before starting the fetch

    const token = localStorage.getItem("token");
    console.log("token : ", token);

    fetch(DOWNLOAD_APK_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error downloading file");
        }
        return response.blob();
      })
      .then((blob) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "trackspot.apk"; // Set the desired file name
        a.click();
        URL.revokeObjectURL(url);
      })
      .catch((error) => {
        window.alert(error);
        console.error("Download error:", error);
      })
      .finally(() => {
        setLoading(false); // Set loading back to false after downloading is complete or an error occurs
      });
  };

  const handleCopyUrl = async () => {
    setLoading(true); // Set loading to true before starting the copy operation

    if (!navigator.clipboard || !navigator.clipboard.writeText) {
      toast.error("Clipboard access not supported, use https");
      setLoading(false); // Set loading back to false if clipboard access is not supported
      return;
    }

    // Copy the download URL to clipboard
    navigator.clipboard
      .writeText(COPY_DOWNLOAD_APK_URL)
      .then(() => {
        toast.success("Download URL copied");
      })
      .catch((error) => {
        toast.success("Could Not Copy Link");
      })
      .finally(() => {
        setLoading(false); // Set loading back to false after copying is complete or an error occurs
      });
  };

  return (
    <Card variant="outlined" style={{boxShadow: "0px 0px 12px rgb(145 158 171 / 20%), 0px 12px 24px -4px rgb(145 158 171 / 12%)" , marginBottom: "30px", borderRadius: "8px"}}>
      <CardHeader 
        title="Mock Application Version"
        style={{textAlign: "center"}}
      >
      </CardHeader>
      <CardContent style={{textAlign: "center"}}>
          <Button onClick={handleCopyUrl} variant="outlined" className="copyButton">
            <LinkOutlinedIcon style={{paddingRight: "0.6rem"}}/>
            COPY DOWNLOAD LINK
          </Button>
      </CardContent>
      <CardActions>
        <Button onClick={handleDownloadFile} variant="contained" style={{marginBottom: "0.5rem", width: "100%", padding: "10px 0", backgroundColor: "#007dc6", color: "white", borderRadius: "25px"}}>
          <FileDownloadOutlinedIcon style={{paddingRight: "0.6rem"}}/>
          Download File
        </Button>
      </CardActions>
    </Card>
    // <Card
    //   style={{
    //     backgroundColor: "#007dc6",
    //     color: "white",
    //     marginBottom: "30px",
    //     borderRadius: "1rem",
    //   }}
    // >
    //   <CardContent>
    //     <Typography variant="h5" component="h2">
    //       Mock Application Version
    //     </Typography>

    //     <Button
    //       variant="contained"
    //       color="success"
    //       startIcon={<GetAppIcon />} // Add the GetAppIcon at the starting of the button
    //       onClick={handleDownloadFile}
    //       style={{ marginTop: "2rem", marginLeft: "1.2rem" }}
    //       endIcon={loading && <CircularProgress color="inherit" size={20} />} // Show the circular progress only when loading is true
    //       disabled={loading} // Disable the button while loading is true
    //     >
    //       Download File
    //     </Button>

    //     <button className="login_button" onClick={handleCopyUrl}>
    //       COPY DOWNLOAD LINK
    //     </button>
    //   </CardContent>
    // </Card>
  );
};

export default DownloadApk;
