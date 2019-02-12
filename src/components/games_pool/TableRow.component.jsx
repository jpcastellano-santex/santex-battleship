// Package dependencies
import React, { Component } from 'react';
import { Button } from 'reactstrap';
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

  render() {
    const { id, createdDate, owner } = this.props;

    return (
      <tr>
        <td>{id}</td>
        <td>{createdDate}</td>
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
