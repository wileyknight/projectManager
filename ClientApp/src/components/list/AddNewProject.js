import React, { Component } from 'react';
import DatePicker from "react-datepicker";
import Select from "react-select";
import "react-datepicker/dist/react-datepicker.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export class AddNewProject extends Component {
    displayName = AddNewProject.name;
    constructor(props) {
        super(props);
        this.state = { projectName: "", projectDescription: "", projectDetails: "", projectRate: "", projectCategory: "Medal", dueDate: "" };
        console.log(props)
    }

    updateCategory = cat => {
        this.setState({
            projectCategory: cat
        });
    }

    handleChange = date => {
        console.log(date)
        this.setState({
            dueDate: date
        });
    };

    render() {
        return (
            <div>
                <ToastContainer />

                <label>Name: </label>
                <input className="newProject" type="text" name="name" onChange={(ev) => this.setState({ projectName: ev.target.value })} value={this.state.projectName} /><br />

                <label>Details: </label>
                <textarea className="commentText newProject" name="details" onChange={(ev) => this.setState({ projectDetails: ev.target.value })} value={this.state.projectDetails}></textarea><br />

                <label>Description: </label>
                <textarea className="commentText newProject" name="description" onChange={(ev) => this.setState({ projectDescription: ev.target.value })} value={this.state.projectDescription}></textarea><br />

                <label>Pay: </label>
                <input className="newProject" type="text" name="rate" onChange={(ev) => this.setState({ projectRate: ev.target.value })} value={this.state.projectRate} /><br />
                <br />
                <CategoryPicker val={'Medal'} update={this.updateCategory} />
                <br />
                <label>Due Date: </label>
                <DatePicker selected={this.state.dueDate} onChange={this.handleChange} showTimeSelect dateFormat="Pp" />

                <input className="newProject" type="hidden" name="company" value={this.props.company} disabled />
                
                <br />
                <button id="newProjectSubmit" className="button newProject" type="button" onClick={this.addProject.bind(this, this.props.update)}>Save</button>
                <br />
                <br />
            </div>
        );
    }

    addProject(update) {
        const baseURL = "/api/projects";

        const data = JSON.stringify(
            {
                name: this.state.projectName, details: this.state.projectDetails, description: this.state.projectDescription, rate: this.state.projectRate, category: this.state.projectCategory, status: "New", company: this.props.company, due: this.state.dueDate
            }
        );

        fetch(baseURL, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: data
        })
        .then(res => {
            toast.success('upload success');
            this.setState({ projectName: "", projectDescription: "", projectDetails: "", projectRate: "", projectCategory: "Medal", dueDate: "" });
            update();
        })
        .catch(err => {
            toast.error('upload fail')
        });

    }
}

export class CategoryPicker extends Component {
    state = {
        value: { label: this.props.val, value: this.props.val },
    }

    options = [
        { label: 'Medal', value: 'Medal' },
        { label: 'Pin', value: 'Pin' },
        { label: 'Other', value: 'Other' }
    ]

    handleChange(value) {
        this.setState({ value: value });
        this.props.update(value.value);
    }

    render() {
        return (
            <Select
                options={this.options}
                value={this.state.value}
                onChange={value => this.handleChange(value)}
                defaultValue={{ label: 'Medal', value: 'Medal' }}
            />
        )
    }
}