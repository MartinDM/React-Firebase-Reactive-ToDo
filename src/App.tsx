import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./App.scss";
import Todo from "./components/Todo";
import List from "@mui/material/List";
import { IToDo } from "./types";
import { db, auth } from "./config/firebase";


import {
  CollectionReference,
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { Login } from "./components/Login";

export const App = () => {
  const [todos, setTodos] = useState<IToDo[]>([]);
  const [todo, setToDo] = useState<any | null>('');
  const [user, setUser] = useState<any | null>('');

  const toDosRef: CollectionReference = collection(db, "toDos");

  const getTodos = async () => {
    try {
      const todos = await getDocs(toDosRef);
      const fetchedToDos: any[] = todos.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
        userId: auth?.currentUser?.uid,
      }));
      setTodos(fetchedToDos);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    const targetTodo = doc(db, "toDos", id);
    await deleteDoc(targetTodo);
    getTodos();
  };

  const handleComplete = async (id: string, completed: boolean) => {
    const targetTodo = doc(db, "toDos", id);
    await updateDoc(targetTodo, {
      completed: !completed,
    });
    getTodos();
  };

  const handleUpdate = async (id: string, text: string) => {
    const targetTodo = doc(db, "toDos", id);
    await updateDoc(targetTodo, {
      text,
    });
    getTodos();
  };

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      console.log(user);
      setUser(user?.displayName)
    })
    getTodos();
  }, []);

  const handleAdd = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!todo.length) return;
    try {
      await addDoc(toDosRef, {
        completed: false,
        text: todo,
      });
      getTodos();
      setToDo("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="App">
      <Login />
      <Container maxWidth="sm">
        <h1>
          {
            user &&
            <span>Welcome {user}</span>
          }
          ToDos</h1>
        <Card>
          <CardContent>
            <form onSubmit={handleAdd}>
              <TextField
                value={todo}
                onChange={(e) => setToDo(e.target.value)}
                label="Add Todo 📝"
                style={{ width: "100%" }}
                variant="outlined"
              />
              <Button
                variant="outlined"
                style={{ display: "none" }}
                type="submit"
              >
                Add
              </Button>
            </form>
            {todos && (
              <List>
                {todos.map((toDo) => (
                  <Todo
                    handleUpdate={handleUpdate}
                    handleDelete={handleDelete}
                    handleComplete={handleComplete}
                    key={toDo.id}
                    id={toDo.id}
                    completed={toDo.completed}
                    text={toDo.text}
                  />
                ))}
              </List>
            )}
          </CardContent>
        </Card>
      </Container>
    </div>
  );
};

export default App;
