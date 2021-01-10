import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, ButtonGroup, Card, CardBody, CardHeader, Col, ListGroup, ListGroupItem, ListGroupItemText, Row } from 'reactstrap';
import PropTypes from 'prop-types';
import moment from 'moment';
import AddComment from 'components/Modals/Comments/AddComment';

const propTypes = {
  directorate: PropTypes.object,
  directorateReply: PropTypes.string,
  latest: PropTypes.object,
  latestReply: PropTypes.string,
  top: PropTypes.object,
  topReply: PropTypes.string
};

class Headlines extends Component {
  constructor(props) {
    super(props)
    this.state = {
      comment: false,
      myComment: ""
    }
  }

  handleComment = (emoji) => {
    this.setState({
      myComment: this.state.myComment + emoji.native
    })
  }

  toggle = () => {
    this.setState({
      comment: !this.state.comment,
    });
  }

  render() {

    const { directorate, directorateReply, latest, latestReply, top, topReply } = this.props;

    const addButton = {
      position: "absolute",
      right: "20px",
      top: "5px",
    }

    return (
      <React.Fragment>
        <Card>
          <CardHeader>
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
                    <img src={process.env.REACT_APP_API_PATH + '/uploads/users/' + top.photo} className="img-avatar position-absolute" style={{ objectFit: "cover", height: "36px", width: "36px" }} alt={top.photo} />
                  </Col>
                  <Col xs="10" className="p-0">
                    <strong>{top.name}</strong>
                    <small> {moment(top.createdAt).format("lll")}</small>
                    <p>Directorate {top.directorate}</p>
                  </Col>
                  <Col xs="12">
                    <ListGroupItemText>
                      {top.message}
                    </ListGroupItemText>
                  </Col>
                </Row>
                <ButtonGroup>
                  <Button color="primary" title="Upvote"><i className="icon-arrow-up" /> {top.reactions}</Button>
                  <Button title="Downvote"><i className="icon-arrow-down" /></Button>
                </ButtonGroup>
                <Button title="Comments" className="btn ml-2" onClick={this.toggle}><i className="icon-bubble" /> {topReply} Reply</Button>
              </ListGroupItem>

              <strong className="pt-2">Top by your directorate</strong>
              <ListGroupItem action>
                <Row>
                  <Col xs="2">
                    <img src={process.env.REACT_APP_API_PATH + '/uploads/users/' + directorate.photo} className="img-avatar position-absolute" style={{ objectFit: "cover", height: "36px", width: "36px" }} alt={directorate.photo} />
                  </Col>
                  <Col xs="10" className="p-0">
                    <strong>{directorate.name}</strong>
                    <small> {moment(directorate.createdAt).format("lll")}</small>
                    <p>Directorate {directorate.directorate}</p>
                  </Col>
                  <Col xs="12">
                    <ListGroupItemText>
                      {directorate.message}
                    </ListGroupItemText>
                  </Col>
                </Row>
                <ButtonGroup>
                  <Button color="primary" title="Upvote"><i className="icon-arrow-up" /> {directorate.reactions}</Button>
                  <Button title="Downvote"><i className="icon-arrow-down" /></Button>
                </ButtonGroup>
                <Button title="Comments" className="btn ml-2" onClick={this.toggle}><i className="icon-bubble" /> {directorateReply} Reply</Button>
              </ListGroupItem>

              <strong className="pt-2">Latest</strong>
              <ListGroupItem action>
                <Row>
                  <Col xs="2">
                    <img src={process.env.REACT_APP_API_PATH + '/uploads/users/' + latest.photo} className="img-avatar position-absolute" style={{ objectFit: "cover", height: "36px", width: "36px" }} alt={latest.photo} />
                  </Col>
                  <Col xs="10" className="p-0">
                    <strong>{latest.name}</strong>
                    <small> {moment(latest.createdAt).format("lll")}</small>
                    <p>Directorate {latest.directorate}</p>
                  </Col>
                  <Col xs="12">
                    <ListGroupItemText>
                      {latest.message}
                    </ListGroupItemText>
                  </Col>
                </Row>
                <ButtonGroup>
                  <Button color="primary" title="Upvote"><i className="icon-arrow-up" /> {latest.reactions}</Button>
                  <Button title="Downvote"><i className="icon-arrow-down" /></Button>
                </ButtonGroup>
                <Button title="Comments" className="btn ml-2" onClick={this.toggle}><i className="icon-bubble" /> {latestReply} Reply</Button>
              </ListGroupItem>

              <AddComment
                comment={this.state.comment}
                data={top}
                handleComment={this.handleComment}
                myComment={this.state.myComment}
                toggleComment={this.toggle}
              />

            </ListGroup>
          </CardBody>
        </Card>
      </React.Fragment>
    );
  }
}

Headlines.propTypes = propTypes;

export default Headlines;