import { Container, Row, Col } from 'react-bootstrap';

const ContentContainer = ({ children }) => {
  return (
    <Container>
      <Row className='justify-content-md-center'>
        <Col className='card w-full'>
          {children}
        </Col>
      </Row>
    </Container>
  );
};

export default ContentContainer;
