import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, ButtonDropdown, Col, DropdownItem, DropdownMenu, DropdownToggle, Modal, ModalBody, ModalFooter, ModalHeader, Label, Form, FormGroup, Input } from 'reactstrap';
import Spinner from 'react-spinkit';
import axios from 'axios';

const propTypes = {
  edit: PropTypes.bool,
  data: PropTypes.object,
  handleChange: PropTypes.func,
  handleChangeFile: PropTypes.func,
  handleEdit: PropTypes.func,
  id: PropTypes.number,
  loader: PropTypes.bool,
  standard_level: PropTypes.string,
  toggleEdit: PropTypes.func
};

class EditArchive extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dropdown: false,
      data: [{
        id: '',
        name: ''
      }]
    }
  }

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    axios.get(process.env.REACT_APP_API_PATH + '/standard_levels/search/' + this.props.standard_level)
      .then(res => {
        this.setState({ data: res.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  toggle = () => {
    this.setState({
      dropdown: !this.state.dropdown
    });
  }


  render() {

    const { edit, data, handleChange, handleChangeFile, handleEdit, id, loader, toggleEdit } = this.props;

    var standard_type = this.state.data.filter((item, i) => {
      return data.standard_level_id === item.id
    })

    return (
      <Modal isOpen={edit} toggle={() => toggleEdit(id)} className={'modal-primary modal-lg'}>
        <Form onSubmit={handleEdit} method="post" encType="multipart/form-data" className="form-horizontal">
          <ModalHeader toggle={() => toggleEdit(id)}>Edit Dokumen</ModalHeader>
          <ModalBody className="mt-4 mx-4">

            <FormGroup row>
              <Col md="3">
                Tipe Dokumen *
              </Col>
              <Col xs="12" md="9">
                <ButtonDropdown isOpen={this.state.dropdown} toggle={this.toggle} name="dropdown" className="w-100">
                  <DropdownToggle className="text-left">
                    {standard_type[0] ? standard_type[0].name : "Pilih tipe dokumen"}
                  </DropdownToggle>
                  <DropdownMenu style={{ width: "100%", overflow: "auto" }}>
                    {this.state.data.map((item, i) =>
                      <DropdownItem key={i} onClick={handleChange} name="standard_level_id" value={item.id} >{item.name}</DropdownItem>
                    )}
                  </DropdownMenu>
                </ButtonDropdown>
              </Col>
            </FormGroup>

            <FormGroup row>
              <Col md="3">
                No Arsip *
              </Col>
              <Col xs="12" md="9">
                <Input type="text" onChange={handleChange} name="id" value={data.standard_level_id.includes("T") ? data.document_id : data.id} className="text-uppercase" disabled />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Col md="3">
                Nama Arsip *
              </Col>
              <Col xs="12" md="9">
                <Input type="text" onChange={handleChange} name="name" value={data.name} required />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Col md="3">
                Tahun *
              </Col>
              <Col xs="12" md="9">
                <Input type="number" onChange={handleChange} name="year" value={data.year} required />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Col md="3">
                Info *
              </Col>
              <Col xs="12" md="9">
                <Input type="text" onChange={handleChange} name="info" value={data.info} required />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Col md="3">
                File *
              </Col>
              <Col xs="12" md="9">
                <div className="custom-file">
                  <Input type="file" className="custom-file-input" name="file" onChange={handleChangeFile} />
                  <Label className="custom-file-label" htmlFor="customFileLang" style={{ overflow: "hidden", whiteSpace: "nowrap" }} >{data.file.name ? data.file.name : data.file} </Label>
                </div>
              </Col>
            </FormGroup>

            <FormGroup row>
              <Col xs="6">
                <div className="w-100"></div>
                <strong className="text-danger">
                  * Required Element
                </strong>
              </Col>
              <Col xs="6">
                <small>
                  <strong className="float-right">
                    Note: Max file 200 MB.
                  </strong>
                </small>
              </Col>
            </FormGroup>

          </ModalBody>
          <ModalFooter>
            {loader ? <Spinner name='double-bounce' fadeIn="quarter" /> : ""}
            <Button color="primary" type="submit" >Save Changes</Button>{' '}
            <Button color="secondary" onClick={() => toggleEdit(id)}>Cancel</Button>
          </ModalFooter>
        </Form>
      </Modal>
    );
  }
}

EditArchive.propTypes = propTypes;

export default EditArchive;