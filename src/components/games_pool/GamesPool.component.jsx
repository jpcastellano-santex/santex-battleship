// Package dependencies
import React, { Component, Fragment } from 'react';
import moment from 'moment';
import { Table } from 'reactstrap';

// Local dependencies
import { formatDateToISO } from '../../helpers/formatters/commons';
import TableRow from './TableRow.component';


// TODO: Replace this mock with data fetched from the backend
const DUMMY_DATA = [
  {createdAt: formatDateToISO(moment()), player: {id: 2, name: 'Donald Trump'}},
];

class GamesPool extends Component {
  state = {gamesAvailable: []};

  getRows = () => {
    return DUMMY_DATA.map((gameData, index) => <TableRow index={index} {...gameData} />);
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

export default GamesPool;
