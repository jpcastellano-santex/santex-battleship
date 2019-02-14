// Package dependencies
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// Styles
import classes from './Header.module.scss';

const userName = localStorage.getItem('username');

class Header extends Component {
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
                <b>{userName}</b>
                <Link to="/stats" className={classes.header_button}>
                  Stats
                </Link>
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

export default Header;
