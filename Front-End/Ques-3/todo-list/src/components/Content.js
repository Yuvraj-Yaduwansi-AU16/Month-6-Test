import React, { useRef, useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import uuid from 'react-uuid';
import ToDoItem from './ToDoItem';
function Content() {
  const [text, setText] = useState([]);
  const [edit, setEdit] = useState(false);
  const textRef = useRef();
  const editText = useRef();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (textRef === '') return;
    else {
      setText([...text, textRef.current.value]);
    }
  };

  const handleEdit = (e) => {
    e.preventDefault();
    if (editText === '') return;
    else {
      setEdit([...text, textRef.current.value]);
    }
  };
  const onClick = (e) => {
    e.preventDefault();
    let todos = [...text];
    let index = todos.indexOf(e.target.value);
    if (index !== -1) {
      todos.splice(index, 1);
      setText(todos);
    }
  };

  const editTodo = (e) => {
    setEdit(e.target.innerText);
  };
  return (
    <Container className=' m-5 d-flex flex-column justify-content-center align-items-center'>
      <h1>To Do List</h1>
      <Form
        onSubmit={handleSubmit}
        className='d-flex flex-row justify-content-center align-items-start'
        style={{ margin: '60px' }}
      >
        <Form.Group>
          <Form.Control
            type='text'
            placeholder='Enter an item'
            ref={textRef}
            required
            style={{ width: '50vw', marginRight: '50px' }}
          />
        </Form.Group>
        <Button className='w-50' type='submit'>
          Add To-Do
        </Button>
      </Form>
      <Container>
        {text &&
          text.map((inputText) => (
            <Container key={uuid()} className='d-flex flex-row'>
              {edit !== inputText ? (
                <div
                  id={inputText}
                  onClick={editTodo}
                  style={{ width: '800px' }}
                >
                  <ToDoItem key={uuid()} value={inputText} />
                </div>
              ) : (
                <Form
                  onSubmit={handleEdit}
                  className='d-flex flex-row justify-content-center align-items-start'
                >
                  <Form.Group>
                    <Form.Control
                      type='text'
                      placeholder='Enter an item'
                      ref={editText}
                      required
                      style={{ width: '600px' }}
                    />
                  </Form.Group>
                  <Button
                    className='w-50'
                    type='submit'
                    style={{ width: '500px' }}
                  >
                    Edit To-Do
                  </Button>
                </Form>
              )}

              <Button
                key={uuid()}
                className='btn-danger w-25'
                value={inputText}
                onClick={onClick}
              >
                Delete ToDo
              </Button>
            </Container>
          ))}
      </Container>
    </Container>
  );
}

export default Content;
