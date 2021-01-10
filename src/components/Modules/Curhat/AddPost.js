import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Card, CardBody, CardFooter, Nav, Input } from 'reactstrap';
import { AppHeaderDropdown } from '@coreui/react';
import { Picker } from 'emoji-mart';

const propTypes = {
  myPost: PropTypes.bool,
  handleComment: PropTypes.func,
  loader: PropTypes.bool,
  toggleComment: PropTypes.func
};

class AddComment extends Component {

  render() {

    const { comment, toggleComment } = this.props;

    return (
      <Card>
        <CardBody className="p-2">
          <Input type="textarea" onChange={this.handleChange} placeholder="What is in your mind?" name="myPost" value={this.state.myPost} required />
        </CardBody>
        <CardFooter className="py-1 card-accent-danger">
          <div style={addButton}>
            <Button color={this.state.myPost ? "danger" : "light"} disabled={this.state.myPost ? false : true} className="btn float-right">
              <i className="icon-paper-plane"></i>
            </Button>
            <Nav className="mt-n2 float-right" navbar>
              <AppHeaderDropdown direction="down">
                <DropdownToggle nav>
                  <Button color="light" className="btn float-right">
                    <i className="icon-emotsmile"></i>
                  </Button>
                </DropdownToggle>
                <DropdownMenu right style={{ right: 'auto' }}>
                  <Picker native color="#f86c6b" theme="dark" title="Choose emoji" emoji="wink" onSelect={(emoji) => { this.setState({ myPost: this.state.myPost + emoji.native }) }} />
                </DropdownMenu>
              </AppHeaderDropdown>
            </Nav>
          </div>
        </CardFooter>
      </Card>
    );
  }
}

AddComment.propTypes = propTypes;

export default AddComment;