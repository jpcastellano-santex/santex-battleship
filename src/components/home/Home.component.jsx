// Package dependencies
import React from 'react';
import { Col, Row, Button } from 'reactstrap';

// Local dependencies
import CurrentGames from '../current_games/CurrentGames.component';
import GamesPool from '../games_pool/GamesPool.component';

// Styles
import classes from './Home.module.scss';

const TITLE = 'Battleship';

const Home = () => (
  <div className={classes.home}>
    <Row>
      <Col xs={{size: 12}}>
        <div className="title">
          <h1>{TITLE}</h1>
        </div>
      </Col>
      <Col xs={{size: 4, offset: 8}} className="text-right">
        <Button color="info" onClick={Function.prototype}>New Game</Button>
      </Col>
    </Row>
    <Row>
      <Col xs="6">
        <GamesPool />
      </Col>
      <Col xs="6">
        <CurrentGames />
      </Col>
    </Row>
  </div>
);

export default Home;
