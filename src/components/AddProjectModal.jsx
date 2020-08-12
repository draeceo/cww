import React from 'react';
import PropTypes from 'prop-types';
import {
  Modal,
  Form,
  Message,
  Button,
  Icon
} from 'semantic-ui-react';
import { Row } from 'simple-flexbox';
import { isMobile } from 'react-device-detect';
import { putProject } from '../database/ProjectAccess';

export default class AddProjectModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      description: '',
      date: '',
      mainImg: null,
      gallery: [],
      isLoading: false,
      error: false,
      errorMessage: ''
    };
  }

  clearFields = () => {
    this.setState({
      title: '',
      description: '',
      date: '',
      mainImg: [],
      gallery: [],
      isLoading: false,
      error: false,
      errorMessage: ''
    });
  }

  handleClose = () => {
    this.clearFields();
    this.props.hide();
  }

  handleChange = ({ target }) => {
    switch (target.name) {
      case 'mainImg':
        this.setState({ mainImg: target.files[0] });
        break;
      case 'gallery':
        this.setState({ gallery: target.files });
        break;
      default:
        this.setState({ [target.name]: target.value });
        break;
    }
  }

  handleSubmit = async () => {
    this.setState({ isLoading: true });
    try {
      const { title, description, date, mainImg, gallery } = this.state;
      await putProject(true, null, mainImg, gallery, title, description, date);
      this.clearFields();
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

  render() {
    return (
      <Modal
        open={this.props.open}
        onClose={this.handleClose}
        style={{
          width: isMobile ? '90vw' : '40vw'
        }}
      >
        <Modal.Header>
          <Row justifyContent='space-between'>
            Add a Project
            <Icon name='close' onClick={this.props.hide} />
          </Row>
        </Modal.Header>
        <Modal.Content>
          <Form loading={this.state.isLoading} onSubmit={this.handleSubmit}>
            <Form.Input
              required
              name='title'
              label='Title'
              placeholder='ex. Front Porch Renovation'
              onChange={this.handleChange}
            />
            <Form.Input
              required
              name='mainImg'
              label='Main Image'
              type='file'
              accept='image/*'
              onChange={this.handleChange}
            />
            <Form.Input
              required
              name='gallery'
              label='Image Gallery'
              type='file'
              multiple
              accept='image/*'
              onChange={this.handleChange}
            />
            <Form.TextArea
              required
              name='description'
              label='Description'
              placeholder='Provide a concise overview of the project details.'
              onChange={this.handleChange}
            />
            <Form.Input
              required
              name='date'
              label='Project Date'
              type='date'
              onChange={this.handleChange}
            />
            <Message
              error
              visible={this.state.error}
              header='ERROR'
              content={this.state.errorMessage}
            />
            <Button
              primary
              content='Add Project'
              type='submit'
            />
          </Form>
        </Modal.Content>
      </Modal>
    );
  }
}