import React, { useState } from 'react';
import * as taskService from '../TaskService';
import { useNavigate } from 'react-router-dom';

const AddTaskComponent = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [completed, setCompleted] = useState(false); // Keep this as a boolean
    const navigate = useNavigate();

    const saveTask = (e) => {
        e.preventDefault();
        const task = { title, description, completed };
        taskService.createTask(task).then(() => {
            navigate('/tasks'); // Redirect to task list after saving
        }).catch(error => {
            console.error("Error saving task:", error);
        });
    };

    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="card col-md-6 offset-md-3 offset-md-3">
                        <h3 className="text-center">Add Task</h3>
                        <div className="card-body">
                            <form onSubmit={saveTask}>
                                <div className="form-group">
                                    <label>Task Title:</label>
                                    <input
                                        placeholder="Title"
                                        name="title" required
                                        className="form-control"
                                        value={title}
                                         onChange={(e) => setTitle(e.target.value)}
                                          maxLength="255"  // Restricting the title length to 255 characters
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Task Description:</label>
                                    <input
                                        placeholder="Description"
                                        name="description" required
                                        className="form-control"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        maxLength="1000" // Restricting the description length to 1000 characters
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Task Completed?:</label>
                                    <select
                                        className="form-control"
                                        value={completed.toString()} // Ensure the value is a string 'true' or 'false'
                                        onChange={(e) => setCompleted(e.target.value === 'true')}
                                    >
                                        <option value="true">Yes</option>
                                        <option value="false">No</option>
                                    </select>
                                </div>

                                <button className="btn btn-success" type="submit">Save</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddTaskComponent;
