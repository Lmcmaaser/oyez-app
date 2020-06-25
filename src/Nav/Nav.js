import React from 'react';
import { Link } from 'react-router-dom';
import Content from '../content';
import './Nav.css';

export default class Nav extends React.Component {
  render () {
    return (
      <Content className='Nav'>
        <Link to='/'>
          Home
        </Link>
        <Link to='/report'>
          Report
        </Link>
        <h4>View Reports by:</h4>
        <Link to='/all'>
          All
        </Link>
        <Link to='/state'>
          State
        </Link>
        <Link to='/zipcode'>
          Zip Code
        </Link>
      </Content>
    )
  }
}
