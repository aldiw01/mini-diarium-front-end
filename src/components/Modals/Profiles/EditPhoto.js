import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Col, Form, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap';
import Spinner from 'react-spinkit';

const propTypes = {
  edit_photo: PropTypes.bool,
  handleChangeFile: PropTypes.func,
  handleEditPhoto: PropTypes.func,
  loader: PropTypes.bool,
  profile_photo: PropTypes.any,
  toggleEdit: PropTypes.func
};

class EditPhoto extends Component {

  render() {

    const { edit_photo, handleChangeFile, handleEditPhoto, loader, profile_photo, toggleEdit } = this.props;

    return (
      <Modal isOpen={edit_photo} toggle={toggleEdit} className={'modal-danger'}>
        <Form onSubmit={handleEditPhoto} method="post" encType="multipart/form-data">
          <ModalHeader toggle={toggleEdit}>Choose Profile Photo</ModalHeader>
          <ModalBody className="modal-body-display">
            <Col xs="12" className="m-auto">
              <Row>
                <div className="custom-file">
                  <Input type="file" className="custom-file-input" name="profile_photo" onChange={handleChangeFile} required />
                  <Label className="custom-file-label" htmlFor="customFileLang" style={{ overflow: "hidden" }} >{profile_photo ? profile_photo.name : ""} </Label>
                </div>
                <small>
                  <strong>
                    Note: Hanya file (jpg/jpeg/png), max 1 MB.
                  </strong>
                </small>
              </Row>
            </Col>
          </ModalBody>
          <ModalFooter>
            {loader ? <Spinner name='double-bounce' fadeIn="quarter" /> : ""}
            <Button color="danger" type="submit" >Submit</Button>
            <Button color="secondary" onClick={toggleEdit}>Close</Button>
          </ModalFooter>
        </Form>
      </Modal>
    );
  }
}

EditPhoto.propTypes = propTypes;

export default EditPhoto;