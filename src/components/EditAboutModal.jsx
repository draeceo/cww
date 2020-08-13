import React from 'react';
import PropTypes from 'prop-types';
import {
  Modal,
  Form,
  Button,
  Message
} from 'semantic-ui-react';
import { isMobile } from 'react-device-detect';
import { getAbout, putAbout } from '../database/TextAccess';
import { textStyles } from '../styles';

export default class EditAboutModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      aboutText: '',
      isLoading: false,
      error: false,
      errorMessage: false
    };
  }

  componentWillReceiveProps() {
    this.setState({ aboutText: this.props.aboutText });
  }

  handleSubmit = async () => {
    this.setState({ isLoading: true });
    try {
      await putAbout(this.state.aboutText);
      this.props.onSuccess();
    } catch (e) {
      this.setState({
        error: true,
        errorMessage: e.message
      });
    } finally {
      this.setState({ isLoading: true });
    }
  }

  render() {
    return (
      <Modal
        open={this.props.open}
        onClose={this.props.hide}
        style={{
          width: isMobile ? '90vw' : '50vw'
        }}
      >
        <Modal.Header>Edit About</Modal.Header>
        <Modal.Content>
          <Form
            loading={this.state.isLoading}
            onSubmit={this.handleSubmit}
          >
            <Form.TextArea
              required
              label='About Text'
              value={this.state.aboutText}
              onChange={({ target }) => this.setState({ aboutText: target.value })}
              style={{ minHeight: 200 }}
            />
            <Message
              error
              visible={this.state.error}
              header='ERROR'
              content={this.state.errorMessage}
            />
            <Button
              primary
              content='Update About'
              type='submit'
            />
          </Form>
        </Modal.Content>
      </Modal>
    )
  }
}