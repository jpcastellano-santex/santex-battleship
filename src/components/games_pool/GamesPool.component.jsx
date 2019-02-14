// Package dependencies
import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import isEmpty from 'lodash/isEmpty';
import { Table } from 'reactstrap';
// import { graphql } from 'react-apollo';
import { GameAdded } from '../../graphql/subscriptions/Game';

import TableRow from './TableRow.component';
import { graphql, withApollo } from 'react-apollo';
import { AvailableGames } from '../../graphql/queries/Game';
import { JoinGame } from '../../graphql/mutations/Game';

class GamesPool extends Component {
  state = { gamesAvailable: [] };

  componentDidMount() {
    this.subscribeToGamePool();
    this.getGames();
  }

  getGames() {
    this.props.client.query({
      query: AvailableGames,
      variables: { userid: this.props.loggeduserid }
    }).then(response => {
      var games = response.data.availablegames;
      this.setState({
        gamesAvailable: games
      })
    })
  }

  subscribeToGamePool = () => {
    this.props.client.subscribe({
      query: GameAdded,
      fetchPolicy: "no-cache"
    }).subscribe(data => {
      var game = data.data.gameAdded;
      if (game.owner.id !== this.props.loggeduserid) {
        var actualGames = this.state.gamesAvailable;
        actualGames.push(game);
        this.setState({
          gamesAvailable: actualGames
        });
      }
    });
  }

  joinGame = (e) => {
    this.props.client.mutate({
      mutation: JoinGame,
      variables: { userid: this.props.loggeduserid, id: e.id }
    }).then(response => {
      this.props.history.push(`/game/${response.data.joingame.id}`);
    });
  }

  getRows = () => {
    return this.state.gamesAvailable.map((gameData, index) => <TableRow onClick={this.joinGame} index={index} {...gameData} />);
  };

  render() {
    return (
      <Fragment>
        <h3>Games Pool</h3>
        <Table striped bordered hover dark>
          <thead>
            <tr>
              <th>#</th>
              <th>Created At</th>
              <th>Player</th>
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

export default withApollo(withRouter(GamesPool));
