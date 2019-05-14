import React, { Fragment } from "react";

import { Row, Col } from "src/components";

import kjelpLogo from "src/images/kjelp-logo.png";
import playStore from "src/images/play-store.png";
import appStore from "src/images/app-store.png";

import Styled from "./home-page.styled";

const Homepage: React.FC = () => {
  return (
    <Fragment>
      <Styled.ContainerHeader
        fluid
        style={{ paddingBottom: 10, paddingTop: 10 }}
      >
        <Row>
          <Col sm={6}>
            <img style={{ height: 50 }} src={kjelpLogo} alt="Kjelp" />
            <a href="#for-customers">Asukkaille</a>
            <a href="#for-companies">Yrityksille</a>
          </Col>
          <Col sm={6}>
            <a
              href="https://company.kjelp.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Kirjaudu yrityksenä
            </a>
          </Col>
        </Row>
      </Styled.ContainerHeader>

      <Styled.ContainerUpperPart fluid>
        <Row>
          <Styled.CenteredCol>
            <h2>Helppoa asumista.</h2>
            <h3>Tilaa kodin huoltotöitä paikallisilta yrityksiltä.</h3>
            <h4>Katso video ja tutustu palveluun</h4>
            <h4>Lataa Kjelp sovelluskaupoista</h4>
            <img
              style={{ height: 50 }}
              src={playStore}
              alt="Kjelp Google Play"
            />
            <img style={{ height: 50 }} src={appStore} alt="Kjelp App Store" />
          </Styled.CenteredCol>
        </Row>
      </Styled.ContainerUpperPart>

      <Styled.ContainerServices fluid>
        <Row>
          <Col>Intro</Col>
        </Row>
      </Styled.ContainerServices>

      <Styled.ContainerEasyLiving fluid>
        <Row>
          <Col>Intro</Col>
        </Row>
      </Styled.ContainerEasyLiving>

      <Styled.ContainerPaintRoller fluid>
        <Row>
          <Col>Intro</Col>
        </Row>
      </Styled.ContainerPaintRoller>

      <Styled.ContainerForCompanies fluid>
        <Row>
          <Col>Intro</Col>
        </Row>
      </Styled.ContainerForCompanies>

      <Styled.ContainerFooter fluid>
        <Row>
          <Col>Intro</Col>
        </Row>
      </Styled.ContainerFooter>
    </Fragment>
  );
};

export default Homepage;
