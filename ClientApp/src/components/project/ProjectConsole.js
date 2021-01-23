import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProjectConsole = (props) => {

    const updateChanges = (updateStatus) => {
        const baseURL = `/api/assets/${props.currentObj.id}`;

        const data = JSON.stringify(
            {
                id: props.currentObj.id,
                projectID: props.currentObj.projectId,
                filename: props.currentObj.fileName,
                filesize: props.currentObj.fileSize,
                contenttype: props.currentObj.contentType,
                filelocation: props.currentObj.fileLocation,
                filetype: props.currentObj.fileType,
                status: updateStatus,
                pos: props.currentObj.pos,
                neg: props.currentObj.neg,
                comment: props.currentObj.comment
            }
        );

        fetch(baseURL, {
            method: "PUT",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: data
        }).then(res => {
            toast.success('Saved Successfully')
        }).catch(err => {
            toast.error('Oh crap! It failed!')
        });
    }

    if (props.currentObj.status === 'Request') {
        return (
            <div className="inline">
                <ToastContainer />
                <div className="inline">
                    <a href={`asset/?asset=${props.currentObj.id}&project=${props.currentObj.projectId}&company=${props.company}`} className="requestButton button" type="submit" name="Revise">Add Comment</a>
                </div>
                <div className="inline">
                    <button className="finished button" type="submit" name="Finish" onClick={updateChanges.bind(this, 'Closed')}>Finish</button>
                </div>
            </div>
        )
    } else {
        return (
            <div className="inline">
                <ToastContainer />
                <div className="inline">
                    <a href={`asset/?asset=${props.currentObj.id}&project=${props.currentObj.projectId}&company=${props.company}`} className="requestButton button" type="submit" name="Revise" >Request Revision</a>
                </div>
                <div className="inline">
                    <button className="button openApprove approve" type="button" onClick={updateChanges.bind(this, 'Approved')}>Approve</button>
                </div>
            </div>
        )
    }
}
export default ProjectConsole