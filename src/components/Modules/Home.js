import React, { Component } from 'react';
import { Button, Col, Row } from 'reactstrap';
import PropTypes from 'prop-types';

const propTypes = {
  now: PropTypes.string,
  toggleCheckin: PropTypes.func,
  user: PropTypes.string
};

class Home extends Component {
  render() {

    const { now, toggleCheckin, user } = this.props;

    return (
      <React.Fragment>
        <Row>
          <Col xs="12" xl="12" className="text-left">
            Welcome, <strong>{user}</strong>
          </Col>
        </Row>
        <Row className="pt-3">
          <Col xs="12" xl="12">
            <h3>You're not yet checked in today, wanna check?</h3>
          </Col>
        </Row>
        <Row className="pt-3">
          <Col xs="12" xl="12">
            <Button className="btn btn-lg" color="success" type="button" onClick={toggleCheckin}>
              <strong>Check In</strong>
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

Home.propTypes = propTypes;

export default Home;