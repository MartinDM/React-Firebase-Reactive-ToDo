import React from "react";
import { ReactEventHandler } from "react";
import PropTypes from "prop-types";
import DeleteIcon from "@material-ui/icons/Delete";
import { ListItem, ListItemText, Button, IconButton } from "@material-ui/core";
import { db } from "../firebase";

// Styles
import "./Todo.scss";

const Todo = (  { todo: string, completed: boolean, id: string }) => {
 
  const updateDone = () => {
    console.log('Marked as done', id);
    db.collection('todos').doc(id).update(
      {
        completed: !completed
      }
    )
    .then( () => {
      console.log('Updated', id);
    })
    .catch( err => {
      console.error('There was an error updating item ', id);
    })
  }

  const deleteItem = () => {
    db.collection('todos').doc(id).delete()
    .then( () => {
      console.log('Deleted', id);
    })
    .catch( err => {
      console.error('There was an error deleting item ', id);
    })
  }

  return (
    <div className="Todo"
    style={{
      display: "flex"
    }}
    >
      <ListItem>
        <ListItemText primary={ todo }
          secondary={ completed ? 'Completed' : '' }>
          <IconButton aria-label="delete">
            <DeleteIcon />
          </IconButton>
          <Button>Completed</Button>
        </ListItemText>
      </ListItem>
      <Button onClick={ updateDone }>{ completed ? 'Done' : 'Unmark as done' }</Button>
      <Button onClick={ deleteItem }>Delete</Button>
    </div>
  );
};

export default Todo;
