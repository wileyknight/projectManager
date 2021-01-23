import React, { useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PinComment = ({ left, top, text, user, project, asset, id, pos, neg, close}) => {

    const [newComment, setnewComment] = useState(text);
    const [needSave, setNeedSave] = useState(1);

    const handleEditorChange = (e) => {
        setnewComment(e.target.getContent());
        setNeedSave(3);
    }

    let notification = '';
    const style = { backgroundColor: 'blue', 'top': top + 50 }

    if (needSave === 3) {
        style.backgroundColor = 'orange';
        notification = 'You have unsaved changes.';
    } else if (needSave === 2) {
        style.backgroundColor = 'green';
        notification = 'Your changes have been saved.';
    }

    const saveComment = () => {
        setNeedSave(2);
        setTimeout(timeOut, 3000);
        if (id === undefined) {
            saveToDatabase();
        } else {
            updateDatabase(id);
        }
    }

    const timeOut = () => {
        setNeedSave(1);
    }

    const saveToDatabase = () => {
        const baseURL = "/api/comments";

        const data = JSON.stringify(
            {
                userID: user,
                projectID: project,
                AssetID: asset,
                Pin: left + ',' + top,
                Comment: newComment,
                Pos: 0,
                Neg: 0,
                type: 'Pin',
                action: 'NewPin'
            }
        );

        fetch(baseURL, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: data
        }).then(res => {
            toast.success('upload success')
        }).catch(err => {
            toast.error('upload fail')
        });
    }

    const updateDatabase = (id) => {

        const baseURL = `/api/comments/${id}`;

        const data = JSON.stringify(
            {
                id: id,
                userID: user,
                projectID: project,
                AssetID: asset,
                Pin: left + ',' + top,
                Comment: newComment,
                Pos: pos,
                Neg: neg,
                type: 'Pin',
                action: 'EditPin'
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
            toast.success('upload success')
        }).catch(err => {
            toast.error('upload fail')
        });
        console.log(id)
    }

    return (
        <div className='commentBox' style={style}>
            <ToastContainer />
            <div style={{ height: 44, color: 'white' }}>
                <div style={{ paddingTop: 9, paddingLeft: 15, display: 'inline-block' }}>
                    {notification}
                </div>
                <button type='button' style={{ 'position': 'absolute', 'right': 50 }} onClick={saveComment}>Save</button>
                <button type='button' style={{ 'position': 'absolute', 'right': 0, backgroundColor: 'red' }} onClick={close}>X</button>
            </div>
            <div style={{ 'borderBottom': '4px solid transparent' }}>
            <Editor className='editor'
                initialValue={newComment}
                init={{
                    height: 250,
                    menubar: false,
                    plugins: [
                        'advlist autolink lists link image charmap print preview anchor',
                        'searchreplace visualblocks code',
                        'insertdatetime media table paste code help wordcount'
                    ],
                    toolbar:
                        'undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help'
                }}
                onChange={handleEditorChange}
                />
            </div>
        </div>
    )
}

export default PinComment