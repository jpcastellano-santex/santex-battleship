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

const loggeduserid = localStorage.getItem('userid');

class GamesPool extends Component {
  state = { gamesAvailable: [] };

  componentDidMount() {
    this.subscribeToGamePool();
  }

  static getDerivedStateFromProps({ data }) {
    if (!isEmpty(data.availablegames)) {
      return { gamesAvailable: data.availablegames };
    }
    return {};
  }

  subscribeToGamePool = () => {
    this.props.client.subscribe({
      query: GameAdded,
      fetchPolicy: "no-cache"
    }).subscribe(data => {
      var game = data.data.gameAdded;
      if (game.owner.id !== loggeduserid) {
        var actualGames = this.state.gamesAvailable;
        actualGames.push(game);
        this.setState({
          gamesAvailable: actualGames
        });
      }
    });
  }

  joinGame = () => {
    // this.props.history.push('/game/1');
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

export default withApollo(graphql(AvailableGames, {
  options: {
    variables: { userid: loggeduserid }
  }
})(withRouter(GamesPool)));
