// src/services/taskService.js

// Mock implementation for demonstration; replace with actual API calls.
export const getTasks = async () => {
  return [
    { id: 1, title: "Sample Task 1", description: "This is a sample task." },
    {
      id: 2,
      title: "Sample Task 2",
      description: "This is another sample task.",
    },
  ];
};

// Additional functions like addTask, updateTask can also be defined here
export const addTask = async (task) => {
  // Send a request to the backend to add a new task
  // Mock response
  return { id: Math.random(), ...task };
};
