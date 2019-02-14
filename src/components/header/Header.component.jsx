// Package dependencies
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { withRouter } from 'react-router-dom';

// Styles
import classes from './Header.module.scss';

const userName = localStorage.getItem('username');

class Header extends Component {
  constructor() {
    super()
    this.state = {
      dropdownOpen: false
    };
  }

  toggle = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  };

  stats = () => {
    this.props.history.push('/stats');
  }

  logout = () => {
    localStorage.removeItem('userid');
    localStorage.removeItem('username');
    window.location.reload();
  }

  render = () => {
    if (userName) {
      return (
        <div className={classes.header}>
          <Link to="/" className={classes.header_logo}>
            Home
        </Link>
          <div className={classes.header_options}>
            <ul className={classes.header_buttons}>
              <li>
                <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                  <DropdownToggle caret size="sm">{userName}</DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem header>See board</DropdownItem>
                    <DropdownItem onClick={this.stats}>Stats</DropdownItem>
                    <DropdownItem onClick={this.logout}>LogOut</DropdownItem>
                  </DropdownMenu>
                </ButtonDropdown>
              </li>
            </ul>
          </div>
        </div>);
    }
    return <div className={classes.header}>
      <Link to="/" className={classes.header_logo}>
        Home
      </Link>
    </div>;
  }
}

export default withRouter(Header);
