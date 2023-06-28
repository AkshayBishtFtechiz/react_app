import * as React from "react";
import { styled } from "@mui/system";
import TablePagination, {
  tablePaginationClasses as classes,
} from "@mui/base/TablePagination";
import "../scss/table.scss";
const LicenseTable = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Root sx={{ width: 'auto', maxWidth: "100%" }}>
      <table aria-label="custom pagination table">
        <thead>
          <tr>
            <th>Status</th>
            <th>MAC</th>
            <th>Number</th>
            <th>Assign</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {(rowsPerPage > 0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          ).map((row) => (
            <tr key={row.status}>
              <td>{row.status}</td>
              <td style={{ width: 120 }} align="right">
                {row.mac}
              </td>
              <td style={{ width: 120 }} align="right">
                {row.number}
              </td>
              <td style={{ width: 120 }} align="right">
                {row.assign}
              </td>
              <td style={{ width: 120 }} align="right">
                {row.action}
              </td>
            </tr>
          ))}

          {emptyRows > 0 && (
            <tr style={{ height: 34 * emptyRows }}>
              <td colSpan={3} />
            </tr>
          )}
        </tbody>
        <tfoot>
          <tr>
            <CustomTablePagination
              rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
              colSpan={5}
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              slotProps={{
                select: {
                  "aria-label": "rows per page",
                },
                actions: {
                  showFirstButton: true,
                  showLastButton: true,
                },
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
export default LicenseTable;

function createData(status, mac, number, assign, action) {
  return { status, mac, number, assign, action };
}

const rows = [
  createData("online", "1.2.3.0", 3476542387, "user1", "unassign"),
  createData("idle", "1.4.3.8", 6676542387, "select", " "),
  createData("online", "1.2.3.4", 1876542387, "user1", "unassign"),
  createData("idle", "1.2.3.2", 9976542387, "select", ""),
  createData("idle", "1.2.1.1", 7876542387, "user1", "unassign"),
  createData("online", "1.2.3.3", 6576542387, "user1", "unassign"),
  createData("idle", "1.2.3.0", 3076542387, "user1", "unassign"),
];
// ].sort((a, b) => (a.calories < b.calories ? -1 : 1));

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
    font-family: Raleway, sans-serif;
    font-size: 0.875rem;
    border-collapse: collapse;
    width: auto;
    padding:0.5rem;
  }

  td,
  th {
    border: 1px solid ${theme.palette.mode === "dark" ? grey[800] : grey[200]};
    text-align: left;
    padding: 12px;
  }

  th {
    background-color: ${theme.palette.mode === "dark" ? grey[900] : grey[100]};
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
    & .${classes.actions} {
      padding: 2px;
 
   border-radius: 50px;
      text-align: center;
      display:flex;
      align-items:center;
      justify-content:center;
  
      /* Hide the sort button */
      & button {
        display: none;
      }
  
      /* Show only the navigation buttons */
      & > :not(:first-child):not(:last-child) {
        display: block;
      }
    }
  
    /* Update the displayed rows styles */
    & .${classes.displayedRows} {
      margin-left: 2rem;
    }
    `
);