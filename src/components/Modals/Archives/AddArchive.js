import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, ButtonDropdown, Col, DropdownItem, DropdownMenu, DropdownToggle, Modal, ModalBody, ModalFooter, ModalHeader, Label, Form, FormGroup, Input } from 'reactstrap';
import Spinner from 'react-spinkit';
import axios from 'axios';

const propTypes = {
  add: PropTypes.bool,
  data: PropTypes.object,
  handleAdd: PropTypes.func,
  handleChangeNew: PropTypes.func,
  handleChangeNewFile: PropTypes.func,
  loader: PropTypes.bool,
  standard_level: PropTypes.string,
  toggleAdd: PropTypes.func
};

class AddArchive extends Component {
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

    const { add, data, handleAdd, handleChangeNew, handleChangeNewFile, loader, standard_level, toggleAdd } = this.props;

    var standard_type = this.state.data.filter((item, i) => {
      return data.standard_level_id === item.id
    })

    return (
      <Modal isOpen={add} toggle={toggleAdd} className={'modal-success modal-lg'}>
        <Form onSubmit={handleAdd} method="post" encType="multipart/form-data" className="form-horizontal">
          <ModalHeader toggle={toggleAdd}>Arsip Baru</ModalHeader>
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
                      <DropdownItem key={i} onClick={handleChangeNew} name="standard_level_id" value={item.id} >{item.name}</DropdownItem>
                    )}
                  </DropdownMenu>
                </ButtonDropdown>
              </Col>
            </FormGroup>

            <FormGroup row>
              <Col md="3">
                No Arsip
              </Col>
              <Col xs="12" md="9">
                <Input type="text" onChange={handleChangeNew} name="id" value={data.id} className="text-uppercase" />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Col md="3">
                Nama Arsip *
              </Col>
              <Col xs="12" md="9">
                <Input type="text" onChange={handleChangeNew} name="name" value={data.name} required />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Col md="3">
                Tahun *
              </Col>
              <Col xs="12" md="9">
                <Input type="number" onChange={handleChangeNew} name="year" value={data.year} required />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Col md="3">
                {standard_level.includes("T") ? "Versi" : "Info"} *
              </Col>
              <Col xs="12" md="9">
                <Input type="text" onChange={handleChangeNew} name={standard_level.includes("T") ? "version" : "info"} value={standard_level.includes("T") ? data.version : data.info} required />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Col md="3">
                File *
              </Col>
              <Col xs="12" md="9">
                <div className="custom-file">
                  <Input type="file" className="custom-file-input" name="file" onChange={handleChangeNewFile} required />
                  <Label className="custom-file-label" htmlFor="customFileLang" style={{ overflow: "hidden", whiteSpace: "nowrap" }} >{data.file.name ? data.file.name : data.file} </Label>
                </div>
              </Col>
            </FormGroup>

            {standard_level.includes("T") ?
              <React.Fragment>
                <FormGroup row>
                  <Col md="3">
                    File DOC
                  </Col>
                  <Col xs="12" md="9">
                    <div className="custom-file">
                      <Input type="file" className="custom-file-input" name="file_doc" onChange={handleChangeNewFile} />
                      <Label className="custom-file-label" htmlFor="customFileLang" style={{ overflow: "hidden", whiteSpace: "nowrap" }} >{data.file_doc.name ? data.file_doc.name : data.file_doc} </Label>
                    </div>
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Col md="3">
                    File Watermarked
                  </Col>
                  <Col xs="12" md="9">
                    <div className="custom-file">
                      <Input type="file" className="custom-file-input" name="file_wm" onChange={handleChangeNewFile} />
                      <Label className="custom-file-label" htmlFor="customFileLang" style={{ overflow: "hidden", whiteSpace: "nowrap" }} >{data.file_wm.name ? data.file_wm.name : data.file_wm} </Label>
                    </div>
                  </Col>
                </FormGroup>
              </React.Fragment>
              : ""
            }

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
            <Button color="success" type="submit" disabled={!data.standard_level_id} >Tambah</Button>{' '}
            <Button color="secondary" onClick={toggleAdd}>Cancel</Button>
          </ModalFooter>
        </Form>
      </Modal >
    );
  }
}

AddArchive.propTypes = propTypes;

export default AddArchive;