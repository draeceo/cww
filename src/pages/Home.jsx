import React from 'react';
import PropTypes from 'prop-types';
import { textStyles } from '../styles';

export default class Home extends React.Component {
  render() {
    return (
      <h1 style={textStyles.heading}>Home</h1>
    );
  }
}