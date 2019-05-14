// import React from "react";
import styled from "styled-components";

import { Container, Col } from "src/components";

import kjelpJumbotron from "src/images/kjelp-jumbotron.jpg";

const ContainerHeader = styled(Container)``;

const ContainerUpperPart = styled(Container)`
  background: url(${kjelpJumbotron}) no-repeat center center fixed;

  background-size: cover;
  /* min-height: 1200px; */

  h1,
  h2,
  h3,
  h4 {
    color: white !important;
  }
`;

const ContainerServices = styled(Container)``;

const ContainerEasyLiving = styled(Container)``;

const ContainerPaintRoller = styled(Container)``;

const ContainerForCompanies = styled(Container)``;

const ContainerFooter = styled(Container)``;

const CenteredCol = styled(Col)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default {
  ContainerHeader,
  ContainerUpperPart,
  ContainerServices,
  ContainerEasyLiving,
  ContainerPaintRoller,
  ContainerForCompanies,
  ContainerFooter,
  CenteredCol
};
