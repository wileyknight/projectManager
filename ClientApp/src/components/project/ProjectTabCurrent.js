import React from 'react';
import { Row, Col } from 'reactstrap';
import ProjectConsole from './ProjectConsole';

const CreateCurrentTab = (props) => {
    if (isEmpty(props.currentObj)) {
        return <div style={{ padding: 100, textAlign: "center" }}>No Current Design</div>
    }
    return (
        <Row>
            <Col sm="12">
                <table className='table table-striped' aria-labelledby="tabelLabel">
                    <thead>
                        <tr>
                            <th>Version</th>
                            <th>Comment</th>
                            <th>Status</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{props.currentObj.fileName}<img className="current" src={`https://www.wileyknight.com/projectimages/${props.currentObj.fileLocation}/${props.currentObj.fileName }`} alt={props.currentObj.fileName} /></td>
                            <td dangerouslySetInnerHTML={{ __html: props.currentObj.comment }}></td>
                            <td>{props.currentObj.status}</td>
                            <td>{props.currentObj.date}</td>
                        </tr>
                    </tbody>
                </table>

                {checkStatus(props.currentObj, props.company)}
            </Col>
        </Row>
    )
}
export default CreateCurrentTab

function checkStatus(currentObj, company) {
    if (currentObj.status === 'Open') {
        return <ProjectConsole currentObj={currentObj} company={company} />
    }
}

function isEmpty(obj) {
    const hasOwnProperty = Object.prototype.hasOwnProperty;

    if (obj == null) return true;
    if (obj.length > 0) return false;
    if (obj.length === 0) return true;
    if (typeof obj !== "object") return true;
    for (var key in obj) {
        if (hasOwnProperty.call(obj, key)) return false;
    }
    return true;
}