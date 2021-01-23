import React, { Component } from 'react';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

export class AddNewProject extends Component {
    displayName = AddNewProject.name;
    constructor(props) {
        super(props);
        this.state = { projectName: "", projectDescription: "", projectDetails: "", projectRate: "", projectCategory: "", startDate: new Date() };
    }

    handleChange = date => {
        this.setState({
            startDate: date
        });
    };

    render() {
        return (
            <div className="shade">
                <div className="formWrapper popup">
                    <div className="wrapper">
                        <div className="pinContainer">
                            <a href='#' className='pins' data=''><div className='pin'></div></a>
                            <div className="comment comment{space}"><button className="closePin" data="">Close</button>{space}</div>
                            <div className="pin newPin"></div>
                        </div>
                        <div>
                            <label>Comment: </label>
                            <textarea className="commentText" id="textComment" rows="4" name="commentText"></textarea>
                        </div>
                        <input className="pinLocation" type="text" name="commentPin" value="" />
                        <input type="hidden" name="id" value="{space}" />
                        <input type="submit" name="addcomment" value="Save" />
                        <button className="closeComment">Close</button>
                    </div>
                </div>
            </div>
        );
    }

    addProject(close) {
        const baseURL = "/api/projects";

        const data = JSON.stringify(
            {
                name: this.state.projectName, details: this.state.projectDetails, description: this.state.projectDescription, rate: this.state.projectRate, category: this.state.projectCategory, status: "New", company: this.props.company
            }
        );

        const fetchTask = fetch(baseURL, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: data
        });

        close();
    }
}