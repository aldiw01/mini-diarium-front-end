import React, { Component } from 'react';
import { Button, ButtonDropdown, Card, CardBody, CardHeader, Col, DropdownItem, DropdownMenu, DropdownToggle, Form, InputGroup, InputGroupAddon, InputGroupText, Modal, ModalBody, ModalFooter, ModalHeader, Row, Table } from 'reactstrap';
import axios from 'axios';
import AuthService from '../../server/AuthService';
import Spinner from 'react-spinkit';

class Users extends Component {
  constructor(props) {
    super(props);
    this.Auth = new AuthService();
    if (!this.Auth.loggedIn()) {
      window.location = '/login';
    }
    this.state = {
      dropdown: false,
      delete: false,
      edit: false,
      id: '',
      loader: false,
      data: [{
        id: '',
        name: '',
        role: '',
        telp: '',
        email: '',
        photo: '',
        registered: '',
        updated: ''
      }],
      focus: {
        id: '',
        name: '',
        role: '',
        telp: '',
        email: '',
        photo: '',
        registered: '',
        updated: ''
      },
      roles: [{
        id: '',
        name: ''
      }],
      info: {
        id: '',
        name: '',
        ACCESS_ROLES_PAGE: '',
        ACCESS_ROLES_READ: '',
        ACCESS_ROLES_WRITE: '',
        value: ''
      }
    }
  }

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    axios.get(process.env.REACT_APP_API_PATH + '/infos/' + this.props.match.url.substr(1).replace(new RegExp("/", 'g'), "%2F"))
      .then(res => {
        this.setState({ info: res.data[0] });
        if (!res.data[0].ACCESS_ROLES_PAGE.includes(this.Auth.getProfile().role)) {
          window.location = '/login';
        } else {

          axios.get(process.env.REACT_APP_API_PATH + '/users')
            .then(res => {
              this.setState({
                data: res.data
              });
            })
            .catch(error => {
              console.log(error);
            });

          axios.get(process.env.REACT_APP_API_PATH + '/roles')
            .then(res => {
              this.setState({ roles: res.data });
            })
            .catch(error => {
              console.log(error);
            });

        }
      })
      .catch(error => {
        console.log(error);
        window.location = '/login';
      });
  }

  UserRow = (props) => {
    const { index, user, toggleDelete, toggleEdit } = props;
    const MY_ROLE = this.Auth.getProfile().role
    const role = this.state.roles.find(x => x.id === user.role)

    if (user !== undefined && role !== undefined)
      return (
        <tr key={user.id.toString()}>
          <td>{index + 1}</td>
          <th scope="row">{user.id}</th>
          <td>{user.name}</td>
          <td>{role.name}</td>
          <td>{user.email}</td>
          <td>{user.telp}</td>
          <td>{new Date(user.registered).toLocaleDateString('en-GB')}</td>
          <td>
            <div className="d-flex">

              {/* THIS ACTION(S) RESTRICTED BY SPECIFIC USER ROLE ACCESS */}
              {this.Auth.getProfile().role < user.role && this.state.info.ACCESS_ROLES_WRITE.includes(MY_ROLE) ?
                <button title="Edit Data" className="px-3 py-1 mr-1 btn btn-warning" onClick={() => toggleEdit(index)}>
                  <i className="fa fa-pencil"></i>
                </button>
                : ""}
              {this.Auth.getProfile().role === "1" ?
                <button title="Delete Data" className="px-3 py-1 mr-1 btn btn-danger" onClick={() => toggleDelete(index)}>
                  <i className="fa fa-minus-circle"></i>
                </button>
                : ""}
              {/* ---------------------------------------------------------------- */}

            </div>
          </td>
        </tr>
      )
  }

  handleEdit = (event) => {
    event.preventDefault();
    if (window.confirm("You will create change(s) on database. Are you sure?")) {
      this.setState({ loader: true });
      axios.put(process.env.REACT_APP_API_PATH + '/users/role/' + this.state.data[this.state.id].id.replace(new RegExp("/", 'g'), "%2F"), this.state.focus)
        .then(res => {
          this.setState({
            edit: !this.state.edit,
            loader: false
          })
          // INSERT HISTORY INTO DATABASE
          var request = {
            reference_id: this.state.data[this.state.id].id,
            user_id: this.Auth.getProfile().id,
            step_id: "USR2",
            message: this.state.data[this.state.id].id
          }
          axios.post(process.env.REACT_APP_API_PATH + '/history', request)
            .then(() => {
              this.getData();
            })
            .catch(error => {
              alert(error);
              console.log(error);
            });
          ////////////////////////////////////////////////////////////////
          alert(res.data.message);
        })
        .catch(error => {
          alert(error);
          console.log(error);
        });
    }
  }

  handleDelete = (id) => {
    if (window.confirm("You will create change(s) on database. Are you sure?")) {
      this.setState({ loader: true });
      axios.delete(process.env.REACT_APP_API_PATH + '/users/ever/' + id.replace(new RegExp("/", 'g'), "%2f"))
        .then(res => {
          this.setState({
            delete: !this.state.delete,
            loader: false
          })
          // INSERT HISTORY INTO DATABASE
          var request = {
            reference_id: this.state.data[this.state.id].id,
            user_id: this.Auth.getProfile().id,
            step_id: "USR3",
            message: this.state.data[this.state.id].id
          }
          axios.post(process.env.REACT_APP_API_PATH + '/history', request)
            .then(() => {
              this.getData();
            })
            .catch(error => {
              alert(error);
              console.log(error);
            });
          ////////////////////////////////////////////////////////////////
          alert(res.data.message);
        })
        .catch(error => {
          alert(error);
          console.log(error);
        });
    }
  }

  toggle = () => {
    this.setState({
      dropdown: !this.state.dropdown
    });
  }

  toggleEdit = (id) => {
    this.setState({
      id: id,
      edit: !this.state.edit,
      focus: this.state.data[id]
    });
  }

  toggleDelete = (id) => {
    this.setState({
      id: id,
      delete: !this.state.delete,
      focus: this.state.data[id]
    });
  }

  render() {

    const userList = this.state.data;
    const role = this.state.roles.find(x => x.id === this.state.focus.role || x.name === this.state.focus.role)

    var viewStyle = {
      overflowWrap: 'break-word'
    }

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={12}>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> User List
              </CardHeader>
              <CardBody>
                <Table responsive hover>
                  <thead>
                    <tr>
                      <th scope="col">No</th>
                      <th scope="col">ID</th>
                      <th scope="col">name</th>
                      <th scope="col">role</th>
                      <th scope="col">email</th>
                      <th scope="col">telp / hp</th>
                      <th scope="col">registered</th>
                      <th scope="col">actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userList.map((user, index) =>
                      this.UserRow({
                        index: index,
                        key: index,
                        user: user,
                        toggleDelete: this.toggleDelete,
                        toggleEdit: this.toggleEdit
                      })
                    )}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>

          <Modal isOpen={this.state.edit} toggle={() => this.toggleEdit(this.state.id)} className={'modal-primary'}>
            <Form onSubmit={this.handleEdit} method="post" encType="multipart/form-data" className="form-horizontal">
              <ModalHeader toggle={() => this.toggleEdit(this.state.id)}>Edit User Role</ModalHeader>
              <ModalBody className="modal-body-display">
                <Col xs="12" className="m-auto">
                  <Row>

                    <Col xs="3">NIK</Col>
                    <Col xs="9" className="border-bottom mt-auto" style={viewStyle}>{this.state.focus.id}</Col>
                    <div className="w-100 py-2"></div>

                    <Col xs="3">Nama</Col>
                    <Col xs="9" className="border-bottom mt-auto" style={viewStyle}>{this.state.focus.name}</Col>
                    <div className="w-100 py-2"></div>

                    <Col xs="12">
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-pencil"></i>
                          </InputGroupText>
                        </InputGroupAddon>

                        <ButtonDropdown isOpen={this.state.dropdown} toggle={this.toggle} style={{ flex: "auto" }}>
                          <DropdownToggle className="text-left">
                            {role ? role.name : "Select role"}
                          </DropdownToggle>
                          <DropdownMenu>
                            {this.state.roles.map((item, i) =>
                              item.id > this.Auth.getProfile().role ?
                                <DropdownItem key={i} onClick={() => this.setState({ focus: { ...this.state.focus, role: item.id } })}>
                                  {item.name}
                                </DropdownItem>
                                : ""
                            )}
                          </DropdownMenu>
                        </ButtonDropdown>
                      </InputGroup>
                    </Col>

                  </Row>
                </Col>
              </ModalBody>
              <ModalFooter>
                {this.state.loader ? <Spinner name='double-bounce' fadeIn="quarter" /> : ""}
                <Button color="primary" type="submit" >Save Changes</Button>{' '}
                <Button color="secondary" onClick={() => this.toggleEdit(this.state.id)}>Cancel</Button>
              </ModalFooter>
            </Form>
          </Modal >

          <Modal isOpen={this.state.delete} toggle={() => this.toggleDelete(this.state.id)} className={'modal-danger modal-sm'}>
            <ModalHeader toggle={() => this.toggleDelete(this.state.id)}>Delete Dokumen</ModalHeader>
            <ModalBody>
              Do you really want to delete <br /> {this.state.focus.id} / {this.state.focus.name}?
            </ModalBody>
            <ModalFooter>
              {this.state.loader ? <Spinner name='double-bounce' fadeIn="quarter" /> : ""}
              <Button color="danger" onClick={() => this.handleDelete(this.state.focus.id)}>Delete</Button>{' '}
              <Button color="secondary" onClick={() => this.toggleDelete(this.state.id)}>Cancel</Button>
            </ModalFooter>
          </Modal>

        </Row>
      </div >
    )
  }
}

export default Users;