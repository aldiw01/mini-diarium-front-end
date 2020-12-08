import React, { Component, Suspense } from 'react';
import { Button, Card, CardBody, Carousel, CarouselCaption, CarouselControl, CarouselIndicators, CarouselItem, Col, Form, FormGroup, Input, InputGroup, InputGroupAddon, Row } from 'reactstrap';
// import axios from 'axios';
import Spinner from 'react-spinkit';
import { Link } from 'react-router-dom';
import AuthService from 'server/AuthService';

import cert1 from "assets/img/certificates/cert1.jpg";
import cert2 from "assets/img/certificates/cert2.jpg";
import cert3 from "assets/img/certificates/cert3.jpg";

const items = [
  {
    src: cert1,
    altText: 'Slide 1',
    caption: ''
  },
  {
    src: cert2,
    altText: 'Slide 2',
    caption: ''
  },
  {
    src: cert3,
    altText: 'Slide 3',
    caption: ''
  },
];

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.Auth = new AuthService();
    if (!this.Auth.loggedIn()) {
      window.location = '/login';
    }
    this.state = {
      activeIndex: 0,
      something: ''
    };
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.goToIndex = this.goToIndex.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
  }

  loading = () =>
    <div className="animated fadeIn pt-1 text-center">
      <Spinner name='double-bounce' fadeIn="quarter" className="m-auto" />
    </div>

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  onExiting() {
    this.animating = true;
  }

  onExited() {
    this.animating = false;
  }

  next() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === items.length - 1 ? 0 : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  }

  previous() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === 0 ? items.length - 1 : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  }

  goToIndex(newIndex) {
    if (this.animating) return;
    this.setState({ activeIndex: newIndex });
  }

  render() {
    const { activeIndex } = this.state;

    const slides = items.map((item) => {
      return (
        <CarouselItem
          onExiting={this.onExiting}
          onExited={this.onExited}
          key={item.src}
        >
          <img className="d-block w-100" src={item.src} alt={item.altText} />
          <CarouselCaption captionText={item.caption} captionHeader={item.caption} />
        </CarouselItem>
      );
    });

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12">
            <Form method="post" className="form-horizontal">
              <FormGroup>
                <div className="controls shadow">
                  <InputGroup>
                    <Input id="appendedInputButton" name="something" value={this.state.something} onChange={this.handleChange} placeholder="Search document(s) ..." type="text" required />
                    <InputGroupAddon addonType="append">
                      <Link to={"/search/" + this.state.something.replace("/", "%2f").trim()}>
                        <Button title="Search" color="danger" type="submit"><i className="fa fa-search"></i></Button>
                      </Link>
                    </InputGroupAddon>
                  </InputGroup>
                </div>
              </FormGroup>
            </Form>
          </Col>
        </Row>

        <Row>
          <Col xs="12" xl="7" className="mb-3">
            <Suspense fallback={this.loading}>
              <Carousel activeIndex={activeIndex} next={this.next} previous={this.previous}>
                <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
                {slides}
                <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
                <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
              </Carousel>
            </Suspense>
          </Col>
          <Col xs="12" xl="5">
            <Card className="text-white bg-dark py-3">
              <CardBody className="text-center">
                <div>
                  <h2>Selamat datang di Sistem Informasi Dokumen Mutu Online <br />(Sidomo)</h2>
                  <p className="mt-4" style={{ fontSize: "0.95rem" }}>
                    Sistem Informasi Dokumen Mutu Online (Sidomo) merupakan aplikasi web penyimpanan dokumen mutu untuk menjamin dokumen Sistem Manajemen Mutu (SMM) Telkom Test House (TTH) selalu terkendali dan menjadi tidak terkendali apabila dicetak.<br /><br />
                    Dokumen mutu yang dapat diakses adalah Daftar Induk Dokumen Internal (DIDI) yang diterbitkan oleh TTH meliputi: Panduan Mutu, Prosedur, Instruksi Kerja/Test Procedure, dan Form. Selain DIDI dalam dokumen mutu juga dapat diakses rekaman dan arsip (kebijakan & regulasi, referensi uji, informasi & publikasi).<br /><br />
                    Admin aplikasi ini adalah Pengendali Dokumen.
                  </p>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>

      </div>
    );
  }
}

export default Dashboard;
