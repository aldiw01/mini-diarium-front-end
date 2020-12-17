import React, { Component } from 'react';
import { Button, Card, CardBody, Col, Row } from 'reactstrap';
import axios from 'axios';
import Spinner from 'react-spinkit';
import AuthService from 'server/AuthService';
import AddCheckin from 'components/Modals/Presence/AddCheckin';
import AddCheckout from 'components/Modals/Presence/AddCheckout';

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
      presence: [{
                  id: '', 
                  user_id: '', 
                  created:''
                }]
    };
  }

  componentDidMount() {
    this.getData();
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
  }

  loading = () =>
    <div className="animated fadeIn pt-1 text-center">
      <Spinner name='double-bounce' fadeIn="quarter" className="m-auto" />
    </div>

  handleCheckin = (event) => {
    event.preventDefault();
    if (window.confirm("You will create change(s) on database. Are you sure?")) {
      this.setState({ loader: true });
      var data = {
        user_id: this.Auth.getProfile().id,
        status: 1, // checkin 1
      }

      axios.post(process.env.REACT_APP_API_PATH + '/presence', data)
        .then(res => {
          this.setState({
            checkin : false
          });
          this.getData();
          alert(res.data.message);
        })
        .catch(error => {
          alert(error);
          console.log(error);
        });
    }
  }

  handleCheckout = (event) => {
    event.preventDefault();
    if (window.confirm("You will create change(s) on database. Are you sure?")) {
      this.setState({ loader: true });
      var data = {
        user_id: this.Auth.getProfile().id,
        status: 2, // checkout 2
      }

      axios.post(process.env.REACT_APP_API_PATH + '/presence', data)
        .then(res => {
          this.setState({
            checkout : false,
            finish: true,
          });
          this.getData();
          alert(res.data.message);
        })
        .catch(error => {
          alert(error);
          console.log(error);
        });
    }
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
    const user = this.Auth.getProfile().name;
    const date = new Date().toLocaleDateString();
    const time = new Date().toLocaleTimeString();

    return (
      <div className="animated fadeIn">
        
        <Row>
          <Col xs="12" xl="12">
            <Card className="text-white bg-dark py-3">
              <CardBody className="text-center">
                
                {
                  this.state.presence[0].status==='1' ?
                  <div>
                  <h2>Anda sudah checkin pada : {new Date(this.state.presence[0].created).toString()}</h2>
                  <p className="mt-4" style={{ fontSize: "0.95rem" }}>
                      Anda belum checkout, silahkan checkout dulu..
                  </p>
                  <Button className="btn btn-lg" color="light" type="button" onClick={this.toggleCheckout}>Checkout</Button>
                </div>
                : this.state.presence[0].status==='2' ?
                  <div>
                    <h2>Terima kasih untuk hari ini, sampai jumpa besok, {user}</h2>
                    <p>Checkin : {new Date(this.state.presence[1].created).toString()}</p>
                    <p>Checkout: {new Date(this.state.presence[0].created).toString()}</p>
                  </div> 
                :       
                  <div>
                  <h2>Selamat datang, {user}</h2>
                  <p className="mt-4" style={{ fontSize: "0.95rem" }}>
                      Sekarang tanggal {date} Jam {time} <br/>
                      Anda belum checkin, silahkan checkin dulu..
                  </p>
                  <Button className="btn btn-lg" color="light" type="button" onClick={this.toggleCheckin}>Checkin</Button>
                  </div>
                }

              </CardBody>
            </Card>
          </Col>
        </Row>

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


      </div>
    );
  }
}

export default Dashboard;
