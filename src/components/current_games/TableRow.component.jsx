// Package dependencies
import React, { Component } from 'react';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import moment from 'moment';

import TimeElapsed from './TimeElapsed.component';

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

  timeToDate = (time) => {
    var date = new Date(parseInt(time));
    return moment(date).format("DD/MM/YYYY HH:mm");
  }

  getTime = (time) => {
    return new Date(parseInt(time));
  }

  render() {
    const { id, createdDate, turn, guest, startDate } = this.props;
    return (
      <tr>
        <td>{id}</td>
        <td>{this.timeToDate(createdDate)}</td>
        <TimeElapsed time={startDate}></TimeElapsed>
        {guest &&
          <td>{turn.username}</td>
        }
        {!guest &&
          <td>-</td>
        }
        <td>
          <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
            <DropdownToggle caret size="sm">
              Actions
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem header>See board</DropdownItem>
              <DropdownItem onClick={e => this.props.onPlayClick({ id })}>Play</DropdownItem>
            </DropdownMenu>
          </ButtonDropdown>
        </td>
      </tr>
    );
  }
}


export default TableRow;
