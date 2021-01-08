import React, { Component } from 'react';
import { Col, Row } from 'reactstrap';
import PropTypes from 'prop-types';
import moment from 'moment';

const propTypes = {
  data: PropTypes.array,
  now: PropTypes.string,
  user: PropTypes.string
};

class CheckOut extends Component {
  render() {

    const { data, now, user } = this.props;

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
            {moment(data[1].created).format("LLL")}
          </Col>
        </Row>
        <Row className="pt-3">
          <Col xs="12" xl="12">
            <h3>You have checked out today, at</h3>
          </Col>
        </Row>
        <Row className="pt-3">
          <Col xs="12" xl="12">
            {moment(data[0].created).format("LLL")}
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

CheckOut.propTypes = propTypes;

export default CheckOut;