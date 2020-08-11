import React from 'react';
import PropTypes from 'prop-types';
import { textStyles } from '../styles';
import { showSuccess } from '../components/Toast';
import NavBar from '../components/NavBar';
import SignInModal from '../components/SignInModal';
import MainItem from '../components/MainItem';

export default class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showSignInModal: false
    };
  }

  showSignInModal = () => this.setState({ showSignInModal: true });
  
  hideSignInModal = () => this.setState({ showSignInModal: false });

  signInSuccess = () => {
    this.hideSignInModal();
    showSuccess('Successfully signed in to admin account.');
  }

  render() {
    return (
      <div>
        <NavBar inverted showSignInModal={this.showSignInModal} />
        <SignInModal 
          open={this.state.showSignInModal} 
          hide={this.hideSignInModal} 
          onSuccess={this.signInSuccess} 
        />
        <MainItem />
      </div>
    );
  }
}