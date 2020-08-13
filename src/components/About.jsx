import React from 'react';
import {
  Image,
  Container,
  Grid,
  Icon
} from 'semantic-ui-react';
import { Row, Column } from 'simple-flexbox';
import { getAbout } from '../database/TextAccess';
import { isSignedIn } from '../database/AdminAccess';
import { textStyles, shadows } from '../styles';
import { showSuccess } from '../components/Toast';
import headshot from '../img/headshot.jpeg';
import EditAboutModal from '../components/EditAboutModal';

export default class About extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      aboutText: '',
      showEditAboutModal: false
    };
  }

  showEditAboutModal = () => this.setState({ showEditAboutModal: true });

  hideEditAboutModal = () => this.setState({ showEditAboutModal: false });

  editModalSuccess = () => {
    this.hideEditAboutModal();
    showSuccess('About text successfully updated.');
  }

  loadAbout = async () => {
    const aboutText = await getAbout();
    this.setState({ aboutText });
  }

  componentDidMount() {
    this.loadAbout()
  }

  render() {
    return (
      <div style={{ boxShadow: shadows.box }}>
        <EditAboutModal
          open={this.state.showEditAboutModal}
          hide={this.hideEditAboutModal}
          onSuccess={this.editModalSuccess}
          aboutText={this.state.aboutText}
        />
        <Column justifyContent='center' style={{ padding: '100px 25px', backgroundColor: '#000' }}>
          <Row justifyContent='space-between' style={{ marginBottom: 14 }}>
            <h1 style={{...textStyles.heading, color: '#fff'}}>About</h1>
            {
              isSignedIn() ?
              <Icon name='setting' inverted onClick={this.showEditAboutModal} />
              : null
            }
          </Row>
          <Grid stackable columns={2} centered>
            <Grid.Column width={3} verticalAlign='middle'>
              <Image circular src={headshot} alt='About Me' style={{ width: 200, height: 200, objectFit: 'cover' }} />
            </Grid.Column>
            <Grid.Column width={9}>
              <p style={{ ...textStyles.subHeading, color: '#fff' }}>CARLO CREMONINI</p>
              <p style={{ ...textStyles.body, color: '#fff' }}>
                {this.state.aboutText}
              </p>
            </Grid.Column>
          </Grid>
        </Column>
      </div>
    );
  }
}