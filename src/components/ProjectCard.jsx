import React from 'react';
import PropTypes from 'prop-types';
import {
  Card,
} from 'semantic-ui-react';

const ProjectCard = (props) => (
  <Card style={{ width: 250 }}>
    <div
      style={{
        backgroundImage: `url(${props.mainImg})`,
        backgroundSize: 'cover',
        width: 250,
        height: 250
      }}
    />
    <Card.Content>
      <Card.Header>{props.title}</Card.Header>
      <Card.Meta>{props.date}</Card.Meta>
    </Card.Content>
  </Card>
)

ProjectCard.propTypes = {
  mainImg: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  key: PropTypes.string.isRequired
}

export default ProjectCard;