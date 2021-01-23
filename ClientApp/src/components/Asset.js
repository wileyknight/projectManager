import React, { Component, Redirect } from 'react';
import authService from './api-authorization/AuthorizeService';
import { Editor } from '@tinymce/tinymce-react';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import PinCreator from './pins/PinCreator';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export class Asset extends Component {
    displayName = Asset.name;

    constructor(props) {
        super(props);
        this.state = {
            user: {}, asset: {}, comments: {}, loading: true, showpopup: false, editing: "", querystring: {}, x: 0, y: 0, newComment: ""
        };
    }

    componentDidMount() {
        const querystring = require('querystring');
        const values = querystring.parse(this.props.location.search);
        this.setState({ querystring: values });
        console.log(values);
        this.createAssetView(values);
    }

    viewPopup = (toggle) => {
        this.setState({ showPopup: toggle });
        if (!toggle) {
            this.createAssetView();
        }
    }

    handleEditorChange = (e) => {
        this.setState({ newComment: e.target.getContent() });
    }

    editProject(projectID) {
        this.setState({ editing: projectID.id });
    }

    editingProject(event, currentProject, prop) {
        // get the index of the object array from the current project
        const projectIndex = this.state.projects.findIndex(p => {
            return p.id === currentProject.id;
        });
        // get the current states object from the index array
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

    renderAsset = Asset => {
        const pinComments = this.state.comments.filter(function (pin) {
            return pin.type === "Pin";
        });
        console.log(pinComments);
        return (
            <div className="commentWrapper">

                <a href={`project/?company=${this.state.querystring['company']}&id=${this.state.querystring.project}`} style={{ float: 'right' }} className="requestButton button">Back</a>
                <button style={{ float: 'right' }} className="requestButton button" onClick={this.saveProject.bind(this, Asset)}>Save</button>
                
                <ToastContainer />

                <DndProvider backend={HTML5Backend}>
                    <PinCreator hideSourceOnDrag='true' user={this.state.user} imageSource={Asset} comments={pinComments} />
                </DndProvider>

                <div>
                    <label>Comment: </label>
                    <Editor
                        initialValue={this.state.newComment}
                        init={{
                            height: 500,
                            menubar: false,
                            plugins: [
                                'advlist autolink lists link image charmap print preview anchor',
                                'searchreplace visualblocks code',
                                'insertdatetime media table paste code help wordcount'
                            ],
                            toolbar:
                                'undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help'
                        }}
                        onChange={this.handleEditorChange}
                    />
                </div>
                
            </div>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderAsset(this.state.asset);
        if (this.state.return === true) {
            return <Redirect
                        to={{
                            pathname: "/",
                            search: "?company=Liquid Genetics&id=14"
                        }}
                   />
        }
        return (
            <div>
                {contents}
            </div>
        );
    }

    async createAssetView(val) {

        const token = await authService.getAccessToken();

        const user = await authService.getUser();
        const currentUser = await fetch('api/aspnetusers/' + user.sub, {
            headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
        });

        const userData = await currentUser.json();

        const response = await fetch(`/api/assets/${val["?asset"]}`, {
            headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();

        const comment = await fetch(`/api/comments/${ val.project }`, {
            headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
        });
        const commentData = await comment.json();

        this.setState({ user: userData, asset: data, comments: commentData, newComment: data.comment, loading: false });
    }

    saveProject(Asset) {
        const baseURL = `api/assets/${Asset.id}`;

        const data = JSON.stringify(
            {
                id: Asset.id,
                projectID: Asset.projectId,
                fileName: Asset.fileName,
                fileSize: Asset.fileSize,
                contentType: Asset.contentType,
                fileLocation: Asset.fileLocation,
                fileType: Asset.fileType,
                status: 'Review',
                comment: this.state.newComment,
                Pos: Asset.pos,
                Neg: Asset.neg
            }
        );

        fetch(baseURL, {
            method: "PUT",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: data
        })
        .then(res => {
            toast.success('Changes Saved');
        })
        .catch(err => {
            toast.error('System Fail')
        });
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
