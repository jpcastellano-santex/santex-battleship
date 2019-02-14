// Package dependencies
import React, { Component } from 'react';
import { Container } from 'reactstrap';

// Local dependencies
import Routes from '../../Routes.component';
import { Header } from '../index';
import Login from '../login/Login.component'

// Styles
import './Root.scss';

const loggeduserid = localStorage.getItem('userid');

class Root extends Component {
  render = () => {
    if (loggeduserid) {
      return (
        <Container fluid className="root-wrapper" >
          <Header />
          <div className="content">
            <Routes />
          </div>
        </Container>
      )
    }
    return (
      <Container fluid className="root-wrapper" >
        <Header />
        <div className="content">
          <Login />
        </div>
      </Container>
    );
  }
}
export default Root;
