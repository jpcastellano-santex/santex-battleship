// Package dependencies
import React, { Component } from 'react';
import { Col, Row, Button } from 'reactstrap';

// Local dependencies
import CurrentGames from '../current_games/CurrentGames.component';
import GamesPool from '../games_pool/GamesPool.component';

// Styles
import classes from './Home.module.scss';
import { CreateGame } from '../../graphql/mutations/Game';
import { withApollo } from 'react-apollo';

const TITLE = 'Battleship';
const loggeduserid = localStorage.getItem('userid');

class Home extends Component {
  createGame = () => {
    this.props.client.mutate({
      mutation: CreateGame,
      variables: { userid: loggeduserid }
    });
  }

  render() {
    return (
      <div className={classes.home}>
        <Row>
          <Col xs={{ size: 12 }}>
            <div className="title">
              <h1>{TITLE}</h1>
            </div>
          </Col>
          <Col xs={{ size: 4, offset: 8 }} className="text-right">
            <Button color="info" onClick={this.createGame}>New Game</Button>
          </Col>
        </Row>
        <Row>
          <Col xs="6">
            <GamesPool loggeduserid={loggeduserid} />
          </Col>
          <Col xs="6">
            <CurrentGames loggeduserid={loggeduserid} />
          </Col>
        </Row>
      </div>)
  }
}
export default withApollo(Home);
