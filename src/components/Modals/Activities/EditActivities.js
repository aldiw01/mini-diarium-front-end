import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, ButtonDropdown, Col, DropdownItem, DropdownMenu, DropdownToggle, Modal, ModalBody, ModalFooter, ModalHeader, Label, Form, FormGroup, Input } from 'reactstrap';
import Spinner from 'react-spinkit';

const propTypes = {
  edit: PropTypes.bool,
  data: PropTypes.object,
  handleChange: PropTypes.func,
  handleChangeFile: PropTypes.func,
  handleEdit: PropTypes.func,
  id: PropTypes.number,
  loader: PropTypes.bool,
  toggleEdit: PropTypes.func
};

class EditActivities extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dropdown: false,
      data: [{
        id: '1',
        name: 'In Progress'
      },
      {
        id: '2',
        name: 'Pending'
      },
      {
        id: '3',
        name: 'Done'
      }]
    }
  }

  toggle = () => {
    this.setState({
      dropdown: !this.state.dropdown
    });
  }


  render() {

    const { edit, data, handleChange, handleEdit, id, loader, toggleEdit } = this.props;

    var progress = this.state.data.filter((item, i) => {
      return data.status === item.id
    })

    return (
      <Modal isOpen={edit} toggle={() => toggleEdit(id)} className={'modal-primary'}>
        <Form onSubmit={handleEdit} method="post" encType="multipart/form-data" className="form-horizontal">
          <ModalHeader toggle={() => toggleEdit(id)}>Update Activity</ModalHeader>

          <ModalBody>
            <FormGroup row>
              <Col md="12" className="m-auto">
                <Label htmlFor="hf-text">Update activity name</Label>
              </Col>

              {/* <Col md="2" className="m-auto">
                <Label htmlFor="hf-text">Aktivitas</Label>
              </Col> */}
              <Col xs="12" md="12">
                <Input type="textarea" onChange={handleChange} name="name" value={data.name} required />
              </Col>

              <div className="w-100 py-2"></div>

              <Col md="2" className="m-auto">
                <Label htmlFor="hf-text">Status</Label>
              </Col>
              <Col xs="12" md="10">
                <ButtonDropdown isOpen={this.state.dropdown} toggle={this.toggle} name="dropdown" className="w-100">
                  <DropdownToggle className="text-left">
                    {progress[0] ? progress[0].name : "Choose Status"}
                  </DropdownToggle>
                  <DropdownMenu style={{ width: "100%", overflow: "auto" }}>
                    {this.state.data.map((item, i) =>
                      <DropdownItem key={i} onClick={handleChange} name="status" value={item.id} >{item.name}</DropdownItem>
                    )}
                  </DropdownMenu>
                </ButtonDropdown>
              </Col>
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            {loader ? <Spinner name='double-bounce' fadeIn="quarter" className="ml-auto" /> : ""}
            <Button color="primary" disabled={loader}>Update</Button>{' '}
            <Button color="secondary" onClick={() => toggleEdit(id)}>Cancel</Button>
          </ModalFooter>
        </Form>
      </Modal >
    );
  }
}

EditActivities.propTypes = propTypes;

export default EditActivities;