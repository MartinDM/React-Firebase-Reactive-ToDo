import { useEffect, useState, } from "react";
import { ListItem, TextField } from "@mui/material";
import { Undo, Check } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Stack from '@mui/material/Stack';

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
          input: { color: `${completed ? '#777777' : 'black'}` }
        }}
        value={toDo}
        onChange={handleChange}
        variant="standard"
      />

      <Stack direction="row" spacing={1}>
        <IconButton onClick={() => handleComplete(id, completed)} aria-label="complete" size="small">
          {completed ? <Undo /> : <Check />}
        </IconButton>
        <IconButton onClick={() => handleDelete(id)} aria-label="delete" size="small">
          <DeleteIcon />
        </IconButton>

      </Stack>

    </ListItem >
  );
};

export default Todo;
