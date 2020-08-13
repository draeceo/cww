import React from 'react';
import PropTypes from 'prop-types';
import {
  Image,
  Grid,
  Icon
} from 'semantic-ui-react';
import { Row, Column } from 'simple-flexbox';
import { isMobile } from 'react-device-detect';
import { textStyles } from '../styles';
import logo from '../img/cww-black.png';

const Contact = (props) => (
  <Column justifyContent='center' style={{ paddingTop: 50, paddingBottom: 50 }}>
    <Row justifyContent='center'>
      <Grid stackable divided centered columns={2} verticalAlign='middle'>
        <Grid.Column textAlign={isMobile ? 'center' : undefined}>
          <img src={logo} style={{ width: 200, height: 'auto' }} alt='Cremonini Woodworks' />
        </Grid.Column>
        <Grid.Column textAlign={isMobile ? 'center' : undefined}>
          <Row justifyContent={isMobile ? 'center' : undefined} alignItems='center'>
            <Icon name='phone' size='small' />
            <a href={props.phone} style={textStyles.body}>{props.phone}</a>
          </Row>
          <Row justifyContent={isMobile ? 'center' : undefined} alignItems='center'>
            <Icon name='mail' size='small' />
            <a href={`mailto:${props.email}`} style={textStyles.body}>{props.email}</a>
          </Row>
        </Grid.Column>
      </Grid>
    </Row>
  </Column>
)

Contact.propTypes = {
  email: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired
}

export default Contact;