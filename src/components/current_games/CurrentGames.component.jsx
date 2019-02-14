// Package dependencies
import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { graphql, withApollo } from 'react-apollo';
import { Table } from 'reactstrap';
import *  as _ from 'lodash';

import TableRow from './TableRow.component';
import { MyGames } from '../../graphql/queries/Game';
import isEmpty from 'lodash/isEmpty';
import { GameJoined, GameAdded } from '../../graphql/subscriptions/Game';

const loggeduserid = localStorage.getItem('userid');

class CurrentGames extends Component {
  state = { myGames: [] };

  componentDidMount() {
    this.subscribeToJoinGame();
    this.subscribeToGamePool();
  }

  static getDerivedStateFromProps({ data }) {
    if (!isEmpty(data.mygames)) {
      return { myGames: data.mygames };
    }
    return {};
  }

  
  subscribeToGamePool = () => {
    this.props.client.subscribe({
      query: GameAdded,
      fetchPolicy: "no-cache"
    }).subscribe(data => {
      var game = data.data.gameAdded;
      if (game.owner.id === loggeduserid) {
        var actualGames = this.state.myGames;
        actualGames.push(game);
        this.setState({
          myGames: actualGames
        });
      }
    });
  }

  subscribeToJoinGame = () => {
    this.props.client.subscribe({
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

export default withApollo(graphql(MyGames)(withRouter(CurrentGames)));
