import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import {Box,Paper} from "@material-ui/core";
import TablePagination from "@material-ui/core/TablePagination";
import axios from "axios";
import Check from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button"
import Backdrop from "@material-ui/core/Backdrop";
import TextField from "@material-ui/core/TextField";
import Fab from "@material-ui/core/Fab";
import Divider from "@material-ui/core/Divider";
import ClearIcon from "@material-ui/icons/Clear";
import IconButton from "@material-ui/core/IconButton";
import SubTable from "./subTable";
import AddIcon from "@material-ui/icons/Add";

const useStyles = makeStyles(theme=>({
  table: {
    minWidth: 650,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  }
}));

function createData(id,name, name_ar, status) {
  return { id,name, name_ar, status };
}

export default function SimpleTable({ data }) {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [open, setOpen] = useState(false);


  const convertRows = (data) => {
    return data.map((i, k) =>
      createData(
        i["category_id"],
        i["name_en"],
        i["name_ar"],
        i["status"]
      )
    );
  };
  
  

//   const rows1 = convertRows(data);

  const [rows, setRows] = useState(convertRows(data.data.data));
  const [rowsPerPage, setRowsPerPage] = useState(6);





  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleChangePage = (event, newPage) => {
    axios({
      url: `http://15.206.151.171/lootbox_backend/public/api/admin/user/list?page=${
        newPage + 1
      }`,
      method: "get",
      headers: {
        "X-Localization": "en",
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization:
          "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiNGEyNzhiZjQ0MjM5YjIwNjVkYmZjZGNhNzU1ZTkxYzM3Nzc0MTk5Nzc4MWUwMzlmZGViOTE4ZjEwZWFjYzBlNWMyYmVlNzI5OGQyZGM4OGQiLCJpYXQiOjE1OTM0OTU1MzQsIm5iZiI6MTU5MzQ5NTUzNCwiZXhwIjoxNjI1MDMxNTM0LCJzdWIiOiI4Iiwic2NvcGVzIjpbXX0.k690oN3lko2MEDhLCTgtAdvB6_FCla9_LhQLI2JvZxCyelgnOvZTUPZlZPSGWQ8gUaKeA9ELacNNpyhX_UFYnORVfrmWUrLxwxrzf337_aWGrA_4R4rPYSjL5RQaxwimBlYP1EdPRTGvuxzCn1cBdHEbRNLP2RMobK_2bHRNJ2VQjMDgeFJVjBEC0iIqKglZOLwIAQJ0roNAYBjbhxWFEuuANrv2U_vsENrbtsfQ1x9kF27O7x-8zkAATGJqmEng7U2GzI_lMjCMzcdAL55k9n4Hg8iyr3NeOwh1BCQ7tutpzO11Fzqydzna6CDVx6nP3Ov_DCCE_1MnjTUHYtnCAe7NcwC-4FvKqE2moUtEXK1NtHF1an52SrCExcSa1JiVx2veRl6sSFucXQQC9kE1N-MkDuoTdj9ZzWqcCXCGi1xx4S5x0NPgmiD--xh7sYGUMwG7xNPd7t1FZw0QHuHaFysM_Dea90TQ4XKtUA2_x9dG96QflGGkloW1DnEcZ-A8v2l8Klsl6cLXfBcsLimIzmVPSr7OdFxpgm0IBh3YQsxJNHrA0_DhLwZFe7px1OmWfRm_ed9UHpBxFsMeDDQ3uGgdzGn3-7tEW0MjYFzs2lvSWTcmndlPbrOaY-hkrOHH_zpjoL9klbQEpLIo3cwj7NNp0YfpW6owqssiqKIh7f4",
      },
    })
      .then((data) => {
        console.log(data.data.data);
        setRows(convertRows(data.data.data));
        setPage(newPage);
      })
      .catch((error) => console.log(error));
  };

  return (
    <React.Fragment>
      <TableContainer elevation={0} component={Paper}>
        <Table size="small" className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow
              style={{
                background: "#f4f4f4",
                height: "3.4rem",
              }}
            >
              <TableCell
                style={{
                  fontWeight: "bold",
                  fontSize: "0.8rem",
                  color: "#282b3c",
                }}
              >
                <Check color="#282b3c" />
              </TableCell>
              <TableCell
                style={{
                  fontWeight: "bolder",
                  fontSize: "0.8rem",
                  color: "#282b3c",
                }}
              >
                Category Id
              </TableCell>
              <TableCell
                style={{
                  fontWeight: "bolder",
                  fontSize: "0.8rem",
                  color: "#282b3c",
                }}
              >
                Name
              </TableCell>
              <TableCell
                style={{
                  fontWeight: "bold",
                  fontSize: "0.8rem",
                  color: "#282b3c",
                }}
              >
                اسم
              </TableCell>
              <TableCell
                style={{
                  fontWeight: "bold",
                  fontSize: "0.8rem",
                  color: "#282b3c",
                  // textAlign: "center",
                  paddingLeft: "3rem",
                }}
              >
                Sub Category
              </TableCell>
              <TableCell
                style={{
                  fontWeight: "bold",
                  fontSize: "0.8rem",
                  color: "#282b3c",
                }}
              >
                Status
              </TableCell>
              <TableCell
                style={{
                  fontWeight: "bold",
                  fontSize: "0.8rem",
                  color: "#282b3c",
                }}
              >
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, i) => (
              <TableRow
                elevation={0}
                style={{
                  height: "3rem",
                  padding: "0px",
                  border: "none",
                }}
                key={i}
              >
                <TableCell
                  style={{
                    color: "#8095a1",
                    fontWeight: 500,
                  }}
                  component="th"
                  scope="row"
                >
                  <Check color="#282b3c" />
                </TableCell>
                <TableCell
                  style={{
                    paddingLeft: "3rem",
                    color: "#8095a1",
                    fontWeight: 500,
                  }}
                >
                  {row.id}
                </TableCell>
                <TableCell style={{ color: "#8095a1", fontWeight: 500 }}>
                  {row.name}
                </TableCell>
                <TableCell style={{ color: "#8095a1", fontWeight: 500 }}>
                  {row.name_ar}
                </TableCell>
                <TableCell style={{ color: "#8095a1", fontWeight: 500 }}>
                  <Button
                    onClick={() => {
                      setOpen(true);
                    }}
                    style={{
                      textTransform: "none",
                      fontSize: 12,
                      // color: "#fff",
                      color: "#8095a1",
                      fontWeight: 600,
                      // background: "#282b3c",
                      width: "10rem",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      // textAlign: "center",
                    }}
                  >
                    {i > 0 ? `${i} - ` : "   "}
                    Add Sub Category
                  </Button>{" "}
                </TableCell>
                <TableCell
                  style={{
                    paddingLeft: "2rem",
                    color: "#8095a1",
                    fontWeight: 500,
                  }}
                >
                  {row.status}
                </TableCell>
                <TableCell
                  style={{ color: "#8095a1", fontWeight: 500 }}
                ></TableCell>
              </TableRow>
            ))}

            {[...Array(6 - rows.length).keys()].map((i, k) => (
              <TableRow
                elevation={0}
                style={{
                  height: "3.5rem",
                  border: "none",
                }}
                key={k}
              >
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        style={{ background: "#fff" }}
        rowsPerPageOptions={[5, 10]}
        component="div"
        count={10}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
      <Backdrop className={classes.backdrop} open={open}>
        <Paper
          style={{
            // height: "20rem",

            width: "50vw",
            position: "absolute",
            top: "20vh",
            paddingBottom: "2rem",
          }}
        >
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            style={{ padding: "0 1rem", color: "#979aa4" }}
          >
            <p
              style={{
                fontSize: "1rem",
                fontWeight: 600,
              }}
            >
              Add Sub Category
            </p>
            <IconButton
              onClick={() => {
                setOpen(false);
              }}
            >
              <ClearIcon />
            </IconButton>
          </Box>
          <Divider />
          <Box
            display="flex"
            justifyContent="space-between"
            style={{
              padding: "1rem",
            }}
          >
            <TextField variant="outlined" label="Name" />
            <TextField variant="outlined" label="عربى" defaultValue="عربى" />
            <TextField
              variant="outlined"
              label="Status"
              defaultValue={"Active"}
            />
            <Fab
              style={{
                // color: "#282b3c",
                // background:'orange',
                color: "#fff",
              }}
              size="medium"
              color="secondary"
            >
              <AddIcon />
            </Fab>
          </Box>
          <SubTable />
        </Paper>
      </Backdrop>
    </React.Fragment>
  );
}
