import React, { useState } from 'react';
import { useDrag } from 'react-dnd';
import PinComment from './PinComment';

const Pin = ({ id, left, top, children, user, asset, project, dataStyle, pos, neg }) => {
    const [commentOpen, setCommentOpen] = useState(false);

    const openComment = () => {
        setCommentOpen(!commentOpen);
    }

    const [{ isDragging }, drag] = useDrag({
        item: { id, left, top, type: 'box' },
        collect: monitor => ({
            isDragging: monitor.isDragging(),
        }),
    })
    if (isDragging) {
        return <div ref={drag} />
    }

    return (
        <div>
            <div ref={drag} className='pins pin' style={{ left, 'top': top }}>
                <span type="button" className="button" onClick={openComment}>{id + 1}</span>
            </div>
            {commentOpen ? <PinComment left={left} top={top} text={children} user={user} asset={asset} project={project} id={dataStyle} pos={pos} neg={neg} close={openComment} /> : null}
        </div>
    )
}

export default Pin