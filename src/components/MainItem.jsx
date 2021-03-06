import React from 'react';
import { Column, Row } from 'simple-flexbox';
import {
  Button
} from 'semantic-ui-react';
import { colors, textStyles, shadows } from '../styles';
import background from '../img/frame.jpeg';

const MainItem = () => (
  <div
    style={{
      backgroundImage: `url(${background})`,
      backgroundSize: 'cover',
      width: '100vw',
      height: '65vh',
      boxShadow: shadows.box
    }}
  >
    <div
      style={{
        backgroundColor: colors.blackOverlay,
        height: '100%',
        width: '100%',
      }}
    >
      <Column justifyContent='center' style={{ height: '100%' }}>
        <Row justifyContent='center' style={textStyles.mainItem}>
          Dedicated to details.
        </Row>
        <Row justifyContent='center' style={{ paddingTop: 30 }}>
          <Button primary href={'/#about'} style={textStyles.button}>
            Get in touch
          </Button>
        </Row>
      </Column>
    </div>
  </div>
)

export default MainItem;