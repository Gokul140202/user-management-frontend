import React, { useEffect, useState } from "react";
import "./UserForm.css";

function UserForm({ onSubmit, editingUser }) {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    department: "",
  });

  useEffect(() => {
    if (editingUser) setForm(editingUser);
  }, [editingUser]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.firstName || !form.lastName || !form.email || !form.department) {
      alert("All fields required");
      return;
    }
    onSubmit(form);
    setForm({ firstName: "", lastName: "", email: "", department: "" });
  };

  return (
    <form className="user-form" onSubmit={handleSubmit}>
      <input
        className="user-input"
        name="firstName"
        placeholder="First Name"
        value={form.firstName}
        onChange={handleChange}
      />
      <input
        className="user-input"
        name="lastName"
        placeholder="Last Name"
        value={form.lastName}
        onChange={handleChange}
      />
      <input
        className="user-input"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
      />
      <input
        className="user-input"
        name="department"
        placeholder="Department"
        value={form.department}
        onChange={handleChange}
      />
      <button className="user-btn" type="submit">
        {editingUser ? "Update" : "Add"} User
      </button>
    </form>
  );
}

export default UserForm;
