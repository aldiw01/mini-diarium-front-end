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
  topReply: PropTypes.number,
  votes: PropTypes.array
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

  checkClicked = (votes, id) => {
    var vote = votes.filter((item, i) => {
      return id === item.post_id
    })
    var init = 0;
    var sum = vote.reduce((a, b) => a + b.reactions, init)
    return sum
  }

  toggle = (count, data) => {
    this.setState({
      comment: !this.state.comment,
      countReply: count,
      focus: data
    });
  }

  render() {

    const { directorate, directorateReply, handleChange, handleComment, handleDownvote, handleEmoji, handleUpvote, latest, latestReply, loader, myComment, top, topReply, votes } = this.props;

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
                {top ?
                  <React.Fragment>
                    <Row>
                      <Col xs="2">
                        <img src={`${process.env.REACT_APP_API_PATH}/uploads/users/${top.photo === "" || top.photo === undefined ? "test.jpg" : top.photo}`} className="img-avatar position-absolute" style={{ objectFit: "cover", height: "36px", width: "36px" }} alt={top.photo} />
                      </Col>
                      <Col xs="10" className="p-0">
                        <strong>{top.name === "" || top.name === undefined ? "Anon" : top.name}</strong>
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
                      <Button
                        color={this.checkClicked(votes, top.id) === 1 ? "primary" : "secondary"}
                        className="border-primary"
                        style={{ zIndex: "10" }}
                        title="Upvote"
                        onClick={(e) => handleUpvote(e, top.id)}
                        disabled={this.checkClicked(votes, top.id) === 1}
                      >
                        <i className="icon-arrow-up" /> {top.reactions}
                      </Button>
                      <Button
                        color={this.checkClicked(votes, top.id) === -1 ? "danger" : "secondary"}
                        title="Downvote"
                        onClick={(e) => handleDownvote(e, top.id)}
                        disabled={this.checkClicked(votes, top.id) === -1}
                      >
                        <i className="icon-arrow-down" />
                      </Button>
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
                        <img src={`${process.env.REACT_APP_API_PATH}/uploads/users/${directorate.photo === "" || directorate.photo === undefined ? "test.jpg" : directorate.photo}`} className="img-avatar position-absolute" style={{ objectFit: "cover", height: "36px", width: "36px" }} alt={directorate.photo} />
                      </Col>
                      <Col xs="10" className="p-0">
                        <strong>{directorate.name === "" || directorate.name === undefined ? "Anon" : directorate.name}</strong>
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
                      <Button
                        color={this.checkClicked(votes, directorate.id) === 1 ? "primary" : "secondary"}
                        className="border-primary"
                        style={{ zIndex: "10" }}
                        title="Upvote"
                        onClick={(e) => handleUpvote(e, directorate.id)}
                        disabled={this.checkClicked(votes, directorate.id) === 1}
                      >
                        <i className="icon-arrow-up" /> {directorate.reactions}
                      </Button>
                      <Button
                        color={this.checkClicked(votes, directorate.id) === -1 ? "danger" : "secondary"}
                        title="Downvote"
                        onClick={(e) => handleDownvote(e, directorate.id)}
                        disabled={this.checkClicked(votes, directorate.id) === -1}
                      >
                        <i className="icon-arrow-down" />
                      </Button>
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
                        <img src={`${process.env.REACT_APP_API_PATH}/uploads/users/${latest.photo === "" || latest.photo === undefined ? "test.jpg" : latest.photo}`} className="img-avatar position-absolute" style={{ objectFit: "cover", height: "36px", width: "36px" }} alt={latest.photo} />
                      </Col>
                      <Col xs="10" className="p-0">
                        <strong>{latest.name === "" || latest.name === undefined ? "Anon" : latest.name}</strong>
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
                      <Button
                        color={this.checkClicked(votes, latest.id) === 1 ? "primary" : "secondary"}
                        className="border-primary"
                        style={{ zIndex: "10" }}
                        title="Upvote"
                        onClick={(e) => handleUpvote(e, latest.id)}
                        disabled={this.checkClicked(votes, latest.id) === 1}
                      >
                        <i className="icon-arrow-up" /> {latest.reactions}
                      </Button>
                      <Button
                        color={this.checkClicked(votes, latest.id) === -1 ? "danger" : "secondary"}
                        title="Downvote"
                        onClick={(e) => handleDownvote(e, latest.id)}
                        disabled={this.checkClicked(votes, latest.id) === -1}
                      >
                        <i className="icon-arrow-down" />
                      </Button>
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
                handleDownvote={handleDownvote}
                handleEmoji={handleEmoji}
                handleUpvote={handleUpvote}
                loader={loader}
                myComment={myComment}
                toggleComment={this.toggle}
                votes={votes}
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