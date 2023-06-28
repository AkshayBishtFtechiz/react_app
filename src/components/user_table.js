import React, { useEffect, useState } from "react";

import TablePagination, {
  tablePaginationClasses as classes,
} from "@mui/base/TablePagination";

import { styled } from "@mui/system";
import { EMULATOR_URL, USER_URL } from "../constants";
import { USER_CHANGE_STATUS_URL } from "../constants";
import "../scss/table.scss";
import "../scss/button.scss";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";

const UserTable = ({
  showToast,
  handleEditButtonClick,
  editedId,
  userAssingedEmulator,
}) => {
  // State variables
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Number of items to display per page
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (editedId != null) {
      if(editedId == 0){
        fetchUsers();
      } else {
        refreshUserEdit(editedId);
      }
    }
  }, [editedId]);

  useEffect(() => {
    if (userAssingedEmulator != null) {
      refreshUser(userAssingedEmulator.user?.id);
    }
  }, [userAssingedEmulator]);

  const handleActionButtonClick = async (id, status) => {
    if (status == "ENABLED") {
      status = "DISABLED";
    } else {
      status = "ENABLED";
    }
    const userStatusChange = {
      id,
      status,
    };

    const token = localStorage.getItem("token");
    console.log("token : ", token);
    const response = await fetch(USER_CHANGE_STATUS_URL, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(userStatusChange),
    });
    console.log("response:", response);
    if (!response.ok || response.status !== 200) {
      return { success: false, error: "Failed to add user" };
    }
    console.log("Data Previous : " + data);
    const result = await response.text();
    console.log("result:", result);
    const updatedData = data.map((item) => {
      if (item.id === id) {
        console.log("Data Found");
        return { ...item, status: userStatusChange.status };
      }
      return item;
    });
    console.log("Data Updated : " + data);
    setData(updatedData);
  };

  // Fetch data from API
  const refreshUserEdit = async (userId) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(USER_URL + "/" + userId, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok || response.status !== 200) {
        showToast("Failed to update user table", "error");
        return { success: false, error: "Failed to unassign user" };
      }
      const responseData = await response.text();
      const result = JSON.parse(responseData);
      const updatedData = data.map((item) => {
        if (item.id === result.id) {
          return result;
        };
        return item;
      });
      showToast(`Updated user table!`, "success");
      setData(updatedData);
    } catch (error) {
      console.log("refreshUser error : " + error);
      showToast(`Failed to update user table ${error}`, "error");
    }
  };

  // Fetch data from API
  const refreshUser = async (userId) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(USER_URL + "/" + userId, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("refreshUser response:", response);

      if (!response.ok || response.status !== 200) {
        showToast("Failed to update user table", "error");
        return { success: false, error: "Failed to unassign user" };
      }
      const responseData = await response.text();
      console.log("refreshUser  " + responseData);
      const result = JSON.parse(responseData);
      console.log("refreshUser result : " + result);
      console.log("refreshUser emulatorCount : " + result.emulatorCount);
      console.log(
        "refreshUser allEmulatorsCount : " +
          result.emulatorCount?.allEmulatorsCount
      );
      console.log(
        "refreshUser activeEmulatorsCount : " +
          result.emulatorCount?.activeEmulatorsCount
      );
      const updatedData = data.map((item) => {
        if (item.id === result.id) {
          return {
            ...item,
            emulatorCount: {
              ...item.emulatorCount,
              allEmulatorsCount: result.emulatorCount?.allEmulatorsCount,
              activeEmulatorsCount: result.emulatorCount?.activeEmulatorsCount,
            },  
          };
        }
        return item;
      });
      showToast(`Updated user table!`, "success");
      setData(updatedData);
    } catch (error) {
      console.log("refreshUser error : " + error);
      showToast(`Failed to update user table ${error}`, "error");
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
        setData(deserializedData);
        setLoading(false);
        return { success: true, error: null };
      }
    } catch (error) {
      console.log("User Data Error: " + error);
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    const { success, error } = fetchUsers();
    if (success) {
      showToast("Fetched Users successfully", "success");
    } else {
      showToast(error, "error");
    }
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Root sx={{ width: "auto", maxWidth: "100%" }}>
      <table aria-label="custom pagination table">
        <tbody>
          {(rowsPerPage > 0
            ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : data
          ).map((row) => {
            const createdAtDate = new Date(row.createdAt);
            const formattedDate = createdAtDate.toISOString().split("T")[0];

            return (
              <tr key={row.id}>
                <div></div>
                <td align="right">
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <h3>{row.firstName + " " + row.lastName || "N/A"}</h3>
                      <ul>
                        <li>Email : {row.email || "N/A"}</li>
                        <li>Tel. # : {row.telephone || "N/A"}</li>
                        <li>Registration Date : {formattedDate}</li>
                        <li>
                          Active Emulators :
                          {row.emulatorCount?.activeEmulatorsCount !== undefined
                            ? row.emulatorCount?.activeEmulatorsCount
                            : "Err"}
                          /
                          {row.emulatorCount?.allEmulatorsCount !== undefined
                            ? row.emulatorCount?.allEmulatorsCount
                            : "Err"}
                        </li>
                      </ul>
                    </div>
                    <IconButton
                      style={{ height: "auto", width: "40px", margin: "40px" }}
                      aria-label="edit"
                    >
                      <EditIcon onClick={() => handleEditButtonClick(row)} />
                    </IconButton>
                    <button
                      style={{
                        height: "45px",
                        backgroundColor:
                          row.status === "ENABLED" ? "green" : "red",
                        color: "white",
                      }}
                      onClick={() =>
                        handleActionButtonClick(row.id, row.status)
                      }
                    >
                      {row.status}
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}

          {emptyRows > 0 && (
            <tr style={{ height: 34 * emptyRows }}>
              <td colSpan={3} />
            </tr>
          )}
        </tbody>

        <tfoot>
          <tr>
            <CustomTablePagination
              rowsPerPageOptions={[3, 5, 10, { label: "All", value: -1 }]}
              colSpan={3}
              count={data.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: { "aria-label": "rows per page" },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </tr>
        </tfoot>
      </table>
    </Root>
  );
};

export default UserTable;

const blue = {
  200: "#A5D8FF",
  400: "#3399FF",
};

const grey = {
  50: "#F3F6F9",
  100: "#E7EBF0",
  200: "#E0E3E7",
  300: "#CDD2D7",
  400: "#B2BAC2",
  500: "#A0AAB4",
  600: "#6F7E8C",
  700: "#3E5060",
  800: "#2D3843",
  900: "#1A2027",
};

const Root = styled("div")(
  ({ theme }) => `
              table {
                font-family: 'Raleway', sans-serif;
                font-size: 0.875rem;
                border-collapse: collapse;
                width: auto;
                padding:0.5rem;
              }
              
              td,
              th {
                border: 1px solid ${
                  theme.palette.mode === "dark" ? grey[800] : grey[200]
                };
                text-align: left;
                padding: 12px;
              }
              
              th {
                background-color: ${
                  theme.palette.mode === "dark" ? grey[900] : grey[100]
                };
              }
              `
);

const CustomTablePagination = styled(TablePagination)(
  ({ theme }) => `
                /* Remove the spacer element */
                & .${classes.spacer} {
                  display: none;
                }
                
                /* Update the toolbar styles */
                & .${classes.toolbar} {
                  display: flex;
                  flex-direction: row;
                  align-items: center;
                  justify-content:space-arround;
                  gap: 10px;
                }
                
                /* Update the select label styles */
                & .${classes.selectLabel} {
                  margin: 0;
                }
                
                /* Update the select styles */
                & .${classes.select} {
                  padding: 2px;
                  border: 1px solid ${
                    theme.palette.mode === "dark" ? grey[800] : grey[200]
                  };
                  border-radius: 50px;
                  background-color: transparent;
                  
                  &:hover {
                    background-color: ${
                      theme.palette.mode === "dark" ? grey[800] : grey[50]
                    };
                  }
                  
                  &:focus {
                    outline: 1px solid ${
                      theme.palette.mode === "dark" ? blue[400] : blue[200]
                    };
                  }
                }
                
                /* Update the actions styles */
                .${classes.actions} {
                  padding: 2px;
                  border-radius: 50px;
                  text-align: center;
                  display: flex;
                }
                
                /* Update the displayed rows styles */
                & .${classes.displayedRows} {
                  margin-left: 2rem;
                }
                `
);