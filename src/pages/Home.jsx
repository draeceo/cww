import React from 'react';
import PropTypes from 'prop-types';
import { textStyles } from '../styles';
import MainItem from '../components/MainItem';

export default class Home extends React.Component {
  render() {
    return (
      <div>
        <MainItem />
      </div>
    );
  }
}