import React, { Component } from 'react';
import authService from './api-authorization/AuthorizeService';
import ProjectComments from './project/ProjectComments';
import ProjectsTitle from './project/ProjectsTitle';
import ProjectTabs from './project/ProjectTabs';


export class Project extends Component {
    displayName = Project.name;

    constructor(props) {
    super(props);
        this.state = {
            user: {},
            projects: [],
            comments: [],
            assets: [],
            loadingUser: true,
            loadingProjects: true,
            loadingAssets: true,
            loadingComments: true,
            activeTab: '1',
            newComment: "",
            values: {}
        };
    }

    async getProjectDetails(values) {

        const token = await authService.getAccessToken();

        const user = await authService.getUser();
        const currentUser = await fetch(`api/aspnetusers/${user.sub}`, {
            headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
        });
        const projectResponse = await fetch(`api/projects/${values["?company"]}/${values.id}`, {
            headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
        });
        const commentResponse = await fetch('api/comments/' + values.id, {
            headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
        });
        const assetResponse = await fetch('api/assets/find/' + values.id, {
            headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
        });

        const userData = await currentUser.json();
        const projectData = await projectResponse.json();
        const commentData = await commentResponse.json();
        const assetData = await assetResponse.json();

        this.setState({ user: userData, loadingUser: false });
        this.setState({ projects: projectData[0], loadingProjects: false });
        this.setState({ assets: assetData, loadingAssets: false });
        this.setState({ comments: commentData, loadingComments: false });
    }

    componentDidMount() {
        const querystring = require('querystring');
        const values = querystring.parse(this.props.location.search);
        this.setState({ 'values': values });
        this.getProjectDetails(values);
    }

    async updateAssets(id) {
        const token = await authService.getAccessToken();
        const assetResponse = await fetch(`api/assets/find/${id}`, {
            headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
        });
        const assetData = await assetResponse.json();
        this.setState({ assets: assetData, loadingAssets: false });
    }

    render() {
        let sectionTitle = this.state.loadingProjects
            ? <p><em>Loading...</em></p>
            : <ProjectsTitle projects={this.state.projects} />;
        let sectionTabs = this.state.loadingAssets && this.state.loadingProjects
            ? <p><em>Loading...</em></p>
            : <ProjectTabs assets={this.state.assets} company={this.state.projects.company} project={this.state.projects.id} update={this.getProjectDetails.bind(this)} />;
        let sectionComments = this.state.loadingUser && this.state.loadingProjects && this.state.loadingComments
            ? <p><em>Loading...</em></p>
            : <ProjectComments comments={this.state.comments} id={this.state.projects.id} user={this.state.user.id} refreshComments={this.getProjectDetails.bind(this)} val={this.state.values} />;
          
        return (
            <div>
                {sectionTitle}
                {sectionTabs}
                {sectionComments}
            </div>
        );
    }

    
}