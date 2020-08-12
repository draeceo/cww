import React from 'react';
import {
  Grid,
  Icon
} from 'semantic-ui-react';
import { Row, Column } from 'simple-flexbox';
import { getAllProjects } from '../database/ProjectAccess';
import { isSignedIn } from '../database/AdminAccess';
import { textStyles } from '../styles';
import { showSuccess } from '../components/Toast';
import ProjectCard from './ProjectCard';
import AddProjectModal from '../components/AddProjectModal';
import ViewProjectModal from '../components/ViewProjectModal';

export default class ProjectView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      projects: [],
      showAddProjectModal: false,
      showViewProjectModal: false,
      activeProjectData: {}
    };
  }

  showAddProjectModal = () => this.setState({ showAddProjectModal: true });

  hideAddProjectModal = () => this.setState({ showAddProjectModal: false });

  showViewProjectModal = (key, data) => this.setState({ showViewProjectModal: true, activeProjectKey: key, activeProjectData: data });

  hideViewProjectModal = () => this.setState({ showViewProjectModal: false });

  deleteProjectSuccess = () => {
    this.hideViewProjectModal();
    showSuccess('Project successfully deleted.');
  }

  addProjectSuccess = () => {
    this.hideAddProjectModal();
    showSuccess('Project successfully added.');
  }

  loadProjects = async () => {
    const projects = await getAllProjects();
    this.setState({ projects });
  }

  renderProjects = () => {
    const { projects } = this.state;
    const projectCards = Object.keys(projects).map((key) => {
      const data = projects[key];
      return (
        <Grid.Column style={{ minWidth: 280 }}>
          <Row justifyContent='center'>
            <div onClick={() => this.showViewProjectModal(key, data)}>
              <ProjectCard
                mainImg={data.mainImg}
                title={data.title}
                date={data.date}
              />
            </div>
          </Row>
        </Grid.Column>
      )
    });
    return <Grid stackable centered columns={5}>{projectCards}</Grid>
  }

  componentDidMount() {
    this.loadProjects();
  }

  render() {
    return (
      <div>
        <AddProjectModal
          open={this.state.showAddProjectModal}
          hide={this.hideAddProjectModal}
          onSuccess={this.addProjectSuccess}
        />
        <ViewProjectModal
          open={this.state.showViewProjectModal}
          hide={this.hideViewProjectModal}
          onSuccess={this.deleteProjectSuccess}
          projectKey={this.state.activeProjectKey}
          projectData={this.state.activeProjectData}
        />
        <Column
          justifyContent='center'
          style={{
            padding: '15px 20px'
          }}
        >
          <Row justifyContent='space-between'>
          <h1 style={textStyles.heading}>Projects</h1>
          {
            isSignedIn() ?
            <Icon
              name='plus'
              onClick={this.showAddProjectModal}
            />
            : null
          }
          </Row>
          {this.renderProjects()}
        </Column>
      </div>
    );
  }
}