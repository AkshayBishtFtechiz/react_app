import React from "react";

const AddressTable = ({ tripData }) => {
 
  const fromAddress =
    tripData?.fromAddress[0]?.long_name +
    ", " +
    tripData?.fromAddress[1]?.long_name +
    ", " +
    tripData?.fromAddress[2]?.long_name +
    ", " +
    tripData?.fromAddress[3]?.long_name ||
    "N/A";
  const toAddress =
    tripData?.toAddress[0]?.long_name +
    ", " +
    tripData?.toAddress[1]?.long_name +
    ", " +
    tripData?.toAddress[2]?.long_name +
    " ," +
    tripData?.toAddress[3]?.long_name ||
    "N/A";
    const timeInHours = tripData?.distance / tripData?.velocity;
    const hours = Math.floor(timeInHours);
    const minutes = Math.round((timeInHours - hours) * 60);
    const totalTime = `~${hours} hours and ${minutes} minutes`;
    
  return (
    <div style={{ position:"relative",bottom:"0"}}>
      <table aria-label="custom pagination table" className="table">
        <thead>
          <tr>
            <th scope="col">From Address</th>
            <th scope="col">To Address</th>
            <th scope="col">Total Time</th>
          </tr>
        </thead>
        <tbody style={{ width: "100vh"}}>
          <tr>
            <td align="right" style={{ wordWrap: "break-word" }}>
              {fromAddress}
            </td>
            <td align="right" style={{ wordWrap: "break-word" }}>
              {toAddress}
            </td>
            <td align="right" style={{ wordWrap: "break-word" }}>
             {totalTime}
    
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default AddressTable;