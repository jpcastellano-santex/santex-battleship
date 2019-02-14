// Package dependencies
import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { withApollo } from 'react-apollo';
import { Table } from 'reactstrap';
import *  as _ from 'lodash';

import TableRow from './TableRow.component';
import { MyGames } from '../../graphql/queries/Game';
import { GameJoined, GameAdded, GameEnd } from '../../graphql/subscriptions/Game';

class CurrentGames extends Component {
  state = { myGames: [] };
  subscribeObjectJoinGame = {};
  subscribeObjectGamePool = {};
  subscribeObjectGameEnd = {};

  componentDidMount() {
    this.getGames();
    this.subscribeToJoinGame();
    this.subscribeToGamePool();
    this.subscribeToGameEnd();
  }

  getGames() {
    this.props.client.query({
      query: MyGames,
      variables: { userid: this.props.loggeduserid }
    }).then(response => {
      var games = response.data.mygames;
      this.setState({
        myGames: games
      })
    })
  }

  componentWillUnmount() {
    this.subscribeObjectJoinGame.unsubscribe();
    this.subscribeObjectGamePool.unsubscribe();
    this.subscribeObjectGameEnd.unsubscribe();
  }

  subscribeToGamePool = () => {
    this.subscribeObjectGamePool = this.props.client.subscribe({
      query: GameAdded,
      fetchPolicy: "no-cache"
    }).subscribe(data => {
      var game = data.data.gameAdded;
      if (game.owner.id === this.props.loggeduserid) {
        var actualGames = this.state.myGames;
        actualGames.push(game);
        this.setState({
          myGames: actualGames
        });
      }
    });
  }

  subscribeToGameEnd = () => {
    this.subscribeObjectGameEnd = this.props.client.subscribe({
      query: GameEnd,
      fetchPolicy: "no-cache"
    }).subscribe(data => {
      var game = data.data.gameEnd;
      var actualGames = this.state.myGames;
      var index = _.findIndex(actualGames, function (item) { return item.id === game.id; });
      actualGames.splice(index, 1);
      var isWinner = game.winnerId === this.props.loggeduserid;
      var message = isWinner ? "WON" : "LOST";
      alert(`YOU ${message} GAME: ${game.id}`);
      this.setState({
        myGames: actualGames
      });
    });
  }

  subscribeToJoinGame = () => {
    this.subscribeObjectJoinGame = this.props.client.subscribe({
      query: GameJoined,
      fetchPolicy: "no-cache"
    }).subscribe(data => {
      var game = data.data.gameJoined;
      var actualGames = this.state.myGames;
      var index = _.findIndex(actualGames, function (item) { return item.id === game.id; });
      actualGames[index] = game;
      this.setState({
        myGames: actualGames
      });
    });
  }

  openGame = (e) => {
    this.props.history.push(`/game/${e.id}`);
  }

  getRows = () => {
    return this.state.myGames.map((gameData, index) => <TableRow index={index} onPlayClick={this.openGame} {...gameData} />);
  };

  render() {
    return (
      <Fragment>
        <h3>My current games</h3>
        <Table striped bordered hover dark>
          <thead>
            <tr>
              <th>#</th>
              <th>Created At</th>
              <th>Time Played</th>
              <th>Turn</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {this.getRows()}
          </tbody>
        </Table>
      </Fragment>
    );
  }
}

export default withApollo(withRouter(CurrentGames));
