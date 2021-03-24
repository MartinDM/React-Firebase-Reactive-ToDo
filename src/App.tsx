import React, { useState, useEffect } from "react";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
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
  const [isAllComplete, setAllComplete] = useState(false);

  useEffect(() => {
    getToDos();
  }, []); // Runs only on first load

  useEffect(() => { 
    const isComplete = !todos.find( todo => !todo.completed )
    setAllComplete( isComplete );
    console.log(isComplete);
  }, [todos]);  

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
    setAllComplete(false)
  };

  return (
    <div className="App">
      <Container maxWidth="sm">
        <h1 className="App-title">Reactive Todo</h1>
        <Card>
          <CardContent>
            <form>
              <TextField 
                value={todoInput}
                onChange={(e) => setTodoInput(e.target.value)}
                label="Add Todo 📝"
                style={{  width: "100%" }}
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
            {
              (!todos.length && !isAllComplete) && <p className="empty-message">No items to do!</p>
            }
            {todos.map( (item: IToDo) => (
              <Todo
                task={item.task}
                completed={item.completed}
                id={item.id}
                key={item.id}
              ></Todo>
            ))}
            {
             (isAllComplete && <p className="empty-message">All done</p>)
            }
          </CardContent>
        </Card>
      </Container>
    </div>
  );
};

export default App;
