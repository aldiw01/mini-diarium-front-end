import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row } from 'reactstrap';
import { Doughnut } from 'react-chartjs-2';
import axios from 'axios';
import Spinner from 'react-spinkit';
import AuthService from 'server/AuthService';

import AddCheckin from 'components/Modals/Presence/AddCheckin';
import AddCheckout from 'components/Modals/Presence/AddCheckout';

import Home from 'components/Modules/Home';
import CheckIn from 'components/Modules/CheckIn';
import CheckOut from 'components/Modules/CheckOut';
import Headlines from 'components/Modules/Headlines';

import Activities from 'views/Admin/Activities';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.Auth = new AuthService();
    if (!this.Auth.loggedIn()) {
      window.location = '/login';
    }
    this.state = {
      checkin: false,
      checkout: false,
      inProgress: '',
      pending: '',
      done: '',
      now: new Date().toString('en-GB'),
      presence: [{
        id: '',
        user_id: '',
        status: '',
        created: ''
      }],
      profile: {
        name: "Aldi Wiranata",
        directorate: "Direktorat Digital Business",
        photo: "profile_photo_970037.png"
      }
    };
    this.chartData = {
      labels: [
        'In Progress',
        'Pending',
        'Done',
      ],
      datasets: [
        {
          data: [0, 0, 0],
          backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
          ],
          hoverBackgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
          ],
        }],
    };
  }

  componentDidMount() {
    this.myInterval = setInterval(() => {
      this.setState({
        now: new Date().toString('en-GB')
      })
      this.getChart()
    }, 1000)

    this.getData();
  }

  componentWillUnmount() {
    clearInterval(this.myInterval);
  }

  getData = () => {
    var tanggal = new Date().toISOString();

    axios.get(process.env.REACT_APP_API_PATH + '/presence/user/' + this.Auth.getProfile().id + '/' + tanggal)
      .then(res => {
        this.setState({ presence: res.data });
      })
      .catch(error => {
        console.log(error);
      });

    this.getChart();
  }

  getChart = () => {
    axios.get(`${process.env.REACT_APP_API_PATH}/activity/user/${this.Auth.getProfile().id}`)
      .then(res => {
        this.setState({
          inProgress: res.data.filter(item => item.status === '1').length,
          pending: res.data.filter(item => item.status === '2').length,
          done: res.data.filter(item => item.status === '3').length,
        });
        this.chartData = {
          labels: [
            'In Progress',
            'Pending',
            'Done',
          ],
          datasets: [
            {
              data: [this.state.inProgress, this.state.pending, this.state.done],
              backgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56',
              ],
              hoverBackgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56',
              ],
            }],
        };
      })
      .catch(error => {
        console.log(error);
      });
  }

  loading = () =>
    <div className="animated fadeIn pt-1 text-center">
      <Spinner name='double-bounce' fadeIn="quarter" className="m-auto" />
    </div>

  handleCheckin = (event) => {
    event.preventDefault();
    this.setState({ loader: true });
    var data = {
      user_id: this.Auth.getProfile().id,
      status: 1, // checkin 1
    }

    axios.post(process.env.REACT_APP_API_PATH + '/presence', data)
      .then(res => {
        this.setState({
          checkin: false,
          loader: false
        });
        this.getData();
      })
      .catch(error => {
        alert(error);
        console.log(error);
      });
  }

  handleCheckout = (event) => {
    event.preventDefault();
    this.setState({ loader: true });
    var data = {
      user_id: this.Auth.getProfile().id,
      status: 2, // checkout 2
    }

    axios.post(process.env.REACT_APP_API_PATH + '/presence', data)
      .then(res => {
        this.setState({
          checkout: false,
          finish: true,
          loader: false
        });
        this.getData();
      })
      .catch(error => {
        alert(error);
        console.log(error);
      });
  }

  toggleCheckin = () => {
    this.setState({
      checkin: !this.state.checkin,
    });
  }

  toggleCheckout = () => {
    this.setState({
      checkout: !this.state.checkout,
    });
  }

  render() {


    return (
      <div className="animated fadeIn">

        <Row>
          <Col xs="12" className={this.state.presence[0].status === '' ? "col-xl-12" : "col-xl-8"}>
            <Card className="text-white bg-dark">
              <CardBody className="text-center">
                {this.state.presence[0].status === '1' ?
                  // IF STATUS = 1, USER ALREADY CHECK IN
                  <React.Fragment>
                    <CheckIn
                      data={this.state.presence}
                      now={this.state.now}
                      toggleCheckout={this.toggleCheckout}
                      user={this.Auth.getProfile().name}
                    />
                  </React.Fragment>
                  : this.state.presence[0].status === '2' ?
                    // IF STATUS = 2, USER ALREADY CHECK OUT
                    <React.Fragment>
                      <CheckOut
                        data={this.state.presence}
                        now={this.state.now}
                        toggleCheckout={this.toggleCheckout}
                        user={this.Auth.getProfile().name}
                      />
                    </React.Fragment>
                    :
                    // ELSE, USER IS NOT CHECK IN
                    <React.Fragment>
                      <Home
                        now={this.state.now}
                        toggleCheckin={this.toggleCheckin}
                        user={this.Auth.getProfile().name}
                      />
                    </React.Fragment>
                }

                <AddCheckin
                  checkin={this.state.checkin}
                  loader={this.state.loader}
                  toggleCheckin={this.toggleCheckin}
                  handleCheckin={this.handleCheckin}
                />

                <AddCheckout
                  checkout={this.state.checkout}
                  loader={this.state.loader}
                  toggleCheckout={this.toggleCheckout}
                  handleCheckout={this.handleCheckout}
                />
              </CardBody>
            </Card>

            <div className={this.state.presence[0].status === '' ? "d-none" : ""}>
              <Activities
                path={this.props.match.path}
              />
            </div>
          </Col>

          <Col xs="12" xl="4" className={this.state.presence[0].status === '' ? "d-none" : "pl-0"}>
            <Card>
              <CardHeader>
                <strong>Activities Chart </strong>
              </CardHeader>
              <CardBody>
                <div className="chart-wrapper">
                  <Doughnut data={this.chartData} />
                </div>
              </CardBody>
            </Card>

            <Headlines
              profile={this.state.profile}
            />
          </Col>

        </Row>
      </div>
    );
  }
}

export default Dashboard;
