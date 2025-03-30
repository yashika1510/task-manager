import axios from "axios";

const API_URL = "http://localhost:8080/api/tasks";

// Fetch all tasks
export const getTasks = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
};

// Fetch a single task by ID
export const getTaskById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching task with ID ${id}:`, error);
    throw error;
  }
};
// Create a new task
export const createTask = async (task) => {
  try {
    const response = await axios.post(API_URL, task);
    return response.data;
  } catch (error) {
    console.error("Error creating task:", error);
    throw error;
  }
};
// Delete a task by ID
export const deleteTask = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting task with ID ${id}:`, error);
    throw error;
  }
};
// Update a task by ID
export const updateTask = async (id, task) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, task);
    return response.data;
  } catch (error) {
    console.error(`Error updating task with ID ${id}:`, error);
    throw error;
  }
};