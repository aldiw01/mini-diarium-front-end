import React, { Component } from 'react';
import { Button, Card, CardBody, CardHeader, Col, Collapse, Nav, NavItem, NavLink, Row, TabContent, TabPane } from 'reactstrap';
import { MDBDataTable } from 'mdbreact';
import axios from 'axios';
import AuthService from 'server/AuthService';
import AddArchive from 'components/Modals/Archives/AddArchive';
import EditArchive from 'components/Modals/Archives/EditArchive';
import DeleteArchive from 'components/Modals/Archives/DeleteArchive';
import ViewArchive from 'components/Modals/Archives/ViewArchive';
import EditInfo from 'components/Modals/Infos/EditInfo';

class Archives extends Component {

  constructor(props) {
    super(props);
    this.Auth = new AuthService();
    if (!this.Auth.loggedIn()) {
      window.location = '/login';
    }
    this.state = {
      id: 0,
      activeTab: 0,
      add: false,
      edit: false,
      edit_info: false,
      delete: false,
      view: false,
      loader: false,
      collapse: true,
      csv_data: [],
      csv_headers: [],
      dropdown1: false,
      dropdown2: false,
      activeData: [{
        id: '',
        name: '',
        info: '',
        year: '',
        standard_level_id: '',
        file: ''
      }],
      data: [{
        id: '',
        name: '',
        year: '',
        info: '',
        standard_level_id: '',
        file: ''
      }],
      focus: {
        id: '',
        name: '',
        info: '',
        year: '',
        standard_level_id: '',
        file: ''
      },
      new: {
        id: '',
        name: '',
        info: '',
        year: '',
        standard_level_id: '',
        file: ''
      },
      info: {
        id: '',
        name: '',
        ACCESS_ROLES_PAGE: '',
        ACCESS_ROLES_READ: '',
        ACCESS_ROLES_WRITE: '',
        value: ''
      },
      focusInfo: {
        id: '',
        name: '',
        ACCESS_ROLES_PAGE: '',
        ACCESS_ROLES_READ: '',
        ACCESS_ROLES_WRITE: '',
        value: ''
      },
      tab: [{
        id: '',
        name: ''
      }]
    }

    var last = this.props.match.url.lastIndexOf("/")
    const param = this.props.match.url.substr(last + 1).toUpperCase()
    this.standard_level = param === "REGULATIONS" ? "N/I" :
      param === "PUBLICATIONS" ? "P" :
        param === "ACCREDITATIONS" ? "A" : ""
  }

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    axios.get(process.env.REACT_APP_API_PATH + '/standard_levels/search/' + this.standard_level)
      .then(res => {
        this.setState({ tab: res.data });

        axios.get(`${process.env.REACT_APP_API_PATH}/archives/search/${this.standard_level}`)
          .then(res => {
            this.setState({ data: res.data });
            this.setActiveData(this.state.activeTab);
          })
          .catch(error => {
            console.log(error);
          });
      })
      .catch(error => {
        console.log(error);
      });

    axios.get(process.env.REACT_APP_API_PATH + '/infos/' + this.props.match.url.substr(1).replace(new RegExp("/", 'g'), "%2F"))
      .then(res => {
        this.setState({ info: res.data[0] });
        if (!res.data[0].ACCESS_ROLES_PAGE.includes(this.Auth.getProfile().role)) {
          window.location = '/login';
        }
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
      focus: {
        ...this.state.focus,
        [event.target.name]: event.target.files[0]
      }
    })
  }

  handleChangeInfo = (event) => {
    this.setState({
      focusInfo: {
        ...this.state.focusInfo,
        [event.target.name]: event.target.value
      }
    })
  }

  handleChangeNew = (event) => {
    this.setState({
      new: {
        ...this.state.new,
        [event.target.name]: event.target.value
      }
    })
  }

  handleChangeNewFile = (event) => {
    this.setState({
      new: {
        ...this.state.new,
        [event.target.name]: event.target.files[0]
      }
    })
  }

  handleAdd = (event) => {
    event.preventDefault();
    if (window.confirm("You will create change(s) on database. Are you sure?")) {
      this.setState({ loader: true });
      const waktu = new Date().toISOString();
      const id = this.state.new.id || 'A' + new Date(waktu).valueOf().toString(32).toUpperCase()
      const data = new FormData();
      data.append('id', id.toUpperCase());
      data.append('name', this.state.new.name);
      data.append('year', this.state.new.year);
      data.append('standard_level_id', this.state.new.standard_level_id);
      data.append('file', this.state.new.file);
      data.append('info', this.state.new.info);
      axios.post(process.env.REACT_APP_API_PATH + '/archives', data)
        .then(res => {
          if (res.data.success) {
            // INSERT HISTORY INTO DATABASE
            var request = {
              reference_id: id.toUpperCase(),
              user_id: this.Auth.getProfile().id,
              step_id: "ARV1",
              message: id.toUpperCase()
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
            this.setState({
              add: !this.state.add,
              loader: false,
              new: {
                id: '',
                name: '',
                year: '',
                info: '',
                standard_level_id: '',
                file: ''
              }
            })
          } else {
            this.setState({
              loader: false
            })
          }
          alert(res.data.message);
        })
        .catch(error => {
          alert(error);
          console.log(error);
        });
    }
  }

  handleEdit = (event) => {
    event.preventDefault();
    if (window.confirm("You will create change(s) on database. Are you sure?")) {
      this.setState({ loader: true });
      const data = new FormData();
      data.append('id', this.state.focus.id);
      data.append('name', this.state.focus.name);
      data.append('year', this.state.focus.year);
      data.append('info', this.state.focus.info);
      data.append('standard_level_id', this.state.focus.standard_level_id);
      data.append('file', this.state.focus.file);
      axios.put(process.env.REACT_APP_API_PATH + '/archives/' + this.state.activeData[this.state.id].id.replace(new RegExp("/", 'g'), "%2F"), data)
        .then(res => {
          this.setState({
            edit: !this.state.edit,
            loader: false
          })
          // INSERT HISTORY INTO DATABASE
          var request = {
            reference_id: this.state.activeData[this.state.id].id,
            user_id: this.Auth.getProfile().id,
            step_id: "ARV2",
            message: this.state.activeData[this.state.id].id
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
      axios.delete(process.env.REACT_APP_API_PATH + '/archives/ever/' + id.replace(new RegExp("/", 'g'), "%2f"))
        .then(res => {
          this.setState({
            delete: !this.state.delete,
            loader: false
          })
          // INSERT HISTORY INTO DATABASE
          var request = {
            reference_id: this.state.activeData[this.state.id].id,
            user_id: this.Auth.getProfile().id,
            step_id: "ARV3",
            message: this.state.activeData[this.state.id].id
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

  handleEditInfo = (event) => {
    event.preventDefault();
    if (window.confirm("You will create change(s) on database. Are you sure?")) {
      this.setState({ loader: true });
      axios.put(process.env.REACT_APP_API_PATH + '/infos/' + this.state.focusInfo.id.replace(new RegExp("/", 'g'), "%2F"), this.state.focusInfo)
        .then(res => {
          this.setState({
            edit_info: !this.state.edit_info,
            loader: false
          })
          // INSERT HISTORY INTO DATABASE
          var request = {
            reference_id: this.state.focusInfo.id,
            user_id: this.Auth.getProfile().id,
            step_id: "INF2",
            message: this.state.focusInfo.id
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

  toggleAdd = () => {
    this.setState({
      add: !this.state.add,
    });
  }

  toggleView = (id) => {
    this.setState({
      id: id,
      view: !this.state.view,
      focus: this.state.activeData[id]
    });
  }

  toggleEdit = (id) => {
    this.setState({
      id: id,
      edit: !this.state.edit,
      focus: this.state.activeData[id]
    });
  }

  toggleEditInfo = () => {
    this.setState({
      edit_info: !this.state.edit_info,
      focusInfo: this.state.info
    });
  }

  toggleDelete = (id) => {
    this.setState({
      id: id,
      delete: !this.state.delete,
      focus: this.state.activeData[id]
    });
  }

  toggle = () => {
    this.setState({
      collapse: !this.state.collapse
    });
  }

  toggleTab = (tab) => {
    this.setState({
      activeTab: tab,
    });

    this.setActiveData(tab);
  }

  setActiveData = (tab) => {
    var data = []
    const testType = this.state.tab[tab].id
    data = this.state.data.filter(obj => {
      return obj.standard_level_id.includes(testType)
    })

    this.setState({
      activeData: data,
    });
  }

  render() {
    const { ACCESS_ROLES_READ, ACCESS_ROLES_WRITE } = this.state.info;

    const role = this.Auth.getProfile().role

    var columns = [
      {
        label: 'No',
        field: 'no',
        sort: 'asc'
      },
      {
        label: 'No Dokumen',
        field: 'id',
        sort: 'asc'
      },
      {
        label: 'Nama Dokumen',
        field: 'name',
        sort: 'asc'
      },
      {
        label: 'Tahun',
        field: 'year',
        sort: 'asc'
      },
      {
        label: 'Info',
        field: 'info',
        sort: 'asc'
      },
      {
        label: 'Actions',
        field: 'actions',
        sort: 'asc'
      }
    ]

    var rows = [];
    let toggleView = this.toggleView;
    let toggleEdit = this.toggleEdit;
    let toggleDelete = this.toggleDelete;
    this.state.activeData.forEach(function (items, i) {
      if (items.id !== '') {
        rows.push({
          no: i + 1,
          id: items.id,
          name: items.name,
          year: items.year,
          info: items.info,
          actions: <div className="d-flex">

            <button title="View Data" className="px-3 py-1 mr-1 btn btn-primary" onClick={() => toggleView(i)}>
              <i className="fa fa-folder-open"></i>
            </button>

            {/* THIS ACTION(S) RESTRICTED BY SPECIFIC USER ROLE ACCESS */}
            {ACCESS_ROLES_WRITE.includes(role) ?
              <React.Fragment>
                <button title="Edit Data" className="px-3 py-1 mr-1 btn btn-warning" onClick={() => toggleEdit(i)}>
                  <i className="fa fa-pencil"></i>
                </button>
                <button title="Delete Data" className="px-3 py-1 mr-1 btn btn-danger" onClick={() => toggleDelete(i)}>
                  <i className="fa fa-minus-circle"></i>
                </button>
              </React.Fragment> : ""}
            {/* ---------------------------------------------------------------- */}

          </div>
        });
      }
    });

    const dataFix = {
      columns: columns,
      rows: rows
    }

    const csvButton = {
      position: "absolute",
      right: "20px",
      top: "5px",
    }

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" xl="12">
            <Card className="card-accent-danger mb-1">
              <CardHeader>
                <strong>{this.state.info.name}</strong>
                <div className="card-header-actions">
                  {/*eslint-disable-next-line*/}
                  <a className="card-header-action btn btn-minimize" data-target="#details" onClick={this.toggle}><i className={this.state.collapse ? "icon-arrow-up" : "icon-arrow-down"}></i></a>
                </div>

                {/* THIS ACTION(S) RESTRICTED BY SPECIFIC USER ROLE ACCESS */}
                {ACCESS_ROLES_WRITE.includes(role) ?
                  <div style={{ position: "absolute", right: "3rem", top: "0.4rem" }}>
                    <Button title="Edit Info" color="secondary" className="float-right" onClick={this.toggleEditInfo}>
                      <i className="fa fa-pencil"></i>
                    </Button>
                  </div> : ""}
                {/* ---------------------------------------------------------------- */}

              </CardHeader>
              <Collapse isOpen={this.state.collapse} id="details">
                <CardBody>
                  {this.state.info.value}
                </CardBody>
              </Collapse>
            </Card>
          </Col>
          <Col xs="12" xl="12">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i>

                {/* THIS ACTION(S) RESTRICTED BY SPECIFIC USER ROLE ACCESS */}
                {ACCESS_ROLES_WRITE.includes(role) ?
                  <div style={csvButton}>
                    <Button title="Add Data" color="success" className="float-right" onClick={this.toggleAdd}>
                      Tambah{' '}
                      <i className="fa fa-plus"></i>
                    </Button>
                  </div>
                  : ""}
                {/* ---------------------------------------------------------------- */}

              </CardHeader>
              <CardBody>

                <Col xs="12" className="p-0 m-0">
                  <Nav tabs>
                    {this.state.tab.map((item, i) =>
                      <NavItem key={i}>
                        <NavLink
                          active={this.state.activeTab === i}
                          onClick={() => { this.toggleTab(i); }}
                        >
                          <span className={this.state.activeTab === i ? 'font-weight-bold' : ''}> {item.name}</span>
                        </NavLink>
                      </NavItem>
                    )}
                  </Nav>
                  <TabContent activeTab={this.state.activeTab}>
                    {this.state.tab.map((item, i) =>
                      <TabPane tabId={i} key={i}>

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

                      </TabPane>
                    )}
                  </TabContent>
                </Col>

                <EditInfo
                  edit={this.state.edit_info}
                  data={this.state.focusInfo}
                  id={this.state.id}
                  handleEdit={this.handleEditInfo}
                  handleChange={this.handleChangeInfo}
                  loader={this.state.loader}
                  toggleEdit={this.toggleEditInfo}
                />

                <AddArchive
                  add={this.state.add}
                  data={this.state.new}
                  handleAdd={this.handleAdd}
                  handleChangeNew={this.handleChangeNew}
                  handleChangeNewFile={this.handleChangeNewFile}
                  loader={this.state.loader}
                  standard_level={this.standard_level}
                  toggleAdd={this.toggleAdd}
                />

                <ViewArchive
                  ACCESS_ROLES_READ={ACCESS_ROLES_READ}
                  data={this.state.focus}
                  id={this.state.id}
                  toggleView={this.toggleView}
                  view={this.state.view}
                />

                <EditArchive
                  edit={this.state.edit}
                  data={this.state.focus}
                  id={this.state.id}
                  handleEdit={this.handleEdit}
                  handleChange={this.handleChange}
                  handleChangeFile={this.handleChangeFile}
                  loader={this.state.loader}
                  standard_level={this.standard_level}
                  toggleEdit={this.toggleEdit}
                />

                <DeleteArchive
                  _delete={this.state.delete}
                  data={this.state.focus}
                  id={this.state.id}
                  handleDelete={this.handleDelete}
                  loader={this.state.loader}
                  toggleDelete={this.toggleDelete}
                />

              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Archives;