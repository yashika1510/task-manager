import React, { useState, useEffect } from 'react';
import { getTasks, deleteTask } from '../TaskService';
import { Link } from 'react-router-dom';

const ConfirmationModal = ({ isOpen, onClose, onConfirm, task }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h4>Confirm Deletion</h4>
        <p>Are you sure you want to delete the task "{task?.title}"?</p>
        <div className="modal-actions">
          <button onClick={onClose} className="btn btn-secondary">
            Cancel
          </button>
          <button onClick={onConfirm} className="btn btn-danger">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};


const TaskListComponent = () => {
    const [tasks, setTasks] = useState([]);
    const [error, setError] = useState(null);  // Handle errors
    const [modalOpen, setModalOpen] = useState(false);
     const [taskToDelete, setTaskToDelete] = useState(null);

    useEffect(() => {
        getTasks()
            .then((data) => {
                console.log("Fetched tasks:", data); // Log the fetched tasks to verify
                if (Array.isArray(data)) {
                    setTasks(data);
                } else {
                    setError('The data from the API is not in the expected format.');
                }
            })
            .catch((err) => {
                console.error('Error fetching tasks:', err);
                setError('Error fetching tasks.');
            });
    }, []);

     const confirmDelete = (task) => {
        setTaskToDelete(task);
        setModalOpen(true);
      };


 const handleDeleteTask = () => {
    if (taskToDelete) {
      deleteTask(taskToDelete.id)
        .then(() => {
          setTasks(tasks.filter((t) => t.id !== taskToDelete.id));
          setModalOpen(false);
        })
        .catch((err) => {
          console.error("Error deleting task:", err);
          setError("Error deleting task.");
        });
    }
  };

    return (
        <div>
            <h2 className="text-center">Task List</h2>
            {error && <div className="alert alert-danger">{error}</div>}

            <div className="row">
                <Link to="/add-task" className="btn btn-primary">Add Task</Link>
            </div>

            <div className="row">
                <table className="table task-table">
                    <thead>
                        <tr>
                            <th>Task Title</th>
                            <th>Task Description</th>
                            <th>Completed?</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Check if tasks array is empty */}
                        {tasks.length === 0 ? (
                            <tr>
                                <td colSpan="4">No tasks available</td>
                            </tr>
                        ) : (
                            tasks.map(task => (
                                <tr key={task.id}>
                                    <td>{task.title}</td>
                                    <td>{task.description}</td>
                                    <td>{task.completed ? "Yes" : "No"}</td>
                                    <td>
                                        <Link to={`/update-task/${task.id}`} className="btn btn-info">Update</Link>
                                         <button className="btn btn-danger"
                                           onClick={() => confirmDelete(task)}>
                                           Delete
                                         </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
             <ConfirmationModal
                    isOpen={modalOpen}
                    onClose={() => setModalOpen(false)}
                    onConfirm={handleDeleteTask}
                    task={taskToDelete}
             />
        </div>
    );
};

export default TaskListComponent;
