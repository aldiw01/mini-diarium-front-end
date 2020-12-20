import React, { Component } from 'react';
import { Button, Col, Row } from 'reactstrap';
import PropTypes from 'prop-types';

const propTypes = {
  data: PropTypes.array,
  now: PropTypes.string,
  toggleCheckout: PropTypes.func,
  user: PropTypes.string
};

class CheckIn extends Component {
  render() {

    const { data, now, toggleCheckout, user } = this.props;

    return (
      <React.Fragment>
        <Row>
          <Col xs="12" xl="12" className="text-left">
            Welcome, <strong>{user}</strong>
          </Col>
        </Row>
        <Row className="pt-3">
          <Col xs="12" xl="12">
            <h3>You have checked in today, at</h3>
          </Col>
        </Row>
        <Row className="pt-3">
          <Col xs="12" xl="12">
            {new Date(data[0].created).toLocaleString()}
          </Col>
        </Row>
        <Row className="pt-3">
          <Col xs="12" xl="12">
            Do you want to check out?
          </Col>
        </Row>
        <Row className="pt-3">
          <Col xs="12" xl="12">
            <Button className="btn btn-lg" color="danger" type="button" onClick={toggleCheckout}>
              <strong>Check Out</strong>
            </Button>
          </Col>
        </Row>
        <Row className="pt-4">
          <Col xs="12" xl="12">
            {now}
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

CheckIn.propTypes = propTypes;

export default CheckIn;