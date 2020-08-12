import React from 'react';
import PropTypes from 'prop-types';
import {
  Modal,
  Button,
  Icon
} from 'semantic-ui-react';
import { Row } from 'simple-flexbox';
import { isMobile } from 'react-device-detect';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import { textStyles } from '../styles';
import { isSignedIn } from '../database/AdminAccess';
import { showError } from '../components/Toast';
import { deleteProject } from '../database/ProjectAccess';

export default class ViewProjectModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false
    };
  }

  deleteProject = async () => {
    const { projectKey } = this.props;
    this.setState({ isLoading: true })
    try {
      await deleteProject(projectKey);
      this.props.onSuccess();
    } catch (e) {
      showError(e.message);
    } finally {
      this.setState({ isLoading: false });
    }
  }

  renderGallery = () => {
    const { mainImg, gallery } = this.props.projectData;
    const carousel = [mainImg].concat(gallery);
    return (
      <Carousel showArrows showThumbs={false} style={{ }}>
        {
          carousel.map((src) => {
            return <div style={{
               height: isMobile ? '80vw' : 400,
               backgroundImage: `url(${src})`,
               backgroundSize: 'cover'
              }} />
          })
        }
      </Carousel>
    )
  }

  render() {
    const { title, description, date } = this.props.projectData;

    return (
      <Modal
        open={this.props.open}
        onClose={this.props.hide}
        style={{
          width: isMobile ? '90vw' : 400
        }}
      >
        <Modal.Header>
          <Row justifyContent='space-between'>
            <div>
              {title}
              <h3 style={textStyles.subBody}>{date}</h3>
            </div>
            <Icon name='close' onClick={this.props.hide} />
          </Row>
        </Modal.Header>
        {this.renderGallery()}
        <div style={{ padding: 15, ...textStyles.body }}>
          <h2 style={textStyles.subHeading}>Description</h2>
          {description}
        </div>
        {
          isSignedIn() ?
          <div style={{ padding: 15 }}>
            <Button
              color='red'
              content='Delete Project'
              loading={this.state.isLoading}
              onClick={this.deleteProject}
            />
          </div>
          : null
        }
      </Modal>
    );
  }
}