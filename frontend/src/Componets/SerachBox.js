import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const SearchBox = () => {
  const [keyword, setKeyword] = useState('')

  const navigate = useNavigate()
  const submitHandler = (e) => {
    e.preventDefault()
    if (keyword.trim()) {
      navigate(`/SearchVeteran/${keyword}`)
    } else {
      navigate('/SearchVeteran')
    }
  }

  return (
    <Form onSubmit={submitHandler} inline className='d-flex'>
      <Form.Control
        type='text'
        name='q'
        onChange={(e) => setKeyword(e.target.value)}
        placeholder='Search...'
        className='mr-sm-2 ml-sm-5 rounded-pill'
      ></Form.Control>
      <Button type='submit' variant='outline-success rounded-pill' className='p-2 mx-1'>
        Search
      </Button>
    </Form>
  )
}

export default SearchBox