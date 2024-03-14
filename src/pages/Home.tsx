import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import './Home.scss'
import Todo from '../components/Todo'
import List from '@mui/material/List'
import { IToDo } from '../types'
import { db, auth } from '../config/firebase'
import { getAuth, signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { User } from 'firebase/auth'

import {
  CollectionReference,
  collection,
  addDoc,
  updateDoc,
  doc,
  query,
  onSnapshot,
  where,
  deleteDoc,
} from 'firebase/firestore'

export const Home = () => {
  const navigate = useNavigate()
  const [todos, setTodos] = useState<IToDo[]>([])
  const [todo, setTodo] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [user, setUser] = useState<User | null>(getAuth().currentUser)

  const toDosRef: CollectionReference = collection(db, 'toDos')

  const handleDelete = async (id: string) => {
    const targetTodo = doc(db, 'toDos', id)
    await deleteDoc(targetTodo)
  }

  const handleSignOut = async () => {
    try {
      await signOut(getAuth())
      navigate('/login')
    } catch (err) {
      console.error(err)
    }
  }

  const handleComplete = async (id: string, completed: boolean) => {
    const targetTodo = doc(db, 'toDos', id)
    await updateDoc(targetTodo, {
      completed: !completed,
    })
  }

  const handleUpdate = async (id: string, text: string) => {
    const targetTodo = doc(db, 'toDos', id)
    await updateDoc(targetTodo, {
      text,
    })
  }

  useEffect(() => {
    console.log(user)
    auth.onAuthStateChanged((user) => {
      setUser(user)
      if (!user) return navigate('/login')
      const q = query(toDosRef, where('uid', '==', user.uid))
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        let todosArr: IToDo[] = []
        querySnapshot.forEach((doc) => {
          todosArr.push({ ...doc.data(), id: doc.id } as IToDo)
        })
        setTodos(todosArr)
        setIsLoading(false)
      })
      return () => unsubscribe()
    })
  }, [user])

  const handleAdd = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!todo.length || !user) return
    try {
      await addDoc(toDosRef, {
        completed: false,
        text: todo,
        ...(({ displayName, uid }) => ({ displayName, uid }))(user),
      })
      setTodo('')
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="home">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <h1>
          {user && (
            <>
              <span>Welcome {user.displayName}</span>
              <img src={user.photoURL || ''} alt={user.displayName || ''} />
            </>
          )}
        </h1>
        <Card sx={{ marginBottom: '12px' }}>
          <CardContent>
            <form onSubmit={handleAdd}>
              <TextField
                value={todo}
                onChange={(e) => setTodo(e.target.value)}
                label="Add Todo 📝"
                style={{ width: '100%' }}
                variant="outlined"
              />
              <Button
                variant="outlined"
                style={{ display: 'none' }}
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
            {!todos.length && !isLoading && (
              <p className="empty-message">Nothing to do! 💯</p>
            )}
          </CardContent>
        </Card>
        <Button
          sx={{
            padding: '5px 12px',
            fontSize: '12px',
            backgroundColor: '#494949',
            color: 'white',
            textAlign: 'right',
            border: 0,
            '&:hover': {
              backgroundColor: '#6b6b6b',
            },
          }}
          onClick={handleSignOut}
        >
          Sign Out
        </Button>
      </Box>
    </div>
  )
}

export default Home
