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
import icon from '../img/cww-icon.png';

const menuItemStyle = {
  ...textStyles.navItem,
  margin: '0 0'
}

const menuItems = ['projects', 'about', { name: 'contact', href: '#about' }];

export default class NavBar extends React.Component {
  static propTypes = {
    showSignInModal: PropTypes.func.isRequired
  };

  render() {
    return (
      <Segment inverted={this.props.inverted} style={{ padding: 0, margin: 0, borderRadius: 0 }}>
        <Menu inverted={this.props.inverted} secondary stackable>
          <Menu.Item>
            <Image
              src={icon}
              alt='CWW Logo'
              href='/'
              style={{
                ...menuItemStyle,
                width: 40,
                height: 'auto',
                padding: 5
              }}
            />
          </Menu.Item>
          {menuItems.map((item, i) => (
            <Menu.Item
              position={i === 0 ? 'right' : undefined}
              key={item.name || item}
              name={item.name || item}
              href={item.href ? `/${item.href}` : `/#${item}`}
              style={menuItemStyle}
            />
          ))}
          <Menu.Item>
            <Icon name='setting' inverted={this.props.inverted} onClick={this.props.showSignInModal} />
          </Menu.Item>
        </Menu>
      </Segment>
    );
  }
}
