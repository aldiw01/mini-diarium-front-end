import React, { Component } from 'react';
import { Button, ButtonGroup, Card, CardBody, CardFooter, Col, DropdownMenu, DropdownToggle, Input, ListGroupItemText, Nav, NavItem, NavLink, Row, TabContent, TabPane } from 'reactstrap';
import { AppHeaderDropdown } from '@coreui/react';
import AuthService from 'server/AuthService';
import axios from 'axios';
import { Picker } from 'emoji-mart';
import moment from 'moment';
import AddComment from 'components/Modals/Comments/AddComment';
import Spinner from 'react-spinkit';

// import AddComment from 'components/Modals/Comments/AddComment';

class Curhat extends Component {

  constructor(props) {
    super(props);
    this.Auth = new AuthService();
    if (!this.Auth.loggedIn()) {
      window.location = '/login';
    }
    this.state = {
      activeTab: '1',
      anon: false,
      comment: false,
      countReply: 0,
      dataDirectorate: [],
      dataLatest: [],
      dataTop: [],
      focus: {},
      loader: false,
      myComment: '',
      myPost: '',
      post: false,
      photo: '',
      votes: []
    }
  }

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    axios.get(process.env.REACT_APP_API_PATH + '/users/' + this.Auth.getProfile().id)
      .then(res => {
        this.setState({
          photo: res.data[0].photo
        })
      })
      .catch(error => {
        this.setState({
          photo: "test.jpg"
        })
        console.log(error);
      });

    this.getPostDirectorate();
    this.getPostLatest();
    this.getPostTop();
    this.getVotes();
  }

  getPostDirectorate = () => {
    axios.get(process.env.REACT_APP_API_PATH + '/posts/directorate/' + this.Auth.getProfile().directorate)
      .then(res => {
        this.setState({
          dataDirectorate: res.data
        })
      })
      .catch(error => {
        this.setState({
          photo: "test.jpg"
        })
        console.log(error);
      });
  }

  getPostLatest = () => {
    axios.get(process.env.REACT_APP_API_PATH + '/posts/latest/all')
      .then(res => {
        this.setState({
          dataLatest: res.data
        })
      })
      .catch(error => {
        this.setState({
          photo: "test.jpg"
        })
        console.log(error);
      });
  }

  getPostTop = () => {
    axios.get(process.env.REACT_APP_API_PATH + '/posts/top/all')
      .then(res => {
        this.setState({
          dataTop: res.data
        })
      })
      .catch(error => {
        this.setState({
          photo: "test.jpg"
        })
        console.log(error);
      });
  }

  getVotes = () => {
    axios.get(process.env.REACT_APP_API_PATH + '/votes/user/' + this.Auth.getProfile().id)
      .then(res => {
        this.setState({ votes: res.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleEmoji = (emoji) => {
    this.setState({
      myComment: this.state.myComment + emoji.native
    })
  }

  handlePost = (event) => {
    this.setState({ loader: true });
    event.preventDefault();
    const req = {
      user_id: this.Auth.getProfile().id,
      photo: this.state.anon ? "" : this.state.photo,
      name: this.state.anon ? "Anon" : this.Auth.getProfile().name,
      directorate: this.Auth.getProfile().directorate,
      message: this.state.myPost,
    };
    axios.post(process.env.REACT_APP_API_PATH + '/posts', req)
      .then(() => {
        this.setState({
          loader: false,
          myPost: ""
        })
        this.getData();
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleComment = (event, id) => {
    this.setState({ loader: true });
    event.preventDefault();
    const req = {
      user_id: this.Auth.getProfile().id,
      photo: this.state.anon ? "" : this.state.photo,
      name: this.state.anon ? "" : this.Auth.getProfile().name,
      directorate: this.Auth.getProfile().directorate,
      message: this.state.myComment,
      header: id
    };
    axios.post(process.env.REACT_APP_API_PATH + '/posts/comments', req)
      .then(() => {
        this.setState({
          loader: false,
          myComment: ""
        })
        this.getData();
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleUpvote = (event, id) => {
    event.preventDefault();

    axios.post(process.env.REACT_APP_API_PATH + '/votes/add/' + this.Auth.getProfile().id + '/' + id)
      .then(() => {
        this.getData();
      })
      .catch(error => {
        alert(error);
        console.log(error);
      });
  }

  handleDownvote = (event, id) => {
    event.preventDefault();

    axios.post(process.env.REACT_APP_API_PATH + '/votes/remove/' + this.Auth.getProfile().id + '/' + id)
      .then(() => {
        this.getData();
      })
      .catch(error => {
        alert(error);
        console.log(error);
      });
  }

  toggleCheckbox = () => {
    this.setState({
      anon: !this.state.anon,
    });
  }

  toggleComment = (count, data) => {
    this.setState({
      comment: !this.state.comment,
      countReply: count,
      focus: data
    });
  }

  toggleTab = (tab) => {
    this.setState({
      activeTab: tab,
    });
  }

  checkClicked = (votes, id) => {
    var vote = votes.filter((item, i) => {
      return id === item.post_id
    })
    var init = 0;
    var sum = vote.reduce((a, b) => a + b.reactions, init)
    return sum
  }

  render() {

    const addButton = {
      right: "20px",
      top: "5px",
    }
    const photo_url = this.state.photo ? this.state.photo : "test.jpg";
    const name = this.Auth.getProfile().name.split(" ");
    const nickname = name[0].length > 3 ? name[0] : name[0] + " " + name[1];

    return (
      <div className="animated fadeIn">

        <Row>

          <Col xs="12" xl="12">
            <Card>

              <CardBody className="p-2">
                <Row className="px-2">
                  <Col xs="3" md="2" xl="1">
                    <img src={process.env.REACT_APP_API_PATH + '/uploads/users/' + photo_url} className="img-avatar position-absolute" style={{ objectFit: "cover", height: "60px", width: "60px" }} alt={photo_url} />
                  </Col>
                  <Col xs="9" md="10" xl="11" className="p-0">
                    <h4 className="m-0">{this.Auth.getProfile().name}</h4>
                    <p>Directorate {this.Auth.getProfile().directorate}</p>
                  </Col>
                  <Col xs="12 mt-2">
                    <Input type="textarea" onChange={this.handleChange} placeholder={"What is in your mind " + nickname + "?"} name="myPost" value={this.state.myPost} required />
                  </Col>
                </Row>
              </CardBody>

              <CardFooter className="py-1 card-accent-danger">
                <div style={addButton}>
                  <Button color={this.state.myPost ? "danger" : "light"} disabled={this.state.myPost ? false : true} className="btn float-right" onClick={this.handlePost}>
                    <i className="icon-paper-plane"></i>
                  </Button>
                  <Nav className="mt-n2 float-right" navbar>
                    <AppHeaderDropdown direction="down">
                      <DropdownToggle nav>
                        <Button color="light" className="btn float-right">
                          <i className="icon-emotsmile"></i>
                        </Button>
                      </DropdownToggle>
                      <DropdownMenu right style={{ right: 'auto' }}>
                        <Picker native color="#f86c6b" theme="dark" title="Choose emoji" emoji="wink" onSelect={(emoji) => { this.setState({ myPost: this.state.myPost + emoji.native }) }} />
                      </DropdownMenu>
                    </AppHeaderDropdown>
                  </Nav>
                  {this.state.loader ? <Spinner name='double-bounce' fadeIn="quarter" className="ml-auto float-right mt-1" /> : ""}
                  <div className="custom-control custom-checkbox pt-2 position-absolute">
                    <input type="checkbox" className="custom-control-input" id="customCheck1" onClick={this.toggleCheckbox} />
                    <label className="custom-control-label" htmlFor="customCheck1">Send as Anon</label>
                  </div>
                </div>
              </CardFooter>

            </Card>
          </Col>

          <Col xs="12" xl="12">
            <Card>
              <CardBody>
                <Col xs="12" className="p-0 m-0">
                  <Nav tabs>
                    <NavItem>
                      <NavLink
                        active={this.state.activeTab === '1'}
                        onClick={() => { this.toggleTab('1'); }}
                      >
                        <i className="icon-fire"></i> <span className={this.state.activeTab === '1' ? 'font-weight-bold' : ''}> Top Trending</span>
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        active={this.state.activeTab === '2'}
                        onClick={() => { this.toggleTab('2'); }}
                      >
                        <i className="icon-organization"></i> <span className={this.state.activeTab === '2' ? 'font-weight-bold' : ''}> My Directorate</span>
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        active={this.state.activeTab === '3'}
                        onClick={() => { this.toggleTab('3'); }}
                      >
                        <i className="icon-calendar"></i> <span className={this.state.activeTab === '3' ? 'font-weight-bold' : ''}> Latest</span>
                      </NavLink>
                    </NavItem>
                  </Nav>
                  <TabContent activeTab={this.state.activeTab}>

                    <TabPane tabId="1">
                      {this.state.dataTop.map((item, i) => (
                        <div key={i}>
                          <Row>
                            <Col xs="3" md="2" xl="1">
                              <img src={`${process.env.REACT_APP_API_PATH}/uploads/users/${item.post.photo === "" || item.post.photo === undefined ? "test.jpg" : item.post.photo}`} className="img-avatar position-absolute" style={{ objectFit: "cover", height: "48px", width: "48px" }} alt={item.post.photo} />
                            </Col>
                            <Col xs="9" md="10" xl="11" className="p-0">
                              <strong>{item.post.name === "" || item.post.name === undefined ? "Anon" : item.post.name}</strong>
                              <small> {moment(item.post.createdAt).format("lll")}</small>
                              <p>Directorate {item.post.directorate}</p>
                            </Col>
                            <Col xs="12">
                              <ListGroupItemText>
                                {item.post.message}
                              </ListGroupItemText>
                            </Col>
                          </Row>

                          <ButtonGroup>
                            <Button
                              color={this.checkClicked(this.state.votes, item.post.id) === 1 ? "primary" : "secondary"}
                              className="border-primary"
                              style={{ zIndex: "10" }}
                              title="Upvote"
                              onClick={(e) => this.handleUpvote(e, item.post.id)}
                              disabled={this.checkClicked(this.state.votes, item.post.id) === 1}
                            >
                              <i className="icon-arrow-up" /> {item.post.reactions}
                            </Button>
                            <Button
                              color={this.checkClicked(this.state.votes, item.post.id) === -1 ? "danger" : "secondary"}
                              title="Downvote"
                              onClick={(e) => this.handleDownvote(e, item.post.id)}
                              disabled={this.checkClicked(this.state.votes, item.post.id) === -1}
                            >
                              <i className="icon-arrow-down" />
                            </Button>
                          </ButtonGroup>

                          <Button title="Comments" className="btn ml-2" onClick={() => this.toggleComment(item.comments.length, item.post)}><i className="icon-bubble" /> {item.comments.length} Reply</Button>
                          <hr />
                        </div>
                      ))}
                    </TabPane>

                    <TabPane tabId="2">
                      {this.state.dataDirectorate.map((item, i) => (
                        <div key={i}>
                          <Row>
                            <Col xs="3" md="2" xl="1">
                              <img src={`${process.env.REACT_APP_API_PATH}/uploads/users/${item.post.photo === "" || item.post.photo === undefined ? "test.jpg" : item.post.photo}`} className="img-avatar position-absolute" style={{ objectFit: "cover", height: "48px", width: "48px" }} alt={item.post.photo} />
                            </Col>
                            <Col xs="9" md="10" xl="11" className="p-0">
                              <strong>{item.post.name === "" || item.post.name === undefined ? "Anon" : item.post.name}</strong>
                              <small> {moment(item.post.createdAt).format("lll")}</small>
                              <p>Directorate {item.post.directorate}</p>
                            </Col>
                            <Col xs="12">
                              <ListGroupItemText>
                                {item.post.message}
                              </ListGroupItemText>
                            </Col>
                          </Row>
                          <ButtonGroup>
                            <Button
                              color={this.checkClicked(this.state.votes, item.post.id) === 1 ? "primary" : "secondary"}
                              className="border-primary"
                              style={{ zIndex: "10" }}
                              title="Upvote"
                              onClick={(e) => this.handleUpvote(e, item.post.id)}
                              disabled={this.checkClicked(this.state.votes, item.post.id) === 1}
                            >
                              <i className="icon-arrow-up" /> {item.post.reactions}
                            </Button>
                            <Button
                              color={this.checkClicked(this.state.votes, item.post.id) === -1 ? "danger" : "secondary"}
                              title="Downvote"
                              onClick={(e) => this.handleDownvote(e, item.post.id)}
                              disabled={this.checkClicked(this.state.votes, item.post.id) === -1}
                            >
                              <i className="icon-arrow-down" />
                            </Button>
                          </ButtonGroup>
                          <Button title="Comments" className="btn ml-2" onClick={() => this.toggleComment(item.comments.length, item.post)}><i className="icon-bubble" /> {item.comments.length} Reply</Button>
                          <hr />
                        </div>
                      ))}
                    </TabPane>

                    <TabPane tabId="3">
                      {this.state.dataLatest.map((item, i) => (
                        <div key={i}>
                          <Row>
                            <Col xs="3" md="2" xl="1">
                              <img src={`${process.env.REACT_APP_API_PATH}/uploads/users/${item.post.photo === "" || item.post.photo === undefined ? "test.jpg" : item.post.photo}`} className="img-avatar position-absolute" style={{ objectFit: "cover", height: "48px", width: "48px" }} alt={item.post.photo} />
                            </Col>
                            <Col xs="9" md="10" xl="11" className="p-0">
                              <strong>{item.post.name === "" || item.post.name === undefined ? "Anon" : item.post.name}</strong>
                              <small> {moment(item.post.createdAt).format("lll")}</small>
                              <p>Directorate {item.post.directorate}</p>
                            </Col>
                            <Col xs="12">
                              <ListGroupItemText>
                                {item.post.message}
                              </ListGroupItemText>
                            </Col>
                          </Row>
                          <ButtonGroup>
                            <Button
                              color={this.checkClicked(this.state.votes, item.post.id) === 1 ? "primary" : "secondary"}
                              className="border-primary"
                              style={{ zIndex: "10" }}
                              title="Upvote"
                              onClick={(e) => this.handleUpvote(e, item.post.id)}
                              disabled={this.checkClicked(this.state.votes, item.post.id) === 1}
                            >
                              <i className="icon-arrow-up" /> {item.post.reactions}
                            </Button>
                            <Button
                              color={this.checkClicked(this.state.votes, item.post.id) === -1 ? "danger" : "secondary"}
                              title="Downvote"
                              onClick={(e) => this.handleDownvote(e, item.post.id)}
                              disabled={this.checkClicked(this.state.votes, item.post.id) === -1}
                            >
                              <i className="icon-arrow-down" />
                            </Button>
                          </ButtonGroup>
                          <Button title="Comments" className="btn ml-2" onClick={() => this.toggleComment(item.comments.length, item.post)}><i className="icon-bubble" /> {item.comments.length} Reply</Button>
                          <hr />
                        </div>
                      ))}
                    </TabPane>

                  </TabContent>
                </Col>
              </CardBody>
            </Card>
          </Col>

        </Row>

        <AddComment
          comment={this.state.comment}
          countReply={this.state.countReply}
          data={this.state.focus}
          loader={this.state.loader}
          handleChange={this.handleChange}
          handleComment={this.handleComment}
          handleDownvote={this.handleDownvote}
          handleEmoji={this.handleEmoji}
          handleUpvote={this.handleUpvote}
          myComment={this.state.myComment}
          toggleComment={this.toggleComment}
          votes={this.state.votes}
        />


      </div>
    );
  }
}

export default Curhat;
