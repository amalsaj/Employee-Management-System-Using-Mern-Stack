import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

function App() {
  return (
    <Container
      fluid
      style={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 0,
        margin: 0,
      }}
    >
      <Row style={{ width: '50%' }}>
        <Col xs={12} md={4} style={{ backgroundColor: 'blue', minHeight: '100vh' }}>
          {/* First column with full blue color */}
          <div style={{ color: 'white', textAlign: 'center', padding: '20px' }}>
            <h3>Full Blue Color</h3>
            <p>This column is full blue color.</p>
          </div>
        </Col>
        <Col xs={12} md={8}>
          {/* Second column with a card */}
          <Card style={{ margin: '20px', minHeight: '80vh' }}>
            <Card.Body>
              <Card.Title>Card</Card.Title>
              <Card.Text>This column contains a card.</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
