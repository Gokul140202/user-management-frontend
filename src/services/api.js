// Frontend/src/services/api.js
const API_URL = "https://user-management-backend-4-o0zo.onrender.com";

// Fetch all users
export const getUsers = () =>
  fetch(API_URL).then((res) => res.json());

// Add a new user
export const addUser = (user) =>
  fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  }).then((res) => res.json());

// Update a user
export const updateUser = (id, user) =>
  fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  }).then((res) => res.json());

// Delete a user
export const deleteUser = (id) =>
  fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  }).then((res) => res.json());

