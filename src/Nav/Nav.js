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
        <Link to='/all'>
          View All
        </Link>
        <Link to='/state'>
          View by State
        </Link>
        <Link to='/zipcode'>
          View by Zip Code
        </Link>
      </Content>
    )
  }
}
