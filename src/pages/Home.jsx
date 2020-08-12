import React from 'react';
import PropTypes from 'prop-types';
import { textStyles } from '../styles';
import { showSuccess } from '../components/Toast';
import NavBar from '../components/NavBar';
import SignInModal from '../components/SignInModal';
import AddProjectModal from '../components/AddProjectModal';
import MainItem from '../components/MainItem';

export default class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showSignInModal: false,
      showAddProjectModal: true
    };
  }

  showSignInModal = () => this.setState({ showSignInModal: true });

  hideSignInModal = () => this.setState({ showSignInModal: false });

  signInSuccess = () => {
    this.hideSignInModal();
    showSuccess('Successfully signed in to admin account.');
  }

  showAddProjectModal = () => this.setState({ showAddProjectModal: true });

  hideAddProjectModal = () => this.setState({ showAddProjectModal: false });

  addProjectSuccess = () => {
    this.hideAddProjectModal();
    showSuccess('Project successfully added.');
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
        <AddProjectModal
          open={this.state.showAddProjectModal}
          hide={this.hideAddProjectModal}
          onSuccess={this.addProjectSuccess}
        />
        <MainItem />
      </div>
    );
  }
}