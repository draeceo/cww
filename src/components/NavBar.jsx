import React from 'react';
import PropTypes from 'prop-types';
import {
  Menu,
  Image,
  Icon,
  Segment
} from 'semantic-ui-react';
import { textStyles } from '../styles';
import logoWhite from '../img/cww-white.png';
import logoBlack from '../img/cww-black.png';

const menuItemStyle = {
  ...textStyles.navItem,
  margin: '0 0'
}

const menuItems = ['projects', 'about', 'contact'];

export default class NavBar extends React.Component {
  static propTypes = {
    showMgmtModal: PropTypes.func.isRequired
  };

  render() {
    return (
      <Segment inverted={this.props.inverted} style={{ padding: 0, margin: 0 }}>
        <Menu inverted={this.props.inverted} secondary stackable>
          <Menu.Item>
            <Image 
              src={this.props.inverted ? logoWhite : logoBlack} 
              alt='CWW Logo' 
              size='small'
              href='/'
              style={{
                ...menuItemStyle,
                padding: 5
              }}
            />
          </Menu.Item>
          {menuItems.map((item, i) => (
            <Menu.Item
              position={i === 0 ? 'right' : undefined}
              name={item}
              href={item.href ? `/${item.href}` : `/#${item}`}
              style={menuItemStyle}
            />
          ))}
          <Menu.Item>
            <Icon name='setting' inverted={this.props.inverted} onClick={this.props.showMgmtModal} />
          </Menu.Item>
        </Menu>
      </Segment>
    );
  }
}
