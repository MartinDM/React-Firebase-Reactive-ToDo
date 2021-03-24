import React from "react";
import PropTypes from "prop-types";
import DeleteIcon from "@material-ui/icons/Delete";
import CheckIcon from "@material-ui/icons/Check";
import UndoIcon from "@material-ui/icons/Undo";
import { ListItem, ListItemText, Button, ButtonGroup } from "@material-ui/core";
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
  root: {},
  itemText: {
    fontWeight: "bold",
  },
  itemTextCompleted: {
    textDecoration: "line-through",
    fontWeight: "normal",
    color: grey[500],
  },
});

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#66bb6a",
      contrastText: "#fff",
    },
    secondary: {
      main: "#ef5350",
    },
  },
});

interface IProps {
  task: string;
  completed: boolean;
  id: string;
}

const Todo = (props: IProps) => {
  const classes = useStyles();

  /* Private methods */
  const updateDone = () => {
    console.log("Marked as done", props.id);
    db.collection("todos")
      .doc(props.id)
      .update({
        completed: !props.completed,
      })
      .then(() => {
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

  /* Component variables */
  const isCompleted = props.completed;
  const primaryIcon = isCompleted ? <UndoIcon /> : <CheckIcon />;

  return (
    <ThemeProvider theme={theme}>
      <div className="Todo">
        <ListItem>
          <ListItemText
            primary={
              <p
                className={
                  isCompleted ? classes.itemTextCompleted : classes.itemText
                }
              >
                {props.task}
              </p>
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
