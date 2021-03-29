import React, { useState, useEffect } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import CheckIcon from "@material-ui/icons/Check";
import UndoIcon from "@material-ui/icons/Undo";
import EditIcon from '@material-ui/icons/Edit';
import { ListItem, ListItemText, Button, TextField, ButtonGroup } from "@material-ui/core";
import { db } from "../firebase";
import {
  makeStyles,
  ThemeProvider,
  createMuiTheme,
} from "@material-ui/core/styles";
import grey from "@material-ui/core/colors/grey";

/* Styles */
import "./Todo.scss";

/* Material UI styling */
const useStyles = makeStyles({
  root: {
    cursor: "text"
  },
  itemText: {
    fontWeight: "bold",
    display: "block",
  },
  itemTextCompleted: {
    textDecoration: "line-through",
    display: "block",
    fontWeight: "normal",
    color: grey[500],
    opacity: ".7"
  }
});

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#66bb6a",
      contrastText: "#fff",
    },
    secondary: {
      main: "#ef5350",
    }
  }
});

interface IProps {
  task: string;
  completed: boolean;
  id: string;
}

const Todo = (props: IProps) => {

  const classes = useStyles();
  
  /* Component variables */
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isCompleted, setIsComplete] = useState<boolean>(props.completed);
  const [task, setTask] = useState<string>(props.task);
  /* 
  const isCompleted = props.completed; */
  const primaryIcon = isCompleted ? <UndoIcon /> : <CheckIcon />;

  /* Private methods */
  const updateDone = () => {
    db.collection("todos")
      .doc(props.id)
      .update({
        completed: !props.completed,
      })
      .then(() => { 
        setIsComplete(!props.completed);
        setIsEditing(false);
        console.log("Updated", props.id);
      })
      .catch((err) => {
        console.error("There was an error updating item ", props.id);
      });
  };

  const deleteItem = () => {
    db.collection("todos")
      .doc(props.id)
      .delete()
      .then(() => {
        console.log("Deleted", props.id);
      })
      .catch((err) => {
        console.error(`
          There was an error deleting item: ${props.id}
          ${err}
        `);
      });
  };

  const handleChange = (e: any) => {
    const newContent = e.target.value;
    setTask(newContent);
    db.collection("todos")
      .doc(props.id)
      .update({
        task: newContent
      })
      .then(() => {
        console.log("Updated", newContent);
      })
      .catch((err) => {
        console.error("There was an error updating item ", props.id);
      });
  }

  return (
    <ThemeProvider theme={theme}>
      <div className="Todo">
        <ListItem>
          {/* <EditIcon className="Todo__edit" onClick={handleEdit} /> */}
          <ListItemText
            primary={
              <TextField
                value={task}
                onInput={handleChange}
                className={isCompleted ? classes.itemTextCompleted : classes.itemText}
              />
            }
          ></ListItemText>
        </ListItem>
        <ButtonGroup disableElevation size="small" variant="contained">
          <Button
            color={isCompleted ? "inherit" : "primary"}
            startIcon={primaryIcon}
            onClick={updateDone}
          >
            {isCompleted ? " Undo" : " Done "}
          </Button>
          <Button
            startIcon={<DeleteIcon />}
            color="secondary"
            onClick={deleteItem}
            aria-label="delete"
          ></Button>
        </ButtonGroup>
      </div>
    </ThemeProvider>
  );
};

export default Todo;
