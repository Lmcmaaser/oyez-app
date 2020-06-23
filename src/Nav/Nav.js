import React from 'react'
import { Link } from 'react-router-dom'
import Content from '../content'
import './Nav.css'

export default class Nav extends React.Componenent {
  render () {
    return (
      <Content className='Nav'>
        <Link to='/'>
          Home Page
        </Link>
        <Link to='/report'>
          Report
        </Link>
        <Link to='/data'>
          Data
        </Link>
      </Content>
    )
  }
}
