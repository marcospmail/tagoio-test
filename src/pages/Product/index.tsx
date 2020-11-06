import React, {
  useState,
  useCallback,
  useEffect,
} from 'react'

import { useHistory, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

import Button from '../../components/Button'
import Header from '../../components/Header'

import { useTodos } from '../../hooks/useTodos'

import { Container, Content, Data } from './styles'

interface ParamTypes {
  id?: string
}

const Product: React.FC = () => {
  const { add: addTodo, get: getTodo, edit: editTodo } = useTodos()
  const [name, setName] = useState('')

  const { goBack } = useHistory()

  const { id } = useParams<ParamTypes>()

  useEffect(() => {
    if (id) {
      const foundTodo = getTodo(id)

      if (foundTodo) {
        setName(foundTodo.name)
      }

    }
  }, [getTodo, id])

  const handleSubmit = useCallback(e => {
    e.preventDefault()

    try {
      if (!name) {
        toast.error('Todo name is required')
        return
      }

      if (id) editTodo(id, name)
      else addTodo(name)

      goBack()

    } catch (err) {
      toast.error('Failed to save Todo')
    }
  }, [goBack, addTodo, editTodo, id, name])

  return (
    <Container>
      <Header />

      <Content>
        <header>
          <strong>{id ? 'Editing' : 'Inserting'}</strong>

          <div>
            <Button type="button" onClick={goBack}>
              Cancel
            </Button>
            <Button primary type="submit" form="form">
              Save
            </Button>
          </div>
        </header>

        <Data id="form" onSubmit={handleSubmit}>
          <label>TODO</label>
          <input
            name="todo"
            value={name}
            onChange={e => setName(e.target.value)}
          />

        </Data>
      </Content>
    </Container>
  )
}

export default Product
