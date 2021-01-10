import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, ButtonGroup, CardBody, Col, DropdownMenu, DropdownToggle, Form, Input, ListGroupItemText, Modal, ModalBody, Nav, Row } from 'reactstrap';
import { AppHeaderDropdown } from '@coreui/react';
import moment from 'moment';
import { Picker } from 'emoji-mart';

const propTypes = {
  comment: PropTypes.bool,
  data: PropTypes.object,
  handleComment: PropTypes.func,
  loader: PropTypes.bool,
  myComment: PropTypes.string,
  toggleComment: PropTypes.func
};

class AddComment extends Component {
  constructor(props) {
    super(props)
    this.state = {
      emoji: false
    }
  }

  toggle = () => {
    this.setState({
      emoji: !this.state.emoji,
    });
  }

  render() {

    const { comment, data, handleComment, myComment, toggleComment } = this.props;

    return (
      <Modal isOpen={comment} toggle={toggleComment} className={'modal-danger modal-lg'}>
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
              <Button color="primary" title="Upvote"><i className="icon-arrow-up" /> {data.reactions}</Button>
              <Button title="Downvote"><i className="icon-arrow-down" /></Button>
            </ButtonGroup>
            <Button title="Comments" className="btn ml-2"><i className="icon-bubble" /> { } Reply</Button>
            <div className="mt-2">
              <h6>Comments:</h6>
              <hr />
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
                <Button color="primary" title="Upvote"><i className="icon-arrow-up" /> {data.reactions}</Button>
                <Button title="Downvote"><i className="icon-arrow-down" /></Button>
              </ButtonGroup>
            </div>

            <Row>
              <Col className="mb-n3">
                <CardBody className="px-0 pb-1">
                  <Input type="textarea" onChange={this.handleChange} placeholder="What is in your mind?" name="myComment" value={myComment} required />
                </CardBody>
                <div className="py-1 border-top border-danger">
                  <Button color={myComment ? "danger" : "light"} disabled={myComment ? false : true} className="btn float-right">
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
                        <Picker native color="#f86c6b" theme="dark" title="Choose emoji" emoji="wink" onSelect={(emoji) => { handleComment(emoji) }} />
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