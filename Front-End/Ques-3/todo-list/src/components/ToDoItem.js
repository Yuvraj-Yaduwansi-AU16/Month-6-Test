import React from 'react';
import { Card, Container } from 'react-bootstrap';

function ToDoItem({ value }) {
  return (
    <Container>
      {value && (
        <Card>
          <Card.Body>{value}</Card.Body>
        </Card>
      )}
    </Container>
  );
}

export default ToDoItem;
