import React, {  useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import { FiTrash } from 'react-icons/fi'
import { confirmAlert } from 'react-confirm-alert'

import Button from '../../components/Button'
import Header from '../../components/Header'

import { useTodos } from '../../hooks/useTodos'

import { Container, Content, EmptyData } from './styles'

const Products: React.FC = () => {
  const { todos, remove : removeTodo  } = useTodos()
  const history = useHistory()

  const handleRemove = useCallback(
    async (id: string) => {
      confirmAlert({
        title: 'Confirmation',
        message: 'Are you sure?',
        buttons: [
          {
            label: 'Delete',
            onClick: () => removeTodo(id),
          },
          {
            label: 'Cancel',
            onClick: () => { },
          },
        ],
      })
    }, [removeTodo])

  return (
    <Container>
      <Header />

      <Content>
        <header>
          <strong>Todos</strong>

          <Button primary onClick={() => history.push('/new')}>
            New
          </Button>
        </header>

        {todos.length ? (
          <ul>
            {todos.map(p => (
              <li key={p.id} onClick={() => history.push(`/edit/${p.id}`)}>
                <span>{p.name}</span>

                <button
                  onClick={e => {
                    e.stopPropagation()
                    handleRemove(p.id)
                  }}
                >
                  <FiTrash size={14} />
                </button>
              </li>
            ))}
          </ul>
        ) : (
            <EmptyData>
              <span>Nada cadastrado</span>
            </EmptyData>
          )}
      </Content>
    </Container>
  )
}

export default Products
