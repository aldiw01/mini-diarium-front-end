import React, { Component } from 'react';
import { Button, Card, CardHeader, CardBody, Col, Row } from 'reactstrap';
import AuthService from '../../../server/AuthService';
import PropTypes from 'prop-types';
import { MDBDataTable } from 'mdbreact';
import axios from 'axios';
import AddActivity from 'components/Modals/Activities/AddActivities';
import DeleteActivity from 'components/Modals/Activities/DeleteActivities';
import EditActivity from 'components/Modals/Activities/EditActivities';

const propTypes = {
  path: PropTypes.string
};

const defaultProps = {
  path: '/dashboard'
};

class Activity extends Component {
  constructor(props) {
    super(props);
    this.Auth = new AuthService();
    this.state = {
      id: 0,
      loader: false,
      AddActivity: false,
      listActivity: '',
      edit: false,
      edit_info: false,
      DeleteActivity: false,
      EditActivity: false,
      delete: false,
      status: '1',
      toggle: false,
      statusdetail: '',
      data: [{
        id: '',
        user_id: '',
        name: '',
        status: '',
        created: '',
        updated: ''
      }],
      focus: {
        id: '',
        user_id: '',
        name: '',
        status: '',
        created: '',
        updated: ''
      }
    }

    this.PATH = this.props.match !== undefined ? this.props.match.url : this.props.path
  }

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    if (this.PATH === '/dashboard') {
      axios.get(`${process.env.REACT_APP_API_PATH}/activity/user/${this.Auth.getProfile().id}/3/exception`)
        .then(res => {
          this.setState({ data: res.data });
        })
        .catch(error => {
          this.setState({
            data: [{
              id: '',
              user_id: '',
              name: '',
              status: '',
              created: '',
              updated: ''
            }]
          });
          console.log(error);
        });
    } else {
      axios.get(`${process.env.REACT_APP_API_PATH}/activity/user/${this.Auth.getProfile().id}`)
        .then(res => {
          this.setState({ data: res.data });
        })
        .catch(error => {
          this.setState({
            data: [{
              id: '',
              user_id: '',
              name: '',
              status: '',
              created: '',
              updated: ''
            }]
          });
          console.log(error);
        });
    }
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleChangeEdit = (event) => {
    this.setState({
      focus: {
        ...this.state.focus,
        [event.target.name]: event.target.value
      }
    })
  }

  onToggle = () => {
    this.setState({
      AddActivity: !this.state.AddActivity
    });
  }


  handleEdit = (event) => {
    event.preventDefault();
    this.setState({ loader: true });
    var request = {
      name: this.state.focus.name,
      status: this.state.focus.status.substr(-1)
    }
    axios.put(process.env.REACT_APP_API_PATH + '/activity/' + this.state.data[this.state.id].id, request)
      .then(res => {
        this.setState({
          EditActivity: !this.state.EditActivity,
          loader: false
        })
        this.getData();
      })
      .catch(error => {
        alert(error);
        console.log(error);
      });
  }

  handleDelete = (id) => {
    this.setState({ loader: true });
    axios.delete(process.env.REACT_APP_API_PATH + '/activity/ever/' + id)
      .then(res => {
        this.getData();
        this.setState({
          DeleteActivity: !this.state.DeleteActivity,
          loader: false
        })
      })
      .catch(error => {
        alert("aduh eror /activity/ever/" + id + "-" + error);
        console.log(error);
      });
  }

  handleAddActivity = (event) => {
    this.setState({ loader: true });
    event.preventDefault();
    const req = {
      user_id: this.Auth.getProfile().id,
      name: this.state.listActivity,
      // status: this.state.status
    };
    axios.post(process.env.REACT_APP_API_PATH + '/activity', req)
      .then(res => {
        this.setState({
          loader: false,
          AddActivity: false,
          message: res.data.message,
          listActivity: '',
          status: '1',
          toggle: false,
          data: [{
            id: '',
            user_id: '',
            name: '',
            status: '',
            created: '',
            updated: ''
          }],
        })
        this.getData();
      })
      .catch(error => {
        console.log(error);
      });
  }

  toggleAdd = () => {
    this.setState({
      AddActivity: !this.state.AddActivity,
    })
  }

  toggleDelete = (id) => {
    this.setState({
      id: id,
      DeleteActivity: !this.state.DeleteActivity,
      focus: this.state.data[id]
    });
  }

  toggleEdit = (id) => {
    this.setState({
      id: id,
      EditActivity: !this.state.EditActivity,
      focus: this.state.data[id]
    });
  }

  render() {
    var columns = [
      {
        label: 'No',
        field: 'no',
        sort: 'asc'
      },
      {
        label: 'Activity',
        field: 'name',
        sort: 'asc'
      },
      {
        label: 'Status',
        field: 'status',
        sort: 'asc'
      },
      {
        label: 'Created Time',
        field: 'created',
        sort: 'asc'
      },
      {
        label: 'Updated Time',
        field: 'updated',
        sort: 'asc'
      },
      {
        label: 'Action',
        field: 'actions',
        sort: 'asc'
      }
    ]
    var rows = [];
    let toggleEdit = this.toggleEdit;
    let toggleDelete = this.toggleDelete;
    this.state.data.forEach(function (items, i) {
      if (items.id !== '') {
        rows.push({
          no: i + 1,
          user_id: items.user_id,
          name: items.name,
          status: items.status === '1' ? "In Progress" : items.status === '2' ? "Pending" : items.status === '3' ? "Done" : "Unknown",
          created: new Date(items.created).toLocaleString('en-GB'),
          updated: new Date(items.updated).toLocaleString('en-GB'),
          actions: <div className="d-flex">
            <React.Fragment>
              <button title="Edit Activity" className="px-3 py-1 mr-1 btn btn-primary" onClick={() => toggleEdit(i)}>
                <i className="fa fa-pencil"></i>
              </button>
              <button title="Delete Activity" className="px-3 py-1 mr-1 btn btn-danger" onClick={() => toggleDelete(i)}>
                <i className="fa fa-minus-circle"></i>
              </button>
            </React.Fragment>
          </div>
        });
      }
    });

    const dataFix = {
      columns: columns,
      rows: rows
    }

    const addButton = {
      position: "absolute",
      right: "20px",
      top: "5px",
    }

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" xl="12">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i><strong> {this.PATH === '/dashboard' ? `Today's ${this.Auth.getProfile().name.toUpperCase()} activity list` : 'My Activity'}</strong>

                <div style={addButton}>
                  <Button title="Add Data" color="success" className="float-right" onClick={this.toggleAdd}>
                    Add Activity{' '}
                    <i className="fa fa-plus"></i>
                  </Button>
                </div>

              </CardHeader>
              <CardBody>

                {dataFix.rows[0] ?
                  <MDBDataTable
                    striped
                    bordered
                    small
                    data={dataFix}
                    noBottomColumns
                    responsive
                    pagesAmount={5}
                    entriesOptions={[10, 50, 100, 1000]}
                  />
                  : "No records found"
                }

                <AddActivity
                  add={this.state.AddActivity}
                  handleAdd={this.handleAddActivity}
                  handleChangeNew={this.handleChange}
                  loader={this.state.loader}
                  toggleAdd={this.toggleAdd}
                />

                <DeleteActivity
                  _delete={this.state.DeleteActivity}
                  data={this.state.focus}
                  id={this.state.id}
                  handleDelete={this.handleDelete}
                  loader={this.state.loader}
                  toggleDelete={this.toggleDelete}
                />
                <EditActivity
                  edit={this.state.EditActivity}
                  data={this.state.focus}
                  id={this.state.id}
                  handleEdit={this.handleEdit}
                  handleChange={this.handleChangeEdit}
                  loader={this.state.loader}
                  toggleEdit={this.toggleEdit}
                />

              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

Activity.propTypes = propTypes;
Activity.defaultProps = defaultProps;

export default Activity;
