import React from 'react';

const ProjectsTitle = (props) => {

    let current = { ...props.projects };

    return (
        <div>
            <div className={current.Status}>
                <h1>{current.name}</h1>
            </div>
            <div>
                {current.description}
            </div>
            <div>
                {current.details}
            </div>
            <div>
                {current.rate}
            </div>
        </div>
    )
}

export default ProjectsTitle