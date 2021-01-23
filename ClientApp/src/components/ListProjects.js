import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import authService from './api-authorization/AuthorizeService';
import { AddNewProject } from './list/AddNewProject';


export class ListProjects extends Component {
    displayName = ListProjects.name;

    constructor(props) {
        super(props);
        this.state = {
            user: {}, projects: [], loading: true, showpopup: false, editing: "", projectName: "", projectDescription: "", projectDetails: "", projectRate: "", projectCategory: "" };
    }

    componentDidMount() {
        this.createProjectsList();
    }

    viewPopup = () => {
        this.setState({ showpopup: !this.state.showpopup });
    }

    editProject(projectID) {
        this.setState({ editing: projectID.id });
    }

    editingProject(event, currentProject, prop) {
        // get the index of the object array from the current project
        const projectIndex = this.state.projects.findIndex(p => {
            return p.id === currentProject.id;
        });
        // get the current states object from the index array and spread the contents into a new empty object
        const replaceProject = {
            ...this.state.projects[projectIndex]
        };
        // replace the object key from the events name with the new value passed thru the event
        replaceProject[event.target.name] = event.target.value;
        // create a copy of the state projects
        const projectsCopy = [...this.state.projects];
        // assign the replaced data to the retrieved index in the copy
        projectsCopy[projectIndex] = replaceProject;
        // replace the state data with the new object copy
        this.setState({ projects: projectsCopy });
    }

    deleteProject(projectID) {
        const projectList = [...this.state.projects.slice()];
        projectList.splice(projectID, 1)
        this.setState({ projects: projectList })
        this.deleteVillain(projectID);
        this.createProjectsList();
    }

    renderProjectRow(project, index) {
        if (this.state.editing === project.id) {
            return (
                <tr key={project.id}>
                    <td><input onChange={(ev) => this.editingProject(ev, project, "name")} name="name" value={project.name} type="text" /></td>
                    <td><input className="newProject" type="text" name="rate" onChange={(ev) => this.editingProject(ev, project, "rate")} value={project.rate} /></td>
                    <td>{project.category}</td>
                    <td>{project.status}</td>
                    <td>{project.date}</td>
                    <td><button className="button save" onClick={this.saveProject.bind(this, project)}>Save</button> - <button className="button alert" onClick={this.deleteProject.bind(this, project.id)}>X</button></td>
                </tr>
            )
        } else {
            return (
                <tr key={project.id}>
                    <td><a href={`/project/?company=${project.company}&id=${project.id}`}>{project.name}</a></td>
                    <td>{project.rate}</td>
                    <td>{project.category}</td>
                    <td>{project.status}</td>
                    <td>{project.date}</td>
                    <td><button className="button edit" onClick={this.editProject.bind(this, project)}>Edit</button></td>
                </tr>
            )
        }
    }

    renderProjectsTable = projects => {
        return (
            <div className="projectHeading">
                <button className="button addProject project" type="button" onClick={this.viewPopup}>Add Project</button>
                {this.state.showpopup ? <AddNewProject company={this.state.user.company} update={this.createProjectsList.bind(this)} /> : null}
                <h1 id="ProjectsTable" >Projects</h1>
                <p>All current projects</p>
                <table className='table table-striped' aria-labelledby="tabelLabel">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Rate</th>
                            <th>Category</th>
                            <th>Status</th>
                            <th>Date</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {projects.map((project, index) =>
                            this.renderProjectRow(project, index)
                        )}
                    </tbody>
                </table>
                
            </div>
        );
    }

    render() {
        let contents = this.state.loading
                        ? <p><em>Loading...</em></p>
                        : this.renderProjectsTable(this.state.projects);
        return (
            <div>
                {contents}
            </div>
        );
    }

    async createProjectsList() {
        const token = await authService.getAccessToken();

        const user = await authService.getUser();
        const currentUser = await fetch('api/aspnetusers/' + user.sub, {
            headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
        });

        const userData = await currentUser.json();
        const response = await fetch('/api/projects/search/' + userData.company, {
            headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
        
        this.setState({ user: userData, projects: data, loading: false });
    }

    saveProject(project) {
        const baseURL = `/api/projects/${project.id}`;

        const data = JSON.stringify(
            {
                id: project.id,
                name: project.name,
                description: project.description,
                details: project.details,
                rate: project.rate,
                category: project.category,
                company: project.company
            }
        );

        fetch(baseURL, {
            method: "PUT",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: data,
            success: function (result) {
                console.log(result);
            },

            error: function (xhr, resp, text) {
                console.log(xhr, resp, text);
            }
        })

        this.setState({ editing: "" });
    }

    deleteVillain(projectID) {
        const baseURL = "/api/projects";

        fetch(baseURL + "/" + projectID, {
            method: "DELETE",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            }
        })
    }
    
}