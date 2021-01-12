import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, ButtonGroup, CardBody, Col, DropdownMenu, DropdownToggle, Form, Input, ListGroupItemText, Modal, ModalBody, Nav, Row } from 'reactstrap';
import { AppHeaderDropdown } from '@coreui/react';
import moment from 'moment';
import { Picker } from 'emoji-mart';
import axios from 'axios';

const propTypes = {
  comment: PropTypes.bool,
  countReply: PropTypes.number,
  data: PropTypes.object,
  handleChange: PropTypes.func,
  handleComment: PropTypes.func,
  handleEmoji: PropTypes.func,
  loader: PropTypes.bool,
  myComment: PropTypes.string,
  toggleComment: PropTypes.func
};

class AddComment extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      emoji: false
    }
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.data !== prevProps.data || this.props.loader !== prevProps.loader) {
      this.getData();
    }
  }

  getData = () => {
    axios.get(process.env.REACT_APP_API_PATH + '/posts/comments/' + this.props.data.id)
      .then(res => {
        this.setState({ data: res.data });
      })
      .catch(error => {
        this.setState({ data: [] });
        console.log(error);
      });
  }

  toggle = () => {
    this.setState({
      emoji: !this.state.emoji,
    });
  }

  render() {

    const { comment, countReply, data, handleChange, handleComment, handleEmoji, myComment, toggleComment } = this.props;

    return (
      <Modal isOpen={comment} toggle={() => toggleComment(countReply, data)} className={'modal-danger modal-lg'}>
        <Form encType="multipart/form-data" className="form-horizontal">
          <ModalBody>

            <Row>
              <Col xs="1">
                <img src={process.env.REACT_APP_API_PATH + '/uploads/users/' + data.photo} className="img-avatar position-absolute" style={{ objectFit: "cover", height: "36px", width: "36px" }} alt={data.photo} />
              </Col>
              <Col xs="11" className="p-0">
                <strong>{data.name}</strong>
                <small> {moment(data.createdAt).format("lll")}</small>
                <p>Directorate {data.directorate}</p>
              </Col>
              <Col xs="12">
                <ListGroupItemText>
                  {data.message}
                </ListGroupItemText>
              </Col>
            </Row>
            <ButtonGroup>
              <Button type="button" color="primary" title="Upvote"><i className="icon-arrow-up" /> {data.reactions}</Button>
              <Button type="button" title="Downvote"><i className="icon-arrow-down" /></Button>
            </ButtonGroup>
            <Button type="button" title="Comments" className="btn ml-2"><i className="icon-bubble" /> {countReply} Reply</Button>

            <div className="mt-2">
              <hr />
              <strong>Comments:</strong>
              {this.state.data.map((item, i) => (
                <div key={i}>
                  <hr />
                  <Row>
                    <Col xs="1">
                      <img src={process.env.REACT_APP_API_PATH + '/uploads/users/' + item.photo} className="img-avatar position-absolute" style={{ objectFit: "cover", height: "36px", width: "36px" }} alt={item.photo} />
                    </Col>
                    <Col xs="11" className="p-0">
                      <strong>{item.name}</strong>
                      <small> {moment(item.createdAt).format("lll")}</small>
                      <p>Directorate {item.directorate}</p>
                    </Col>
                    <Col xs="12">
                      <ListGroupItemText>
                        {item.message}
                      </ListGroupItemText>
                    </Col>
                  </Row>
                  <ButtonGroup>
                    <Button type="button" color="primary" title="Upvote"><i className="icon-arrow-up" /> {item.reactions}</Button>
                    <Button type="button" title="Downvote"><i className="icon-arrow-down" /></Button>
                  </ButtonGroup>
                </div>
              ))}
            </div>

            <Row>
              <Col className="mb-n3">
                <CardBody className="px-0 pb-1">
                  <Input type="textarea" onChange={handleChange} placeholder="Post your comment!" name="myComment" value={myComment} required />
                </CardBody>
                <div className="py-1 border-top border-danger">
                  <Button color={myComment ? "danger" : "light"} disabled={myComment ? false : true} className="btn float-right" onClick={(e) => handleComment(e, data.id)}>
                    <i className="icon-paper-plane"></i>
                  </Button>
                  <Nav className="mt-n2 float-right" navbar>
                    <AppHeaderDropdown direction="down">
                      <DropdownToggle nav>
                        <Button color="light" className="btn float-right mb-1">
                          <i className="icon-emotsmile"></i>
                        </Button>
                      </DropdownToggle>
                      <DropdownMenu right style={{ right: 'auto' }}>
                        <Picker native color="#f86c6b" theme="dark" title="Choose emoji" emoji="wink" onSelect={(emoji) => { handleEmoji(emoji) }} />
                      </DropdownMenu>
                    </AppHeaderDropdown>
                  </Nav>
                </div>
              </Col>
            </Row>

          </ModalBody>
        </Form>
      </Modal>
    );
  }
}

AddComment.propTypes = propTypes;

export default AddComment;