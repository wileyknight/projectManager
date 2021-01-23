import React from 'react';
import { TabContent, TabPane } from 'reactstrap';
import CreateCurrentTab from './ProjectTabCurrent';
import CreateDesignTab from './ProjectTabDesign';
import AssetUpload from './AssetUpload';

const ProjectTabContents = (props) => {
    let isAsset = [];
    let isDesign = [];
    let isCurrent = [];
    let currentObj = [];

    if (props.assets.status === 404) {
        // Do Nothing
    } else {
        
        isAsset = props.assets.filter(asset => asset.fileType === "Asset");
        isDesign = props.assets.filter(asset => asset.fileType === "Design");
        isCurrent = props.assets.filter(asset => asset.fileType === "Current");
        currentObj = { ...isCurrent[0] };
    }

    return (
        <TabContent activeTab={props.activeTab} >

            <TabPane tabId="1">
                <CreateCurrentTab currentObj={currentObj} company={props.company} project={props.project} />
                <AssetUpload origin='Current' projectID={props.project} company={props.company} update={props.update} exists={currentObj.id} />
            </TabPane>

            <TabPane tabId="2">
                <CreateDesignTab design={isDesign} />
            </TabPane>

            <TabPane tabId="3">
                <CreateDesignTab design={isAsset} />
                <AssetUpload origin='Asset' projectID={props.project} company={props.company} update={props.update}  />
            </TabPane>

        </TabContent>
    )
}

export default ProjectTabContents