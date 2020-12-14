import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultFooter extends Component {
  render() {

    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      <React.Fragment>
        <span>
          <a href={"mailto:" + process.env.REACT_APP_EMAIL} target="_blank" rel="noopener noreferrer" className="text-danger">{process.env.REACT_APP_NAME}</a> &copy; {new Date().getFullYear()} <span className="d-none d-sm-inline"> {process.env.REACT_APP_ORGANIZATION}</span>
          <span className="d-inline d-sm-none"> {process.env.REACT_APP_ORGANIZATION_ABBR}</span>
        </span>
        <span className="ml-auto">
          <span className="d-none d-sm-inline">Developed </span>by <a href={"mailto:" + process.env.REACT_APP_DEV_EMAIL} target="_blank" rel="noopener noreferrer" className="text-danger">Netbeans Team</a>
        </span>
      </React.Fragment>
    );
  }
}

DefaultFooter.propTypes = propTypes;
DefaultFooter.defaultProps = defaultProps;

export default DefaultFooter;
