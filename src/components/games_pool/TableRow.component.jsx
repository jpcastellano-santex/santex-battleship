// Package dependencies
import React, { Component } from 'react';
import { Button } from 'reactstrap';

// Local dependencies
import { formatDate } from '../../helpers/formatters/commons';


class TableRow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dropdownOpen: false
    };
  }

  toggle = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  };

  render() {
    const {index, createdAt, player} = this.props;

    return (
      <tr>
        <td>{index}</td>
        <td>{formatDate(createdAt)}</td>
        <td>{player.name}</td>
        <td>
          <Button color="info" onClick={this.props.onClick}>Play</Button>
        </td>
      </tr>
    );
  }
}


export default TableRow;
