// Package dependencies
import React, { Component } from 'react';
import { Button } from 'reactstrap';
import moment from 'moment';
// import { Link } from 'react-router-dom';

// Local dependencies
// import { formatDate } from '../../helpers/formatters/commons';


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
    const { id, createdDate, owner } = this.props;
    return (
      <tr>
        <td>{id}</td>
        <td>{this.timeToDate(createdDate)}</td>
        <td>{owner.username}</td>
        <td>
          {/* <Link to={{ pathname: `game/${index}` }}>Play</Link> */}
          <Button color="info" onClick={e => this.props.onClick({ id })}>Play</Button>
        </td>
      </tr>
    );
  }
}


export default TableRow;
