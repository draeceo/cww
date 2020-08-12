import React from 'react';
import PropTypes from 'prop-types';
import {
  Modal,
  Image,
  Container,
  Icon,
  Button
} from 'semantic-ui-react';
import { isMobile } from 'react-device-detect';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import { textStyles } from '../styles';

export default class ViewProjectModal extends React.Component {
  componentDidMount() {
    console.log(this.props.projectData);
  }

  renderGallery = () => {
    const { mainImg, gallery, title } = this.props.projectData;
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
          <div>
           {title}
           <h3 style={textStyles.subBody}>{date}</h3>
          </div>
        </Modal.Header>
        {this.renderGallery()}
        <div style={{ padding: 15, ...textStyles.body }}>
          <h2 style={textStyles.subHeading}>Description</h2>
          {description}
        </div>
      </Modal>
    );
  }
}