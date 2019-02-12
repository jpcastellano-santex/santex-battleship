// Package dependencies
import React, { Component, Fragment } from 'react';
import moment from 'moment';
import isEmpty from 'lodash/isEmpty';
import { Table } from 'reactstrap';
// import { graphql } from 'react-apollo';
import { GetAllGames, SubscriptionAdded } from '../../graphql/queries/Game';

// Local dependencies
import { formatDateToISO } from '../../helpers/formatters/commons';
import TableRow from './TableRow.component';
import { graphql, withApollo } from 'react-apollo';

class GamesPool extends Component {
  state = { gamesAvailable: [] };

  componentDidMount() {
    this.subscribeToGamePool();
  }

  static getDerivedStateFromProps({ data }) {
    if (!isEmpty(data.games)) {
      return { gamesAvailable: data.games };
    }
    return {};
  }

  subscribeToGamePool = () => {
    this.props.client.subscribe({
      query: SubscriptionAdded,
      fetchPolicy: "no-cache"
    }).subscribe(data => {
      var game = data.data.gameAdded;
      var actualGames = this.state.gamesAvailable;
      actualGames.push(game);
      this.setState({
        gamesAvailable: actualGames
      });
    });
  }

  joinGame(e) {
    // console.log(e);
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

export default withApollo(graphql(GetAllGames)(GamesPool));
