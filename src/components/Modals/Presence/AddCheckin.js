import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader, Form } from 'reactstrap';
import Spinner from 'react-spinkit';

const propTypes = {
  checkin: PropTypes.bool,
  handleCheckin: PropTypes.func,
  loader: PropTypes.bool,
  toggleCheckin: PropTypes.func
};

class AddCheckin extends Component {

  render() {

    const { checkin, handleCheckin, loader, toggleCheckin } = this.props;

    return (
      <Modal isOpen={checkin} toggle={toggleCheckin} className={'modal-success modal-sm'}>
        <Form onSubmit={handleCheckin} method="post" encType="multipart/form-data" className="form-horizontal">
          <ModalHeader toggle={toggleCheckin}>Konfirmasi Checkin</ModalHeader>
          <ModalBody>
            Apakah mau checkin?
          </ModalBody>
          <ModalFooter>
            {loader ? <Spinner name='double-bounce' fadeIn="quarter" /> : ""}
            <Button color="success" type="submit" >Ya</Button>{' '}
            <Button color="secondary" onClick={toggleCheckin}>Tidak</Button>
          </ModalFooter>
        </Form>
      </Modal>
    );
  }
}

AddCheckin.propTypes = propTypes;

export default AddCheckin;