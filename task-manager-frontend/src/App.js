import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TaskListComponent from './Components/TaskListComponent';
import AddTaskComponent from './Components/AddTaskComponent';
import UpdateTaskComponent from './Components/UpdateTaskComponent';


const App = () => {
    return (
        <Router>
            <div className="container">
                <Routes>
                    <Route path="/" element={<TaskListComponent />} />
                    <Route path="/tasks" element={<TaskListComponent />} />
                    <Route path="/add-task" element={<AddTaskComponent />} />
                    <Route path="/update-task/:id" element={<UpdateTaskComponent />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
