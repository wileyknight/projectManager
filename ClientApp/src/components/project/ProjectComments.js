import React, { useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProjectComments = (props) => {
    
    const [newComment, setNewComment] = useState('');

    const handleEditorChange = (e) => {
        setNewComment( e.target.getContent() );
    }

    function saveComment() {
        console.log(props);
        
        const baseURL = `api/comments/`;

        const data = JSON.stringify(
            {
                projectid: props.id,
                userid: props.user,
                comment: newComment,
                action: 'Group',
                type: "Comment",
                Pos: 0,
                Neg: 0
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
            setNewComment("");
            props.refreshComments(props.val);
            toast.success('upload success');
        }).catch(err => {
            toast.error('upload fail')
        });
    }

    return (
        <div>
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>Comment</th>
                        <th>Status</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {props.comments.map(comment =>
                        <tr key={comment.id}>
                            <td dangerouslySetInnerHTML={{ __html: comment.comment }}></td>
                            <td>{comment.type}</td>
                            <td>{comment.date}</td>
                        </tr>
                    )}
                </tbody>
            </table>
            <hr />
            <Editor
                initialValue={newComment}
                init={{
                    height: 500,
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
                value={newComment}
            />
            <button onClick={saveComment.bind(this)}>Submit</button>
            <ToastContainer />
        </div>
    );
}

export default ProjectComments