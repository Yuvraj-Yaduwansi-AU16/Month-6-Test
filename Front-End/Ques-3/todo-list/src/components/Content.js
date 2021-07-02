import React, { useRef, useState } from 'react';
import { Button, Container, Form, Card } from 'react-bootstrap';
import uuid from 'react-uuid';
import ToDoItem from './ToDoItem';
function Content() {
  const [text, setText] = useState([]);
  const [edit, setEdit] = useState('');
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
    let todos = [
      text.map((li, i) => {
        if (i === parseInt(edit)) {
          return editText.current.value;
        } else {
          return li;
        }
      }),
    ];
    setText(...todos);
    setEdit('');
    console.log(text);
    console.log(edit);
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
    textRef.current.value = e.target.innerText;
    setEdit(e.target.parentElement.parentElement.parentElement.id);
    console.log(e.target.parentElement.parentElement.parentElement.id);
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
          text.map((inputText, i) => (
            <Container
              key={i}
              className='d-flex flex-row justify-content-between'
            >
              {edit !== String(i) ? (
                <div
                  className='mt-5'
                  id={i}
                  onClick={editTodo}
                  style={{ width: '800px' }}
                >
                  <ToDoItem value={inputText} />
                </div>
              ) : (
                <Container>
                  <Card>
                    <Card.Body>
                      {' '}
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
                            style={{ width: '800px', height: '8vh' }}
                            id={i}
                          />
                        </Form.Group>
                      </Form>
                    </Card.Body>
                  </Card>
                </Container>
              )}

              <Button
                key={uuid()}
                className='btn-danger w-25 mt-5'
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
