import React, { Component } from 'react';
import { Button, Card, CardBody, CardFooter, CardHeader, Col, DropdownMenu, DropdownToggle, Nav, Row, Input } from 'reactstrap';
import { AppHeaderDropdown } from '@coreui/react';
import AuthService from 'server/AuthService';
import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart';

import AddComment from 'components/Modals/Comments/AddComment';

class Curhat extends Component {

    constructor(props) {
        super(props);
        this.Auth = new AuthService();
        if (!this.Auth.loggedIn()) {
            window.location = '/login';
        }
        this.state = {
            comment: false,
            post: false,
            myComment: '',
            myPost: '',
            dataLatest: [
                {
                    id: '3',
                    nickname: 'Pejuang Subuh',
                    directorate: 'Mobile',
                    curhat: 'Semoga tahun 2021 corona hilang, semua kembali normal dan bisa pulang kampung..',
                    total_like: '1',
                    total_comment: '0'
                },
                {
                    id: '2',
                    nickname: 'Kang Bakso',
                    directorate: 'Finance',
                    curhat: 'Saya diminta masuk ke kantor tiap hari oleh atasan, tapi tidak diberi uang lembur',
                    total_like: '100',
                    total_comment: '23'
                }
            ],
            dataHottest: [
                {
                    id: '2',
                    nickname: 'Kang Bakso',
                    directorate: 'Finance',
                    curhat: 'Saya diminta masuk ke kantor tiap hari oleh atasan, tapi tidak diberi uang lembur',
                    total_like: '100',
                    total_comment: '23'
                },
                {
                    id: '1',
                    nickname: 'Kerang Ajaib',
                    directorate: 'Consumer',
                    curhat: 'Teman-temang apa benar kalo kita rajin kerja nanti bakal cepat naik band?',
                    total_like: '12',
                    total_comment: '12'
                }
            ],
            dataDirectorate: [
                {
                    id: '1',
                    nickname: 'Kerang Ajaib',
                    directorate: 'Consumer',
                    curhat: 'Teman-temang apa benar kalo kita rajin kerja nanti bakal cepat naik band?',
                    total_like: '12',
                    total_comment: '12'
                }
            ]
        }
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    toggleComment = () => {
        this.setState({
            comment: !this.state.comment,
        });
    }

    render() {

        const addButton = {
            right: "20px",
            top: "5px",
        }

        return (
            <div className="animated fadeIn">

                <Row>

                    <Col xs="12" xl="12">
                        <Card>
                            <CardBody className="p-2">
                                <Input type="textarea" onChange={this.handleChange} placeholder="What is in your mind?" name="myPost" value={this.state.myPost} required />
                            </CardBody>
                            <CardFooter className="py-1 card-accent-danger">
                                <div style={addButton}>
                                    <Button color="light" className="btn float-right">
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
                                                <Picker native color="#f86c6b" theme="dark" title="Choose emoji" emoji="smile" onSelect={(emoji) => { this.setState({ myPost: this.state.myPost + emoji.native }) }} />
                                            </DropdownMenu>
                                        </AppHeaderDropdown>
                                    </Nav>
                                </div>
                            </CardFooter>
                        </Card>
                    </Col>

                    <Col xs="12" xl="4">
                        <Card>
                            <CardHeader>
                                <i className="fa fa-calendar"></i><strong>Latest Curcol</strong>
                            </CardHeader>
                            <CardBody>

                                {this.state.dataLatest.map((detail, index) => {
                                    return (
                                        <div key={index}>
                                            <div className="media">
                                                <img style={{ borderRadius: "50%" }} src={process.env.PUBLIC_URL + '/assets/img/avatars/1.jpg'} className="mr-3" alt="..."></img>
                                                <div className="media-body">
                                                    <h5 className="mt-0">{detail.nickname}</h5>
                                                    <i>"{detail.curhat}"</i>
                                                </div>
                                            </div>
                                            <div className="mt-2">
                                                <Button className="mr-1"><i className="fa fa-thumbs-o-up"></i> {detail.total_like} Like</Button>
                                                <Button
                                                    onClick={this.toggleComment}
                                                >
                                                    <i className="fa fa-comment-o"></i> {detail.total_comment} Comment
                                        </Button>
                                            </div>
                                            <hr></hr>
                                        </div>
                                    )
                                })}

                            </CardBody>
                        </Card>
                    </Col>

                    <Col xs="12" xl="4">
                        <Card>

                            <CardHeader>
                                <i className="fa fa-fire"></i><strong>Hottest Curcol</strong>
                            </CardHeader>
                            <CardBody>

                                {this.state.dataHottest.map((detail, index) => {
                                    return (
                                        <div key={index}>
                                            <div className="media">
                                                <img style={{ borderRadius: "50%" }} src={process.env.PUBLIC_URL + '/assets/img/avatars/1.jpg'} className="mr-3" alt="..."></img>
                                                <div className="media-body">
                                                    <h5 className="mt-0">{detail.nickname}</h5>
                                                    <i>"{detail.curhat}"</i>
                                                </div>
                                            </div>
                                            <div className="mt-2">
                                                <Button className="mr-1"><i className="fa fa-thumbs-o-up"></i> {detail.total_like} Like</Button>
                                                <Button
                                                    onClick={this.toggleComment}
                                                >
                                                    <i className="fa fa-comment-o"></i> {detail.total_comment} Comment
                                        </Button>
                                            </div>
                                            <hr></hr>
                                        </div>
                                    )
                                })}

                            </CardBody>

                        </Card>
                    </Col>

                    <Col xs="12" xl="4">
                        <Card>

                            <CardHeader>
                                <i className="fa fa-joomla"></i><strong>Curcol in Your Unit</strong>
                            </CardHeader>
                            <CardBody>

                                {this.state.dataDirectorate.map((detail, index) => {
                                    return (
                                        <div key={index}>
                                            <div className="media">
                                                <img style={{ borderRadius: "50%" }} src={process.env.PUBLIC_URL + '/assets/img/avatars/1.jpg'} className="mr-3" alt="..."></img>
                                                <div className="media-body">
                                                    <h5 className="mt-0">{detail.nickname}</h5>
                                                    <i>"{detail.curhat}"</i>
                                                </div>
                                            </div>
                                            <div className="mt-2">
                                                <Button className="mr-1"><i className="fa fa-thumbs-o-up"></i> {detail.total_like} Like</Button>
                                                <Button
                                                    onClick={this.toggleComment}
                                                >
                                                    <i className="fa fa-comment-o"></i> {detail.total_comment} Comment
                                        </Button>
                                            </div>
                                            <hr></hr>
                                        </div>
                                    )
                                })}

                            </CardBody>

                        </Card>
                    </Col>

                </Row>

                <AddComment
                    comment={this.state.comment}
                    loader={this.state.loader}
                    toggleComment={this.toggleCheckin}
                />

            </div>
        );
    }
}

export default Curhat;
