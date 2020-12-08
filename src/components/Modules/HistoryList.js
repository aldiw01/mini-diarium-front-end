import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Collapse, ListGroup, ListGroupItem, ListGroupItemHeading, Row } from 'reactstrap';
import PropTypes from 'prop-types';
import AuthService from 'server/AuthService';

const defaultProps = {
  ACCESS_ROLES_READ: [
    "1", "2A1", "2A2", "2B", "2C", "3A", "3B", "3C"
  ].toString(),
  AUTHORIZED_ROLE: ""
};

const propTypes = {
  ACCESS_ROLES_READ: PropTypes.string,
  AUTHORIZED_ROLE: PropTypes.string,
  data: PropTypes.any
};

class HistoryList extends Component {
  constructor(props) {
    super(props);
    this.Auth = new AuthService();
    this.state = {
      collapse: false
    }
  }

  toggle = () => {
    this.setState({
      collapse: !this.state.collapse
    });
  }

  render() {

    const { ACCESS_ROLES_READ, AUTHORIZED_ROLE, data } = this.props;
    const role = this.Auth.getProfile().role

    return (
      <Row>
        <Col xs="12">
          <Card>
            <CardHeader>
              <i className="fa fa-history"></i><strong>Record History</strong>
              <div className="card-header-actions">
                {/*eslint-disable-next-line*/}
                <a className="card-header-action btn btn-minimize" data-target="#details" onClick={this.toggle}><i className={this.state.collapse ? "icon-arrow-up" : "icon-arrow-down"}></i></a>
              </div>
            </CardHeader>
            <Collapse isOpen={this.state.collapse} id="details">
              <CardBody>
                {ACCESS_ROLES_READ.includes(role) || role === AUTHORIZED_ROLE ?
                  <ListGroup>
                    {data[0].reference_id ?
                      data.map((item, i) =>
                        <ListGroupItem action key={i}>
                          <div className="d-flex w-100 justify-content-between">
                            <ListGroupItemHeading>{item.action}</ListGroupItemHeading>
                            <small>{new Date(item.created).toLocaleString('en-GB')}</small>
                          </div>
                          <span>
                            {item.name + " " + item.info}
                            {item.message ? <span className="font-weight-bold">{" : " + item.message}</span> : ""}
                          </span>
                        </ListGroupItem>
                      ) : "No record found"
                    }
                  </ListGroup>
                  : "Not Authorized, please contact web admin"
                }
              </CardBody>
            </Collapse>
          </Card>
        </Col>
      </Row>
    );
  }
}

HistoryList.defaultProps = defaultProps;
HistoryList.propTypes = propTypes;

export default HistoryList;