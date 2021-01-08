import React, { Component } from 'react';
import { Button, Card, CardBody, CardHeader, Col, ListGroup, ListGroupItem, ListGroupItemText, Row } from 'reactstrap';
import PropTypes from 'prop-types';
import moment from 'moment';

const propTypes = {
  profile: PropTypes.object,
  title: PropTypes.string,
};

class Headlines extends Component {
  render() {

    const { profile, title } = this.props;

    return (
      <React.Fragment>
        <Card>
          <CardHeader className="bg-danger">
            <i className="fa fa-star"></i><strong>Curhat Headlines</strong>
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
                <Button className="btn"><i className="fa fa-thumbs-o-up" /> 77 Like</Button>
                <Button className="btn ml-2"><i className="fa fa-comment-o" /> 21 Reply</Button>
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
                <Button className="btn"><i className="fa fa-thumbs-o-up" /> 67 Like</Button>
                <Button className="btn ml-2"><i className="fa fa-comment-o" /> 13 Reply</Button>
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
                <Button className="btn"><i className="fa fa-thumbs-o-up" /> 0 Like</Button>
                <Button className="btn ml-2"><i className="fa fa-comment-o" /> 0 Reply</Button>
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