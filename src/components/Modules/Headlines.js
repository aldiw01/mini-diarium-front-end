import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, ButtonGroup, Card, CardBody, CardHeader, Col, ListGroup, ListGroupItem, ListGroupItemText, Row } from 'reactstrap';
import PropTypes from 'prop-types';
import moment from 'moment';
import AddComment from 'components/Modals/Comments/AddComment';

const propTypes = {
  directorate: PropTypes.object,
  directorateReply: PropTypes.number,
  handleChange: PropTypes.func,
  handleComment: PropTypes.func,
  handleDownvote: PropTypes.func,
  handleEmoji: PropTypes.func,
  handleUpvote: PropTypes.func,
  latest: PropTypes.object,
  latestReply: PropTypes.number,
  loader: PropTypes.bool,
  myComment: PropTypes.string,
  top: PropTypes.object,
  topReply: PropTypes.number
};

class Headlines extends Component {
  constructor(props) {
    super(props)
    this.state = {
      comment: false,
      countReply: 0,
      focus: {}
    }
  }

  toggle = (count, data) => {
    this.setState({
      comment: !this.state.comment,
      countReply: count,
      focus: data
    });
  }

  render() {

    const { directorate, directorateReply, handleChange, handleComment, handleDownvote, handleEmoji, handleUpvote, latest, latestReply, loader, myComment, top, topReply } = this.props;

    const addButton = {
      position: "absolute",
      right: "20px",
      top: "5px",
    }

    const topPhoto = top.photo === "" || top.photo === undefined ? "test.jpg" : top.photo;
    const topName = top.name === "" || top.name === undefined ? "Anon" : top.name;
    const directoratePhoto = directorate.photo === "" || directorate.photo === undefined ? "test.jpg" : directorate.photo;
    const directorateName = directorate.name === "" || directorate.name === undefined ? "Anon" : directorate.name;
    const latestPhoto = latest.photo === "" || latest.photo === undefined ? "test.jpg" : latest.photo;
    const latestName = latest.name === "" || latest.name === undefined ? "Anon" : latest.name;

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
                {top ?
                  <React.Fragment>
                    <Row>
                      <Col xs="2">
                        <img src={process.env.REACT_APP_API_PATH + '/uploads/users/' + topPhoto} className="img-avatar position-absolute" style={{ objectFit: "cover", height: "36px", width: "36px" }} alt={topPhoto} />
                      </Col>
                      <Col xs="10" className="p-0">
                        <strong>{topName}</strong>
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
                      <Button color="primary" title="Upvote" onClick={(e) => handleUpvote(e, top.id, 1)}><i className="icon-arrow-up" /> {top.reactions}</Button>
                      <Button title="Downvote" onClick={(e) => handleDownvote(e, top.id, 1)}><i className="icon-arrow-down" /></Button>
                    </ButtonGroup>
                    <Button title="Comments" className="btn ml-2" onClick={() => this.toggle(topReply, top)}><i className="icon-bubble" /> {topReply} Reply</Button>
                  </React.Fragment>
                  : "Headline Not Found"
                }
              </ListGroupItem>

              <strong className="pt-2">Top by your directorate</strong>
              <ListGroupItem action>
                {directorate ?
                  <React.Fragment>
                    <Row>
                      <Col xs="2">
                        <img src={process.env.REACT_APP_API_PATH + '/uploads/users/' + directoratePhoto} className="img-avatar position-absolute" style={{ objectFit: "cover", height: "36px", width: "36px" }} alt={directoratePhoto} />
                      </Col>
                      <Col xs="10" className="p-0">
                        <strong>{directorateName}</strong>
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
                      <Button color="primary" title="Upvote" onClick={(e) => handleUpvote(e, directorate.id, 2)}><i className="icon-arrow-up" /> {directorate.reactions}</Button>
                      <Button title="Downvote" onClick={(e) => handleDownvote(e, directorate.id, 2)}><i className="icon-arrow-down" /></Button>
                    </ButtonGroup>
                    <Button title="Comments" className="btn ml-2" onClick={() => this.toggle(directorateReply, directorate)}><i className="icon-bubble" /> {directorateReply} Reply</Button>
                  </React.Fragment>
                  : "Headline Not Found"
                }
              </ListGroupItem>

              <strong className="pt-2">Latest</strong>
              <ListGroupItem action>
                {latest ?
                  <React.Fragment>
                    <Row>
                      <Col xs="2">
                        <img src={process.env.REACT_APP_API_PATH + '/uploads/users/' + latestPhoto} className="img-avatar position-absolute" style={{ objectFit: "cover", height: "36px", width: "36px" }} alt={latestPhoto} />
                      </Col>
                      <Col xs="10" className="p-0">
                        <strong>{latestName}</strong>
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
                      <Button color="primary" title="Upvote" onClick={(e) => handleUpvote(e, latest.id, 3)}><i className="icon-arrow-up" /> {latest.reactions}</Button>
                      <Button title="Downvote" onClick={(e) => handleDownvote(e, latest.id, 3)}><i className="icon-arrow-down" /></Button>
                    </ButtonGroup>
                    <Button title="Comments" className="btn ml-2" onClick={() => this.toggle(latestReply, latest)}><i className="icon-bubble" /> {latestReply} Reply</Button>
                  </React.Fragment>
                  : "Headline Not Found"
                }
              </ListGroupItem>

              <AddComment
                comment={this.state.comment}
                countReply={this.state.countReply}
                data={this.state.focus}
                handleComment={handleComment}
                handleChange={handleChange}
                handleEmoji={handleEmoji}
                loader={loader}
                myComment={myComment}
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