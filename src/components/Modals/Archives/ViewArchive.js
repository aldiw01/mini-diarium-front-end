import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Col, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap';
import axios from 'axios';
import AuthService from 'server/AuthService';
import History from 'components/Modules/HistoryList';

const propTypes = {
  ACCESS_ROLES_READ: PropTypes.string,
  data: PropTypes.object,
  id: PropTypes.number,
  toggleView: PropTypes.func,
  view: PropTypes.bool,
};

class ViewArchive extends Component {
  constructor(props) {
    super(props)
    this.Auth = new AuthService()
    this.state = {
      loader: false,
      history: [{
        reference_id: '',
        name: '',
        action: '',
        info: '',
        step_number: '',
        message: '',
        created: ''
      }]
    }
  }

  componentDidMount() {
    this.getHistory();
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.data.id !== prevProps.data.id) {
      this.setState({
        history: [{
          reference_id: '',
          name: '',
          action: '',
          info: '',
          step_number: '',
          message: '',
          created: ''
        }]
      })
      this.getHistory();
    }
  }

  getHistory = () => {
    const id = this.props.data.document_id === undefined ? this.props.data.id : this.props.data.document_id
    axios.get(process.env.REACT_APP_API_PATH + '/history/reference/' + id.replace(new RegExp("/", 'g'), "%2F"))
      .then(res => {
        this.setState({ history: res.data });
      })
      .catch(() => {
        this.setState({
          history: [{
            reference_id: '',
            name: '',
            action: '',
            info: '',
            step_number: '',
            message: '',
            created: ''
          }]
        })
      });
  }

  postHistory = (message) => {
    // INSERT HISTORY INTO DATABASE
    var request = {
      reference_id: this.props.data.id,
      user_id: this.Auth.getProfile().id,
      step_id: "ARV4",
      message: message
    }
    axios.post(process.env.REACT_APP_API_PATH + '/history', request)
      .catch(error => {
        alert(error);
        console.log(error);
      });
    ////////////////////////////////////////////////////////////////
  }

  render() {

    const { ACCESS_ROLES_READ, data, id, toggleView, view } = this.props;
    const table = data.standard_level_id.includes("T") ? "test_references" : "archives";
    const role = this.Auth.getProfile().role

    var viewStyle = {
      overflowWrap: 'break-word'
    }

    return (
      <React.Fragment>
        <Modal isOpen={view} toggle={() => toggleView(id)} className={'modal-primary modal-lg'}>
          <ModalHeader toggle={() => toggleView(id)}>Data Arsip</ModalHeader>
          <ModalBody className="modal-body-display">
            <Col xs="12" className="m-auto">
              <Row>

                <Col xs="3">No Arsip</Col>
                <Col xs="9" className="border-bottom mt-auto" style={viewStyle}>{data.standard_level_id.includes("T") ? data.document_id : data.id}</Col>
                <div className="w-100 py-2"></div>

                <Col xs="3">Nama Arsip</Col>
                <Col xs="9" className="border-bottom mt-auto" style={viewStyle}>{data.name}</Col>
                <div className="w-100 py-2"></div>

                <Col xs="3">Tahun</Col>
                <Col xs="9" className="border-bottom mt-auto" style={viewStyle}>{data.year}</Col>
                <div className="w-100 py-2"></div>

                <Col xs="3">{data.standard_level_id.includes("T") ? "Versi" : "Info"}</Col>
                <Col xs="9" className="border-bottom mt-auto" style={viewStyle}>{data.standard_level_id.includes("T") ? data.version : data.info}</Col>
                <div className="w-100 py-2"></div>

                {data.active ?
                  <React.Fragment>
                    <Col xs="3">Status</Col>
                    <Col xs="9" className="border-bottom mt-auto font-weight-bold" style={viewStyle}>{data.active === '1' ? "Active" : "Obsolete"}</Col>
                    <div className="w-100 py-2"></div>
                  </React.Fragment> : ""}

                <Col xs="3">Download File</Col>
                <Col xs="9" className="border-bottom mt-auto" style={viewStyle}>
                  {data.file && ACCESS_ROLES_READ.includes(role) ?
                    <a title="File" onClick={() => this.postHistory("STEL PDF")} className="btn btn-secondary mr-1" href={`${process.env.REACT_APP_API_PATH}/uploads/${table}/${data.file}`} target="_blank" rel="noopener noreferrer">
                      <i className="fa fa-file"></i> File
                    </a> : ""}

                  {data.file_doc && ACCESS_ROLES_READ.includes(role) ?
                    <a title="File DOC" onClick={() => this.postHistory("STEL DOC")} className="btn btn-primary mr-1" href={`${process.env.REACT_APP_API_PATH}/uploads/${table}/${data.file_doc}`} target="_blank" rel="noopener noreferrer">
                      <i className="fa fa-file-word-o"></i> DOC
                    </a> : ""}

                  {data.file_wm ?
                    <a title="File Watermarked" onClick={() => this.postHistory("STEL Watermarked")} className="btn btn-secondary mr-1" href={`${process.env.REACT_APP_API_PATH}/uploads/${table}/${data.file_wm}`} target="_blank" rel="noopener noreferrer">
                      <i className="fa fa-copyright"></i> Watermarked
                    </a> : ""}
                </Col>
                <div className="w-100 py-2"></div>

                <Col xs="12">
                  <History data={this.state.history} id={data.id} />
                </Col>

              </Row>
            </Col>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={() => toggleView(id)}>Close</Button>
          </ModalFooter>
        </Modal>
      </React.Fragment>
    );
  }
}

ViewArchive.propTypes = propTypes;

export default ViewArchive;