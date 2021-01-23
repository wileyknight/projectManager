import React, { useState } from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';
import ProjectTabContents from './ProjectTabContents';


const ProjectTabs = (props) => {
    const [activeTab, setActiveTab] = useState('1')

    const toggle = (tab) => {
        if (activeTab !== tab) {
            setActiveTab(tab);
        }
    }

    return (
        <div>
            <Nav tabs>
                <NavItem>
                    <NavLink
                        className={classnames({ active: activeTab === '1' })}
                        onClick={() => { toggle('1'); }}
                    >
                        Current Design
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        className={classnames({ active: activeTab === '2' })}
                        onClick={() => { toggle('2'); }}
                    >
                        Drafts
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        className={classnames({ active: activeTab === '3' })}
                        onClick={() => { toggle('3'); }}
                    >
                        Assets
                    </NavLink>
                </NavItem>
            </Nav>
            <ProjectTabContents assets={props.assets} activeTab={activeTab} company={props.company} project={props.project} update={props.update}/>
        </div>
    )
}

export default ProjectTabs