import React, { useEffect, useState } from "react";
import UserTable from "./components/UserTable";
import UserForm from "./components/UserForm";
import SearchBar from "./components/SearchBar";
import FilterPopup from "./components/FilterPopup";
import Pagination from "./components/Pagination";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    firstName: "",
    lastName: "",
    email: "",
    department: "",
  });
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  // Load users from backend
  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error(err));
  }, []);

  const handleAddUser = async (user) => {
    await fetch("http://localhost:5000/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });
    // reload users
    const res = await fetch("http://localhost:5000/users");
    const data = await res.json();
    setUsers(data);
  };

  const handleUpdateUser = async (id, user) => {
    await fetch(`http://localhost:5000/users/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });
    setEditingUser(null);
    const res = await fetch("http://localhost:5000/users");
    const data = await res.json();
    setUsers(data);
  };

  const handleDeleteUser = async (id) => {
    await fetch(`http://localhost:5000/users/${id}`, { method: "DELETE" });
    const res = await fetch("http://localhost:5000/users");
    const data = await res.json();
    setUsers(data);
  };

  // Filter + search
  const filteredUsers = users.filter((u) => {
    return (
      (!filters.firstName || u.firstName.toLowerCase().includes(filters.firstName.toLowerCase())) &&
      (!filters.lastName || u.lastName.toLowerCase().includes(filters.lastName.toLowerCase())) &&
      (!filters.email || u.email.toLowerCase().includes(filters.email.toLowerCase())) &&
      (!filters.department || u.department.toLowerCase().includes(filters.department.toLowerCase())) &&
      (u.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.department.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  });

  // Pagination logic
  const displayedUsers = filteredUsers.slice((page - 1) * limit, page * limit);

  return (
    <div className="app">
      <h1>User Management Dashboard</h1>
      <SearchBar setSearchQuery={setSearchQuery} />
      <FilterPopup filters={filters} setFilters={setFilters} />
      <UserForm
        onSubmit={
          editingUser
            ? (user) => handleUpdateUser(editingUser.id, user)
            : handleAddUser
        }
        editingUser={editingUser}
      />
      <UserTable
        users={displayedUsers}
        onEdit={setEditingUser}
        onDelete={handleDeleteUser}
      />
      <Pagination
        total={filteredUsers.length}
        page={page}
        setPage={setPage}
        limit={limit}
        setLimit={setLimit}
      />
    </div>
  );
}

export default App;
