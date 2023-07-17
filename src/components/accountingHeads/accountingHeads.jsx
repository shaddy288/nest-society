import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";

//ACCOUNTING HEADS HOOKS//
const AccountingHeads = () => {
  const [type, setType] = useState("");
  const [name, setName] = useState("");
  const [data, setData] = useState([]);
  const [index, setIndex] = useState(-1);
  const [message, setMessage] = useState();
  const [req, setRequried] = useState();
  // const [delete,setDelete] = useState(0);

  const handleChange = (event) => {
    setType(event.target.value);
  }

  const handleName = (event) => {
    setName(event.target.value);
  }

  const handleSubmit = () => {
    let tableData = JSON.parse(JSON.stringify(data));  //DEEP COPY
    if (type.trim() === "" && name.trim() === "") {
      setRequried("Please fill the required fields");
    }
    else {
      if (index === -1) {
        tableData.push({
          srno: tableData.length + 1,
          name: name.trim(),
          type: type
        })
      } else {
        tableData.splice(index - 1, 1, {
          srno: index,
          name: name.trim(),
          type: type
        })
        setIndex(-1);
        console.log(name);
      }

      setData(tableData);
      setName("");
      setType("");
      console.log(tableData);
    }
  }

  const handleEdit = (currentRow) => {
    setName(currentRow.name);
    setType(currentRow.type);
    setIndex(currentRow.srno);
    console.log(currentRow);
  }

  const handleDelete = (indexVal) => {
    let tableData = JSON.parse(JSON.stringify(data));
    tableData.splice(indexVal, 1);
    setData(tableData);
  }

  return (
    //ACCOUNTING HEAD HTML START//
    <div className="accounting-head">
      <div className="accounting-card-head">
        <h1>Accounting Heads</h1>
      </div>

      {/* START GRID SYSTEM */}
      <div className="grid-system">
        <Grid container spacing={2}>
          <Grid item xs={4} >
            {/* START CARD */}
            <div className="left-card">
              <Card sx={{ minWidth: "100%" }}>
                <CardContent>
                  <div className="form-group">
                    <FormControl fullWidth>
                      <label>Select Type</label>
                      <Select
                        value={type}
                        label="Select type"
                        onChange={handleChange}
                        className="input"
                      >
                        <MenuItem value={"Income"}>Income</MenuItem>
                        <MenuItem value={"Expenditure"}>Expenditure</MenuItem>
                        <MenuItem value={"Liabilities"}>Liabilities</MenuItem>
                        <MenuItem value={"Assest"}>Assest</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                  <p className="errortext">{req}</p>
                  <p className="errortext">{message}</p>
                  {/* INPUT START */}
                  <div className="form-group">
                    <label> Name :</label>
                    <TextField className="input" variant="outlined" value={name} onChange={handleName} />
                  </div>
                  <p className="errortext">{req}</p>
                  <div className="form-group"><Button className="submitbtn" variant="contained" onClick={handleSubmit} >Submit </Button></div>
                </CardContent>
                {/* END CARD */}
              </Card>
              {/* END GRID */}
            </div>
          </Grid>


          {/* ACCOUNTIG HEAD TABLE START */}
          <Grid item xs={8}>
            <div className="right-card">
              <Card sx={{ minWidth: "100%" }}>
                <CardContent>
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: "100%" }} aria-label="simple table">
                      {/* TABLE HEAD */}
                      <TableHead>
                        <TableRow>
                          {/* TABLE HEAD DATA */}
                          <TableCell>Sr no</TableCell>
                          <TableCell>Name</TableCell>
                          <TableCell>Type</TableCell>
                          <TableCell>Action</TableCell>
                        </TableRow>
                      </TableHead>
                      {/* TABLE HEAD DATA */}
                      <TableBody>
                        {data.map((row, i) => (
                          <TableRow key={row.srno}>
                            <TableCell>{row.srno}</TableCell>
                            <TableCell>{row.name}</TableCell>
                            <TableCell>{row.type}</TableCell>
                            <TableCell>
                              {/* TABLE ICONS */}
                              <IconButton onClick={() => handleEdit(row)}>
                                <ModeEditOutlineOutlinedIcon />
                              </IconButton>
                              <IconButton onClick={() => handleDelete(i)}>
                                <DeleteIcon />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </CardContent>
              </Card>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
    //ACCOUNTIG HEAD TABLE END */
  );
};
export default AccountingHeads;
