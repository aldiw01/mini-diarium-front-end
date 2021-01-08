import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader, Form } from 'reactstrap';
import Spinner from 'react-spinkit';

const propTypes = {
  comment: PropTypes.bool,
  handleComment: PropTypes.func,
  loader: PropTypes.bool,
  toggleComment: PropTypes.func
};

class AddComment extends Component {

  render() {

    const { comment, handleComment, loader, toggleComment } = this.props;

    return (
      <Modal isOpen={comment} toggle={toggleComment} className={'modal-danger modal-lg'}>
        <Form encType="multipart/form-data" className="form-horizontal">
          <ModalHeader toggle={toggleComment}>Add Comment</ModalHeader>
          <ModalBody>
            <div className="media">
              <img style={{ "border-radius": "50%" }} src={process.env.PUBLIC_URL + '/assets/img/avatars/1.jpg'} class="mr-3" alt="..."></img>
              <div className="media-body">
                <h5 className="mt-0">Anonymous</h5>
                <i>"Kerja sering sampe begadang malam-malam kita gk dapat uang lembur nih Pak?"</i>
              </div>
            </div>
            <hr></hr>
            <div className="mt-2">
              <h6>Comments:</h6>
              <br></br>
              <p><b>Anonymous </b>Setuju bang</p>
              <p><b>Anonymous </b>Iya bener banget</p>
              <p><b>Anonymous </b>Sabar yah rekan-rekan</p>
            </div>
            <div>
              <textarea class="form-control" id="exampleFormControlTextarea1" rows="2"></textarea>
            </div>
            <Button color="danger" type="submit" className="mt-2" >Submit Comment</Button>{' '}
            <Button color="secondary" className="mt-2" onClick={toggleComment}>Cancel</Button>

          </ModalBody>
        </Form>
      </Modal>
    );
  }
}

AddComment.propTypes = propTypes;

export default AddComment;