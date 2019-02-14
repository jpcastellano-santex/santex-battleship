// Package dependencies
import React, { Component } from 'react';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import moment from 'moment';

// Local dependencies
import { formatDate } from '../../helpers/formatters/commons';

const loggeduserid = localStorage.getItem('userid');

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

  render() {
    const { id, createdDate, turn, guest } = this.props;
    return (
      <tr>
        <td>{id}</td>
        <td>{this.timeToDate(createdDate)}</td>
        <td></td>
        {guest &&
          <td>{turn.username}</td>
        }
        {!guest &&
          <td>Unassigned</td>
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
