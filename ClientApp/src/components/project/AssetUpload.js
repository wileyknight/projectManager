import React, { Component } from 'react';
import { Progress } from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

class AssetUpload extends Component {

    constructor(props) {
        super(props);
        this.state = {
            files: [],
            loaded: 0,
            selected: 'option1'
        };
    }

    selectionChange = (event) => {
        this.setState({ selected: event.target.value })
    }

    updateFiles = (ev) => {
        if (this.maxSelectFile(ev) && this.checkMimeType(ev)) {
            this.setState({ files: ev.target.files[0] });
        }
    }

    maxSelectFile = (event) => {
        let files = event.target.files // create file object
        if (files.length > 3) {
            const msg = 'Only 3 images can be uploaded at a time'
            event.target.value = null // discard selected file
            console.log(msg)
            return false;
        }
        return true;
    }

    checkMimeType = (event) => {
        //getting file object
        let files = event.target.files
        //define message container
        let err = []
        // list allow mime type
        const types = ['image/png', 'image/jpeg', 'image/gif']
        // loop access array
        for (var x = 0; x < files.length; x++) {
            // compare file type find doesn't matach
            if (types.every(type => files[x].type !== type)) {
                // create error message and assign to container   
                err[x] = files[x].type + ' is not a supported format\n'; // assign message to array
            }
        };

        for (var z = 0; z < err.length; z++) { // loop create toast massage
            event.target.value = null
            toast.error(err[z])
        }
        return true;
    }

    sendData() {
        const fileObj = this.state.files;
        const data = new FormData();
        data.append("Company", this.props.company);
        data.append("Neg", 0);
        data.append("Pos", 0);
        data.append("projectID", this.props.projectID);
        data.append("fileLocation", this.props.company);
        data.append("fileSize", fileObj.size);
        data.append("fileType", this.props.origin);
        data.append("contentType", fileObj.type);
        data.append("fileName", fileObj.name);
        data.append("file", fileObj);
        data.append("Status", getStatus(this.props.origin))

        if (this.state.selected === 'option1') {
            axios.post("api/files/?company=Liquid Genetics", data, {
                // receive two    parameter endpoint url ,form data
                onUploadProgress: ProgressEvent => {
                    this.setState({
                        loaded: (ProgressEvent.loaded / ProgressEvent.total * 100),
                    })
                }
            })
            .then(res => {
                this.props.update({ id: this.props.projectID, "?company": this.props.company });
                this.setState({ loaded: 0, files: [] });
                toast.success('upload success');

            })
            .catch(err => {
                toast.error('upload fail');
                this.setState({ loaded: 0, files: [] });
            })
        } else {
            axios.post(`api/fileupdate`, data, {
                // receive two    parameter endpoint url ,form data
                onUploadProgress: ProgressEvent => {
                    this.setState({
                        loaded: (ProgressEvent.loaded / ProgressEvent.total * 100),
                    })
                }
            })
            .then(res => {
                this.props.update({ id: this.props.projectID, "?company": this.props.company });
                this.setState({ loaded: 0, files: [] });
                toast.success('upload success');

            })
            .catch(err => {
                toast.error('upload fail');
                this.setState({ loaded: 0, files: [] });
            })
        }
    }

    setSelectors() {
        if (this.props.exists != undefined) {
            return (
                <div>
                    <div className="radio">
                        <label>
                            <input type="radio" value="option1" checked={this.state.selected === 'option1'} onChange={this.selectionChange} />
                            New
                        </label>
                    </div>
                    <div className="radio">
                        <label>
                            <input type="radio" value="option2" checked={this.state.selected === 'option2'} onChange={this.selectionChange} />
                            Update
                        </label>
                    </div>
                </div>
            )
        }
    }

    render() {
        const style = {
            height: 50,
            border: '1px solid black',
            backgroundColor: 'aliceblue',
            marginBottom: 5
        }
        if (this.props.exists > 0) {
            console.log(this.props)
        }
        
        return (
            <div>
                <div>
                    <p>Upload {this.props.origin}:</p>
                    <input style={style} type="file" name="file" onChange={(ev) => this.updateFiles(ev)} />
                </div>
                <div>
                    <button type="submit" onClick={this.sendData.bind(this)}>Upload</button>
                </div>
                {this.setSelectors()}
                <div className="form-group">
                    <Progress max="100" color="success" value={this.state.loaded} >{Math.round(this.state.loaded, 2)}%</Progress>
                </div>
                <div className="form-group">
                    <ToastContainer />
                    <button onClick={() => this.props.update({ id: this.props.projectID, "?company": this.props.company })}>U</button>
                </div>
            </div>
        )
    }
}

const getStatus = (origin) => {
    if (origin === 'Design' || origin === 'Current') {
        return "Open";
    } else {
        return "Open";
    }
}

export default AssetUpload