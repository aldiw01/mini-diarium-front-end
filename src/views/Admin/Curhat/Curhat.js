import React, { Component } from 'react';
import { Button, Card, CardBody, CardHeader, Col, Row, InputGroup, InputGroupAddon, Input } from 'reactstrap';
import axios from 'axios';
import Spinner from 'react-spinkit';
import AuthService from 'server/AuthService';

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

    toggleComment = () => {
        this.setState({
            comment: !this.state.comment,
        });
    }

    render() {

        return (
            <div className="animated fadeIn">

                <Row>
                    <Col xs="12" xl="12">
                        <Card>
                            <CardHeader>
                                <i className="fa fa-edit"></i><strong>Post CurCol</strong>
                            </CardHeader>
                            <CardBody>
                                <InputGroup>
                                    <Input />
                                    <InputGroupAddon addonType="append">
                                        <Button color="secondary">Post CurCol</Button>
                                    </InputGroupAddon>
                                </InputGroup>
                            </CardBody>
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
                                        <div>
                                            <div className="media">
                                                <img style={{ "border-radius": "50%" }} src={process.env.PUBLIC_URL + '/assets/img/avatars/1.jpg'} class="mr-3" alt="..."></img>
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
                                        <div>
                                            <div className="media">
                                                <img style={{ "border-radius": "50%" }} src={process.env.PUBLIC_URL + '/assets/img/avatars/1.jpg'} class="mr-3" alt="..."></img>
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
                                        <div>
                                            <div className="media">
                                                <img style={{ "border-radius": "50%" }} src={process.env.PUBLIC_URL + '/assets/img/avatars/1.jpg'} class="mr-3" alt="..."></img>
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
