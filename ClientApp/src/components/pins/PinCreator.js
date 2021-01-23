import React, { useState } from 'react';
import { useDrop } from 'react-dnd';
import update from 'immutability-helper';
import Pin from './Pin';


const PinCreator = (props) => {

    const [boxes, setBoxes] = useState({
        pins: props.comments
    })

    const [, drop] = useDrop({
        accept: 'box',
        drop(item, monitor) {
            console.log(item)
            const delta = monitor.getDifferenceFromInitialOffset()
            const left = Math.round(item.left + delta.x)
            const top = Math.round(item.top + delta.y)
            moveBox(item.id, (left + ',' + top))
            return undefined
        },
    })

    const moveBox = (id, position) => {
        const getID = boxes.pins.filter(function (pin) {
            return pin.id === id;
        });
        console.log(id, position, getID)
        setBoxes(
            update(boxes, {
                pins: {
                    [id]: {
                        $merge: { pin: position },
                    },
                },
            }),
        )
    }

    const addPin = () => {
        const newPin = { id: 99, pin: '0,0', comment: 'No Comments Available', type: 'Pin', pos: 0, neg: 0 }
        setBoxes(
            update(boxes, {
                pins: {
                    $push: [newPin]
                }
            })
        )
    }

    const LinkLocation = `https://www.wileyknight.com/projectimages/${props.imageSource.fileLocation}/${props.imageSource.fileName}`;

    return (
        <div>
            <button onClick={addPin.bind(this)}>Add Pin</button>
            <div ref={drop} className='imgContainer'>
                {boxes.pins.map((pin, index) => {
                    const positions = pin.pin.split(',');
                    return (
                        <Pin
                            key={pin.id}
                            id={index}
                            left={parseInt(positions[0])}
                            top={parseInt(positions[1])}
                            asset={props.imageSource.id}
                            project={props.imageSource.projectId}
                            user={props.user.id}
                            dataStyle={index}
                            pos={pin.pos}
                            neg={pin.neg}
                        >
                            {pin.comment}
                        </Pin>
                    )
                })}
                <img className="imgDraft" src={LinkLocation} alt={props.imageSource.fileLocation} />
            </div>
        </div>
    )
}

export default PinCreator