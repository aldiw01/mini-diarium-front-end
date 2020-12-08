import React, { Component } from 'react';
import { Button, Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import AuthService from '../../server/AuthService';
import axios from 'axios';
import EditPassword from 'components/Modals/Profiles/EditPassword';
import EditPhoto from 'components/Modals/Profiles/EditPhoto';
import EditProfile from 'components/Modals/Profiles/EditProfile';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.Auth = new AuthService();
    if (!this.Auth.loggedIn()) {
      window.location = '/login';
    }
    this.state = {
      edit_password: false,
      edit_photo: false,
      edit_profile: false,
      isGoodNewPass: false,
      isGoodValPass: false,
      loader: false,
      photo: '',
      profile_photo: '',
      data: [{
        NIK: '',
        Name: '',
        Role: '',
        Telp: '',
        Email: '',
        Registered: '',
        Updated: ''
      }],
      focus: {
        NIK: '',
        Name: '',
        Role: '',
        Telp: '',
        Email: '',
        Registered: '',
        Updated: ''
      },
      password: {
        old: '',
        new: '',
        validate: ''
      }
    }
  }

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    axios.get(process.env.REACT_APP_API_PATH + '/users/' + this.Auth.getProfile().id)
      .then(res => {
        this.setState({
          photo: res.data[0].photo,
          data: [{
            NIK: res.data[0].id,
            Name: res.data[0].name,
            Role: res.data[0].role,
            Telp: res.data[0].telp,
            Email: res.data[0].email,
            Registered: new Date(res.data[0].registered).toLocaleString('en-GB'),
            Updated: new Date(res.data[0].updated).toLocaleString('en-GB')
          }]
        })
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleChange = (event) => {
    this.setState({
      focus: {
        ...this.state.focus,
        [event.target.name]: event.target.value
      }
    })
  }

  handleChangeFile = (event) => {
    this.setState({
      [event.target.name]: event.target.files[0]
    })
  }

  handleChangePassword = (event) => {
    this.setState({
      password: {
        ...this.state.password,
        [event.target.name]: event.target.value
      }
    })
  }

  handleCheckPassword = (event) => {
    this.setState({
      password: {
        ...this.state.password,
        [event.target.name]: event.target.value
      }
    })
    if (event.target.value.length > 5) {
      this.setState({
        isGoodNewPass: true
      })
    } else {
      this.setState({
        isGoodNewPass: false
      })
    }

    if ((event.target.value === this.state.password.validate) && (event.target.value.length > 5)) {
      this.setState({ isGoodValPass: true });
    } else {
      this.setState({ isGoodValPass: false });
    }
  }

  handleConfirmPassword = (event) => {
    this.setState({
      password: {
        ...this.state.password,
        [event.target.name]: event.target.value
      }
    })
    if ((this.state.password.new === event.target.value) && (event.target.value.length > 5)) {
      this.setState({ isGoodValPass: true });
    } else {
      this.setState({ isGoodValPass: false });
    }
  }

  toggleEditPassword = () => {
    this.setState({
      edit_password: !this.state.edit_password,
    });
  }

  toggleEditPhoto = () => {
    this.setState({
      edit_photo: !this.state.edit_photo,
      profile_photo: ''
    });
  }

  toggleEditProfile = () => {
    this.setState({
      edit_profile: !this.state.edit_profile,
      focus: this.state.data[0]
    });
  }

  handleEditPassword = (event) => {
    event.preventDefault();
    if (window.confirm("You will change your profile picture. Are you sure?")) {
      this.setState({ loader: true });
      axios.put(process.env.REACT_APP_API_PATH + '/users/password/' + this.Auth.getProfile().id, this.state.password)
        .then(res => {
          this.setState({
            edit_password: !this.state.edit_password,
            loader: false,
          })
          // INSERT HISTORY INTO DATABASE
          var request = {
            reference_id: this.Auth.getProfile().id,
            user_id: this.Auth.getProfile().id,
            step_id: "USR6",
            message: this.Auth.getProfile().id
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
          this.getData();
        })
        .catch(error => {
          alert(error);
          console.log(error);
        });
    }
  }

  handleEditPhoto = (event) => {
    event.preventDefault();
    if (window.confirm("You will change your profile picture. Are you sure?")) {
      this.setState({ loader: true });
      const data = new FormData();
      data.append('profile_photo', this.state.profile_photo);
      axios.put(process.env.REACT_APP_API_PATH + '/users/photo/' + this.Auth.getProfile().id, data)
        .then(res => {
          this.setState({
            edit_photo: !this.state.edit_photo,
            loader: false,
            profile_photo: ''
          })
          // INSERT HISTORY INTO DATABASE
          var request = {
            reference_id: this.Auth.getProfile().id,
            user_id: this.Auth.getProfile().id,
            step_id: "USR5",
            message: this.Auth.getProfile().id
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
          window.location.reload()
        })
        .catch(error => {
          alert(error);
          console.log(error);
        });
    }
  }

  handleEditProfile = (event) => {
    event.preventDefault();
    if (window.confirm("You will change your profile picture. Are you sure?")) {
      this.setState({ loader: true });
      axios.put(process.env.REACT_APP_API_PATH + '/users/' + this.Auth.getProfile().id, this.state.focus)
        .then(res => {
          this.setState({
            edit_profile: !this.state.edit_profile,
            loader: false,
          })
          // INSERT HISTORY INTO DATABASE
          var request = {
            reference_id: this.Auth.getProfile().id,
            user_id: this.Auth.getProfile().id,
            step_id: "USR2",
            message: this.Auth.getProfile().id
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
          this.getData();
        })
        .catch(error => {
          alert(error);
          console.log(error);
        });
    }
  }

  render() {
    const user = this.state.data[0];
    const userDetails = user ? Object.entries(user) : [['id', (<span><i className="text-muted icon-ban"></i> Not found</span>)]]
    const photo_url = this.state.photo ? this.state.photo : "test.jpg"

    const editButton = {
      position: "absolute",
      right: "20px",
      top: "5px",
    }

    return (
      <div className="animated fadeIn">
        <Row>
          <Col lg={7}>
            <Card>
              <CardHeader>
                <strong><i className="icon-info pr-1"></i>User id: {this.state.data[0].NIK}</strong>
                <div style={editButton}>
                  <Button color="warning" className="float-right" onClick={this.toggleEditProfile}>
                    <i className="fa fa-pencil"></i>
                  </Button>
                  <Button color="secondary" className="float-right mx-2" onClick={this.toggleEditPassword}>
                    Password{' '}
                    <i className="fa fa-pencil"></i>
                  </Button>
                </div>
              </CardHeader>
              <CardBody>
                <Table responsive striped hover>
                  <tbody>
                    {
                      userDetails.map(([key, value]) => {
                        return (
                          <tr key={key}>
                            <td>{`${key}:`}</td>
                            <td><strong>{value}</strong></td>
                          </tr>
                        )
                      })
                    }
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
          <Col lg={5}>
            <Card>
              <CardHeader>
                <strong><i className="icon-info pr-1"></i>Profile Photo</strong>
                <div style={editButton}>
                  <Button color="danger" className="float-right" onClick={() => this.setState({ edit_photo: true })}>
                    <i className="fa fa-pencil"></i>
                  </Button>
                </div>
              </CardHeader>
              <CardBody>
                <img src={process.env.REACT_APP_API_PATH + '/uploads/users/' + photo_url} className="img-fluid img-thumbnail rounded mx-auto d-block" alt="My profile" />
              </CardBody>

              <EditPassword
                edit_password={this.state.edit_password}
                data={this.state.password}
                handleChangePassword={this.handleChangePassword}
                handleCheckPassword={this.handleCheckPassword}
                handleConfirmPassword={this.handleConfirmPassword}
                handleEditPassword={this.handleEditPassword}
                isGoodNewPass={this.state.isGoodNewPass}
                isGoodValPass={this.state.isGoodValPass}
                loader={this.state.loader}
                toggleEditPassword={this.toggleEditPassword}
              />

              <EditPhoto
                edit_photo={this.state.edit_photo}
                handleChangeFile={this.handleChangeFile}
                handleEditPhoto={this.handleEditPhoto}
                loader={this.state.loader}
                profile_photo={this.state.profile_photo}
                toggleEdit={this.toggleEditPhoto}
              />

              <EditProfile
                edit_profile={this.state.edit_profile}
                data={this.state.focus}
                handleChange={this.handleChange}
                handleEditProfile={this.handleEditProfile}
                loader={this.state.loader}
                toggleEditProfile={this.toggleEditProfile}
              />

            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Profile;
