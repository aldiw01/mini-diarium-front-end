import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem } from 'reactstrap';
import PropTypes from 'prop-types';

import { AppHeaderDropdown, AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import logo from '../../assets/img/logo.png'
import mascot from '../../assets/img/mascot.png'
import AuthService from '../../server/AuthService'
import axios from 'axios'

const propTypes = {
  children: PropTypes.node,
};

class DefaultHeader extends Component {
  constructor(props) {
    super(props);
    this.Auth = new AuthService();
    this.state = {
      notification: {
        add: '',
        edit: '',
        delete: '',
        myRequests: '',
        total: ''
      },
      profile_photo: ''
    }
    axios.get(process.env.REACT_APP_API_PATH + '/users/' + this.Auth.getProfile().id)
      .then(res => {
        this.setState({
          profile_photo: res.data[0].photo,
        })
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {

    // eslint-disable-next-line
    const { children, ...attributes } = this.props;
    const user = this.Auth.getProfile().name;
    const photo_url = this.state.profile_photo ? this.state.profile_photo : "test.jpg"

    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <AppNavbarBrand
          full={{ src: logo, height: 45, alt: 'Logo' }}
          minimized={{ src: mascot, height: 40, alt: 'Mascot' }}
        />
        <AppSidebarToggler className="d-md-down-none" display="lg" />

        <Nav className="d-md-down-none" navbar>
          <NavItem className="px-3">
            <NavLink to="/dashboard" className="nav-link" >Home</NavLink>
          </NavItem>
        </Nav>

        <Nav className="ml-auto" navbar>

          <AppHeaderDropdown direction="down">
            <DropdownToggle nav>
              <i className="icon-bell"></i>
            </DropdownToggle>
            <DropdownMenu right style={{ right: 'auto' }}>
              <DropdownItem header tag="div" className="text-center">
                <strong>Notifications</strong>
              </DropdownItem>
            </DropdownMenu>
          </AppHeaderDropdown>

          <NavItem className="px-3 border-right border-secondary d-md-down-none">
            <NavLink to="/profile" className="nav-link text-capitalize">{user}</NavLink>
          </NavItem>

          <AppHeaderDropdown direction="down">
            <DropdownToggle nav>
              <img src={process.env.REACT_APP_API_PATH + '/uploads/users/' + photo_url} className="img-avatar" alt={photo_url} />
            </DropdownToggle>
            <DropdownMenu right style={{ right: 'auto' }}>
              <DropdownItem header tag="div" className="text-center"><strong>{user}</strong></DropdownItem>
              <Link to="/profile" className="nav-link">
                <DropdownItem><i className="icon-user"></i> Profile</DropdownItem>
              </Link>
              <DropdownItem onClick={e => this.props.onLogout(e)}><i className="icon-lock"></i> Logout</DropdownItem>
            </DropdownMenu>
          </AppHeaderDropdown>

        </Nav>
      </React.Fragment>
    );
  }
}

DefaultHeader.propTypes = propTypes;

export default DefaultHeader;
