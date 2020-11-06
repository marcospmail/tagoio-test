import React, { useState, createContext, useContext, useCallback, useEffect } from 'react'
import { v4 } from 'uuid'

interface Todo {
  id: string
  name: string
}

interface TodoContextData {
  todos: Todo[]
  get: (id: string) => Todo | undefined
  add: (name: string) => void
  edit: (id: string, name: string) => void
  remove: (id: string) => void
}

const AuthContext = createContext({} as TodoContextData)

const TodosProvider: React.FC = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const localStorageTodos = localStorage.getItem('@TagoIO:todos')

    if (localStorageTodos) {
      return JSON.parse(localStorageTodos)
    }

    return []
  })

  const get = useCallback((id: string) => {
    return todos.find(todo => todo.id === id)
  }, [todos])

  const add = useCallback((name: string) => {
    const newTodo = { name, id: v4() }
    setTodos(oldTodos => [...oldTodos, newTodo])
  }, [])

  const remove = useCallback((id: string) => {
    const newTodos = todos.filter(todo => todo.id !== id)
    setTodos(newTodos)
  }, [todos])

  const edit = useCallback((id: string, name: string) => {
    const index = todos.findIndex(todo => todo.id === id)

    const newTodos = todos
    newTodos[index] = { id, name }

    setTodos(newTodos)
  }, [todos])

  useEffect(() => {
    localStorage.setItem('@TagoIO:todos', JSON.stringify(todos))
  }, [todos])


  return (
    <AuthContext.Provider value={{ todos, get, add, edit, remove }}>
      {children}
    </AuthContext.Provider>
  )
}

function useTodos(): TodoContextData {
  const context = useContext(AuthContext)
  return context
}

export { useTodos, TodosProvider }
