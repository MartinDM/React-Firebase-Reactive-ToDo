import React from "react";
import { ReactEventHandler } from "react";
import PropTypes from "prop-types";
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from "@material-ui/icons/Delete";
import Typography from '@material-ui/core/Typography';
import { ListItem, ListItemText, Button, IconButton } from "@material-ui/core";
import { db } from "../firebase";

// Styles
import "./Todo.scss";

interface Props {
  task: string;
  completed: boolean;
  id: string;
}

const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(1)
  },
  completed: {
    textDecoration: 'line-through'
  }
}));

const Todo = ( props: Props ) => {
  
  const classes = useStyles();
  
  const updateDone = () => {
    console.log('Marked as done', props.id);
    db.collection('todos').doc(props.id).update(
      {
        completed: !props.completed
      }
    )
    .then( () => {
      console.log('Updated', props.id);
    })
    .catch( err => {
      console.error('There was an error updating item ', props.id);
    })
  }

  const deleteItem = () => {
    db.collection('todos').doc(props.id).delete()
    .then( () => {
      console.log('Deleted', props.id);
    })
    .catch( err => {
      console.error('There was an error deleting item ', props.id);
    })
  }

  return (
    <div className="Todo"
    style={{
      display: "flex"
    }}
    >
      <ListItem>
        <ListItemText
          primary={
            <p className={ props.completed ? classes.completed : ''}>
              { props.task }
            </p>
          }
          secondary={ props.completed ? 'Completed' : '' }
          >
          <IconButton size="small" color="primary" aria-label="delete">
            <DeleteIcon />
          </IconButton> 
        </ListItemText>
      </ListItem>
      <Button onClick={ updateDone }>{ props.completed ? 'Undo' : 'Mark done ✓' }</Button>
      <Button onClick={ deleteItem }>Delete</Button>
    </div>
  );
};

export default Todo;
