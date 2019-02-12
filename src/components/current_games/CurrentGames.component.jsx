// Package dependencies
import React, { Component, Fragment } from 'react';
import { compose, graphql, withApollo } from 'react-apollo';
import moment from 'moment';
import { Table } from 'reactstrap';

// Local dependencies
import { formatDateToISO } from '../../helpers/formatters/commons';
import TableRow from './TableRow.component';
import { MyGames } from '../../graphql/queries/Game';
import isEmpty from 'lodash/isEmpty';
// import { FetchMyGames } from '../../graphql/queries/Game';

class CurrentGames extends Component {
  state = { myGames: [] };

  static getDerivedStateFromProps({ data }) {
    if (!isEmpty(data.mygames)) {
      return { myGames: data.mygames };
    }
    return {};
  }

  getRows = () => {
    return this.state.myGames.map((gameData, index) => <TableRow index={index} {...gameData} />);
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

export default withApollo(graphql(MyGames)(CurrentGames));
