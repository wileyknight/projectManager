import React from 'react';
import { Row, Col } from 'reactstrap';

const CreateDesignTab = (props) => {
    let populateAssets = (assetObj) => {
        if (isEmpty(assetObj)) {
            return (
                <tr>
                    <td>No Files Uploaded</td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
            )
        } else {
            return (
                assetObj.map(asset =>
                    <tr key={asset.id}>
                        <td>{asset.fileName}<img className="current" src={`https://www.wileyknight.com/projectimages/${asset.fileLocation}/${asset.fileName}`} alt={asset.fileName} /></td>
                        <td>{asset.comment}</td>
                        <td>{asset.status}</td>
                        <td>{asset.date}</td>
                    </tr>
                )
            )
        }
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
                        {populateAssets(props.design)}
                    </tbody>
                </table>
            </Col>
        </Row>
    )
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

export default CreateDesignTab