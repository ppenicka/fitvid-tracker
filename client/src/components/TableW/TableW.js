import React, { useState, useEffect } from "react";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import TextField from "@material-ui/core/TextField";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';


const useStyles = makeStyles((theme) => ({
  button: {
    backgroundColor: 'white',
    '&:hover': {
      backgroundColor: 'black',
      color: 'white',
    },
  },
}));

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

function TableW ({ exercises, setExercises, editable, setTimeVideo, setClickTimestamp, clickTimestamp }) {

  useEffect(() => {

  }, []);

  const handleChange = (event, index, name) => {
    event.preventDefault();
    console.log(event.target.value, index, name);
    exercises[index][name] = event.target.value;
  }

  function importFromClipboard () {
    navigator.clipboard.readText()
      .then((input) => {
        const exercises = input.split('\n')
          .map(item => item
            .match(/(\d?\d:\d\d)\W+(.+)/))
          .filter(item => item)
          .map(item => {
            const name = item[2].match(/(.+?)((\s{2,})|(,\s))/);
            console.log("importFromClipboard -> name", name)
            const reps = item[2].match(/x\s?(\d{1,3})/);

            return {
              name: name ? name[1] : item[2],
              sets: 0,
              reps: reps ? reps[1] : 0,
              timestamp: item[1]
            }
          })
          .sort((a, b) => (a.timestamp < b.timestamp));

        setExercises(exercises);
      })
  }

  const handleAddExercise = () => {
    const item = {
      name: "",
      sets: 0,
      reps: 0,
      timestamp: "",
    }
    setExercises([...exercises, item])
  }

  const handleRemoveExercise = () => {
    setExercises(exercises.slice(0, -1));
  }

  // const handleRemoveSpecificRow = (index) => {
  //   // const newRows = exercises
  //   // console.log(newRows)
  //   // const newRows = exercises.splice(index, 1);
  //   const newRows = exercises.filter(row => row !== exercises[index]);

  //   console.log("new Rows", newRows)
  //   // console.log(newRows)
  //   setExercises(newRows);
  // }

  // const handleCheckbox = (index) => {
  //   exercises[index].done = !(exercises[index].done)
  // }

  // const logExercises= () => console.log(exercises)

  const classes = useStyles();

  return (
    <div>
      <div className="container">
        <div className="row clearfix">
          <div className="col-md-12 column">
            <table
              className="table table-bordered table-hover"
              id="tab_logic"
              style={{ width: "100%" }}
            >
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center"> Exercise Name </StyledTableCell>
                  <StyledTableCell align="center"> Sets </StyledTableCell>
                  <StyledTableCell align="center"> Reps </StyledTableCell>
                  <StyledTableCell align="center"> Timestamp </StyledTableCell>
                  {!editable && <StyledTableCell align="center"> Done </StyledTableCell>}

                </TableRow>
              </TableHead>
              <tbody>
                {editable && exercises.map((item, idx) => {
                  return (
                    <tr id="addr0" key={item.idx + item.name}>
                      <td>
                        <TextField
                          name="name"
                          size="small"
                          defaultValue={item.name}
                          onChange={(event) => { handleChange(event, idx, "name") }}
                          variant="outlined"
                          fullWidth
                        />
                      </td>
                      <td>
                        <TextField
                          inputProps={{ style: { textAlign: 'right' } }}
                          type="number"
                          name="sets"
                          size="small"
                          defaultValue={item.sets}
                          onChange={(event) => handleChange(event, idx, "sets")}
                          variant="outlined"
                          fullWidth
                        />
                      </td>
                      <td>
                        <TextField
                          inputProps={{ style: { textAlign: 'right' } }}
                          type="number"
                          name="reps"
                          size="small"
                          defaultValue={item.reps}
                          onChange={(event) => handleChange(event, idx, "reps")}
                          variant="outlined"
                          fullWidth
                        />
                      </td>
                      <td>
                        <TextField
                          inputProps={{ style: { textAlign: 'right' } }}
                          type="text"
                          name="timestamp"
                          size="small"
                          defaultValue={item.timestamp}
                          onChange={(event) => handleChange(event, idx, "timestamp")}
                          variant="outlined"
                          fullWidth
                        />
                      </td>
                      {/* <td>
                      <input
                        type="checkbox"
                        name="done"
                        defaultValue={exercises[idx].done}
                        defaultChecked={exercises[idx].done}
                        onClick={() => handleCheckbox(idx)}
                        className="form-control"
                      />
                    </td> */}
                      {/* <td>
                      <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => handleRemoveSpecificRow(idx)}
                      >
                        Remove
                      </button>
                    </td> */}
                    </tr>
                  )
                })}
                {!editable && exercises.map((item, idx) => (
                  <StyledTableRow id="addr0" key={idx}>
                    <StyledTableCell>
                      {exercises[idx].name}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {exercises[idx].sets}

                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {exercises[idx].reps}
                    </StyledTableCell>
                    <StyledTableCell align="right" onClick={() => { setTimeVideo(exercises[idx].timestamp); setClickTimestamp(!clickTimestamp) }}>
                      {exercises[idx].timestamp}
                    </StyledTableCell>
                    <StyledTableCell >
                      <FormControl style={{ marginLeft: "30%" }}>
                        <FormGroup>
                          <FormControlLabel
                            control={<Checkbox size="small" color="default" />}
                          />
                        </FormGroup>
                      </FormControl>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </tbody>
            </table>
            {editable && <div>
              <Button
                variant="contained"
                className={classes.button}
                startIcon={<AddIcon />}
                size="small"
                onClick={handleAddExercise}
              >Add Row</Button>
              <Button
                variant="contained"
                className={classes.button}
                startIcon={<HighlightOffIcon />}
                size="small"
                onClick={handleRemoveExercise}
              >Delete
              Last Row</Button>
              <Button
                variant="contained"
                className={classes.button}
                startIcon={<FileCopyIcon />}
                size="small"
                onClick={importFromClipboard}
              >Import from Clipboard</Button>
            </div>}
          </div>
        </div>
      </div>
    </div>
  );
}


export default TableW;