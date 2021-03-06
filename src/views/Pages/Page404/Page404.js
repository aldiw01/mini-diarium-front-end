import React, { Component } from 'react';
import { Button, Col, Container, Row } from 'reactstrap';
import { withRouter } from 'react-router-dom';

class Page404 extends Component {
  render() {
    return (
      <div style={{ transform: "translateY(125%)" }}>
        <Container>
          <Row className="justify-content-center">
            <Col md="6">
              <div className="clearfix">
                <h1 className="float-left display-3 mr-4">404</h1>
                <h4 className="pt-3">Oops! You're lost.</h4>
                <p className="text-muted float-left">The page you are looking for was not found.</p>
              </div>
              <div className="text-center">
                <Button className="align-center mt-3" onClick={this.props.history.goBack}>Go Back</Button>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default withRouter(Page404);
