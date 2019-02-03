// Package dependencies
import React, { Component, Fragment } from 'react';
import { compose, graphql, withApollo } from 'react-apollo';
import moment from 'moment';
import { Table } from 'reactstrap';

// Local dependencies
import { formatDateToISO } from '../../helpers/formatters/commons';
import TableRow from './TableRow.component';
// import { FetchMyGames } from '../../graphql/queries/Game';


// TODO: Replace this mock with data fetched from the backend
const DUMMY_DATA = [
  {createdAt: formatDateToISO(moment()), timePlayed: 0, currentTurn: {id: 1, player: 'John Doe'}},
];

class CurrentGames extends Component {
  state = {gamesAvailable: []};

  getRows = () => {
    return DUMMY_DATA.map((gameData, index) => <TableRow index={index} {...gameData} />);
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


// export default compose(
//   withApollo,
//   graphql(FetchMyGames),
// )(CurrentGames);

export default CurrentGames;
