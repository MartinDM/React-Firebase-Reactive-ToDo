import { useEffect, useState, } from "react";
import { ListItem, Button, TextField, ButtonGroup } from "@mui/material";
import { Delete, Undo, Check } from '@mui/icons-material';

interface IProps {
  text: string
  id: string
  completed: boolean
  handleDelete: (id: string) => void
  handleComplete: (id: string, completed: boolean) => void
  handleUpdate: (id: string, text: string) => void
}

const Todo = (props: IProps) => {

  const { text: initialTodo, completed, id, handleDelete, handleUpdate, handleComplete } = props
  const [toDo, setToDo] = useState(initialTodo)

  const handleChange = (e: any) => {
    setToDo(e.target.value)
  }

  useEffect(() => {
    handleUpdate(id, toDo)
  }, [toDo])

  return (
    <ListItem sx={{ justifyContent: 'space-between', p: 1, m: 0, pl: 0 }}>
      <TextField
        sx={{
          textDecoration: `${completed ? 'line-through' : 'none'}`,
        }}
        value={toDo}
        onChange={handleChange}
        variant="standard"
      />
      <ButtonGroup disableElevation size="small" variant="contained">
        <Button
          color={completed ? "inherit" : "primary"}
          startIcon={completed ? <Undo /> : <Check />}
          onClick={() => handleComplete(id, completed)}
        >
          {completed ? "Undo" : "Done"}
        </Button>
        <Button
          startIcon={<Delete />}
          color="secondary"
          onClick={() => handleDelete(id)}
        ></Button>
      </ButtonGroup>
    </ListItem>
  );
};

export default Todo;
