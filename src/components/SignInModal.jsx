import React from 'react';
import {
  Modal,
  Form,
  Button,
  Message,
  Container
} from 'semantic-ui-react';
import { isMobile } from 'react-device-detect';
import { signInAdmin, isSignedIn, signOutAdmin } from '../database/AdminAccess';
import { showError } from './Toast';

export default class SignInModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      isLoading: false,
      error: false,
      errorMessage: ''
    };
  }

  handleChange = ({ target }) => this.setState({ [target.name]: target.value });

  handleSubmit = async () => {
    this.setState({ isLoading: true });
    try {
      const { email, password } = this.state;
      await signInAdmin(email, password);
      this.setState({ error: false });
      this.props.onSuccess();
    } catch (e) {
      this.setState({
        error: true,
        errorMessage: e.message
      });
    } finally {
      this.setState({ isLoading: false });
    }
  }

  handleClose = () => {
    this.setState({
      email: '',
      password: '',
      isLoading: false,
      error: false
    });
    this.props.hide();
  }

  handleSignOut = async () => {
    try {
      await signOutAdmin();
      this.props.hide();
    } catch (e) {
      showError(e.message);
    }
  }
  
  render() {
    return (
      <Modal
        open={this.props.open}
        onClose={this.handleClose}
        style={{
          width: isMobile ? '90vw' : '40vw'
        }}
      >
        <Modal.Header>Admin Sign In</Modal.Header>
        <Modal.Content>
          {
            isSignedIn() ?
            <div>
              <Container style={{ paddingBottom: 15 }}>
                You're already signed in, click here to sign out.
              </Container>
              <Button primary onClick={this.handleSignOut}>Sign Out</Button>
            </div>
            :
            <Form loading={this.state.isLoading}>
              <Form.Input name='email' label='Email' type='email' onChange={this.handleChange} />
              <Form.Input name='password' label='Password' type='password' onChange={this.handleChange} />
              <Message
                error
                visible={this.state.error}
                header='ERROR'
                content={this.state.errorMessage}
              />
              <Button primary onClick={this.handleSubmit}>Sign In</Button>
            </Form>
          }
        </Modal.Content>
      </Modal>
    )
  }
}