import React, { useState, useEffect } from 'react';
import { getTaskById, updateTask } from '../TaskService';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateTaskComponent = () => {
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [completed, setCompleted] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        getTaskById(id)
            .then((data) => {
                const task = data;
                console.log("Fetched task data:", task);  // Log fetched task data
                if (task) {
                    setTitle(task.title);
                    setDescription(task.description);
                    setCompleted(task.completed);
                } else {
                    console.error("Task not found");
                    // You could redirect to an error page or show a message to the user
                }
            })
            .catch((err) => {
                console.error('Error fetching task:', err);
            });
    }, [id]);

    // Handle the form submission to update the task
    const handleUpdateTask = (e) => {
        e.preventDefault();
        const updatedTask = { title, description, completed };

        updateTask(id, updatedTask)
            .then(() => {
                // After updating, navigate back to the task list page
                navigate('/tasks');
            })
            .catch((err) => {
                console.error('Error updating task:', err);
            });
    };

    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="card col-md-6 offset-md-3 offset-md-3">
                        <h3 className="text-center">Update Task</h3>
                        <div className="card-body">
                            <form onSubmit={handleUpdateTask}>
                                <div className="form-group">
                                    <label>Task Title:</label>
                                    <input
                                        placeholder="Title"
                                        name="title" required
                                        className="form-control"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
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
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Task Completed?:</label>
                                    <select
                                        className="form-control"
                                        value={completed}
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

export default UpdateTaskComponent;
