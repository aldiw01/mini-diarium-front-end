import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, CardBody, CardHeader, Col, ListGroup, ListGroupItem, ListGroupItemText, Row } from 'reactstrap';
import PropTypes from 'prop-types';
import moment from 'moment';

const propTypes = {
  profile: PropTypes.object,
};

class Headlines extends Component {
  render() {

    const { profile } = this.props;

    const addButton = {
      position: "absolute",
      right: "20px",
      top: "5px",
    }

    return (
      <React.Fragment>
        <Card>
          <CardHeader className="bg-danger">
            <i className="fa fa-star"></i><strong>Curhat Headlines</strong>
            <Link to="/curhat">
              <Button color="dark" style={addButton} active tabIndex={-1}>Post Curhat <i className="icon-paper-plane" /></Button>
            </Link>
          </CardHeader>
          <CardBody>
            <ListGroup>

              <strong>Top Trending</strong>
              <ListGroupItem action>
                <Row>
                  <Col xs="2">
                    <img src={process.env.REACT_APP_API_PATH + '/uploads/users/' + profile.photo} className="img-avatar position-absolute" style={{ objectFit: "cover", height: "36px", width: "36px" }} alt={profile.photo} />
                  </Col>
                  <Col xs="10" className="p-0">
                    <strong>{profile.name}</strong>
                    <small> {moment().format("lll")}</small>
                    <p>{profile.directorate}</p>
                  </Col>
                  <Col xs="12">
                    <ListGroupItemText>
                      Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.
                    </ListGroupItemText>
                  </Col>
                </Row>
                <Button className="btn"><i className="icon-like" /> 77 Like</Button>
                <Button className="btn ml-2"><i className="icon-bubble" /> 21 Reply</Button>
              </ListGroupItem>

              <strong className="pt-2">Top by your directorate</strong>
              <ListGroupItem action>
                <Row>
                  <Col xs="2">
                    <img src={process.env.REACT_APP_API_PATH + '/uploads/users/' + profile.photo} className="img-avatar position-absolute" style={{ objectFit: "cover", height: "36px", width: "36px" }} alt={profile.photo} />
                  </Col>
                  <Col xs="10" className="p-0">
                    <strong>{profile.name}</strong>
                    <small> {moment().format("lll")}</small>
                    <p>{profile.directorate}</p>
                  </Col>
                  <Col xs="12">
                    <ListGroupItemText>
                      Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.
                    </ListGroupItemText>
                  </Col>
                </Row>
                <Button className="btn"><i className="icon-like" /> 67 Like</Button>
                <Button className="btn ml-2"><i className="icon-bubble" /> 13 Reply</Button>
              </ListGroupItem>

              <strong className="pt-2">Latest</strong>
              <ListGroupItem action>
                <Row>
                  <Col xs="2">
                    <img src={process.env.REACT_APP_API_PATH + '/uploads/users/' + profile.photo} className="img-avatar position-absolute" style={{ objectFit: "cover", height: "36px", width: "36px" }} alt={profile.photo} />
                  </Col>
                  <Col xs="10" className="p-0">
                    <strong>{profile.name}</strong>
                    <small> {moment().format("lll")}</small>
                    <p>{profile.directorate}</p>
                  </Col>
                  <Col xs="12">
                    <ListGroupItemText>
                      Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.
                    </ListGroupItemText>
                  </Col>
                </Row>
                <Button className="btn"><i className="icon-like" /> 0 Like</Button>
                <Button className="btn ml-2"><i className="icon-bubble" /> 0 Reply</Button>
              </ListGroupItem>

            </ListGroup>
          </CardBody>
        </Card>
      </React.Fragment>
    );
  }
}

Headlines.propTypes = propTypes;

export default Headlines;