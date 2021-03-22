import React, { useState, useEffect } from "react";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CardContent from "@material-ui/core/CardContent";
import "./App.scss";
import firebase from "firebase";
import { db } from "./firebase";
import Todo from "./components/Todo";

interface IToDo {
  id: string;
  task: any;
  completed: boolean;
}

const App = () => {
  const [todos, setTodos] = useState<IToDo[]>([]);
  const [todoInput, setTodoInput] = useState("");

  useEffect(() => {
    getToDos();
  }, []); // Runs only on first load

  const getToDos = () => {
    db.collection("todos").orderBy('timestamp','desc').onSnapshot((query: any) => {
      setTodos(
        query.docs.map((doc: any) => ({
          id: doc.id,
          task: doc.data().task,
          completed: doc.data().completed,
        })
      ));
      console.log(todos);
    });
  };

  const addToDo = (e: any) => {
    e.preventDefault();
    db.collection("todos").add({
      task: todoInput,
      completed: false,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setTodoInput("");
  };

  return (
    <div className="App">
      <Container maxWidth="sm">
        <Card>
          <CardContent>
            <form>
              <TextField
                id="outlined-basic"
                value={todoInput}
                onChange={(e) => setTodoInput(e.target.value)}
                label="Add Todo"
                style={{ maxWidth: "300px", width: "60vw" }}
                variant="outlined"
              />
              <Button
                variant="outlined"
                onClick={addToDo}
                style={{ display: "none" }}
                type="submit"
              >
                Add
              </Button>
            </form>
            {todos.map( (item: IToDo) => (
              <Todo
                task={item.task}
                completed={item.completed}
                id={item.id}
                key={item.id}
              ></Todo>
            ))}
          </CardContent>
        </Card>
      </Container>
    </div>
  );
};

export default App;
