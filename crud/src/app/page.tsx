"use client";
import { useState, useEffect } from "react";
import "./page.css";
import axios from "axios";

export default function Home() {
  const blankUserObj = {
    name: "",
    roll: "",
    email: "",
    phone: "",
  };
  const [user, setUser] = useState(blankUserObj);
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState("");

  const handleUserInput = (e: any) => {
    const { name, value } = e.target;
    setUser((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const getAllUsers = async () => {
    try {
      const res = await axios.get("http://localhost:3001/api/users");
      if (res.status === 200) {
        setUsers(res.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleUser = async (e: any) => {
    e.preventDefault();
    if (userId) {
      // edit User
      try {
        const res = await axios.put(`http://localhost:3001/api/users/${userId}`,user);
        console.log();
        if (res.status === 200) {
          getAllUsers();
          setUser(blankUserObj);
          setUserId("");
        }
      } catch (err) {
        console.error(err.response.data.details[0].message);
      }
    } else {
      try {
        const res = await axios.post("http://localhost:3001/api/users", user);
        if (res.status === 201) {
          getAllUsers();
          setUser(blankUserObj);
        }
      } catch (err) {
        console.error(err.response);
      }
    }
  };
  const handleDeleteUser = async (id: string) => {
    try {
      if (confirm("Are you sure to delete user?")) {
        const res = await axios.delete(`http://localhost:3001/api/users/${id}`);
        if (res.status === 200) {
          getAllUsers();
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleCancel = () => {
    setUserId("");
    setUser(blankUserObj);
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  useEffect(() => {
    (async () => {
      if (userId) {
        try {
          const res = await axios.get(
            `http://localhost:3001/api/users/${userId}`
          );
          if (res.status === 200) {
            const { name, roll, email, phone } = res.data;
            setUser({ name, roll, email, phone });
          }
        } catch (err) {
          console.error(err);
        }
      }
    })();
  }, [userId]);

  return (
    <>
      <form
        onSubmit={handleUser}
        style={{ margin: "auto", maxWidth: "max-content" }}
      >
        <input
          type='text'
          name='name'
          placeholder='name'
          maxLength={10}
          value={user.name}
          onChange={handleUserInput}
          required
        />
        <br />
        <select
          name='roll'
          value={user.roll}
          onChange={handleUserInput}
          required
        >
          <option value=''>--Select roll--</option>
          <option value='Web Developer'>Web Developer</option>
          <option value='Web Designer'>Web Designer</option>
          <option value='iOS Developer'>iOS developer</option>
          <option value='Android Developer'>Android developer</option>
        </select>
        <br />
        <input
          type='email'
          name='email'
          placeholder='email'
          value={user.email}
          onChange={handleUserInput}
          required
        />
        <br />
        <input
          type='tell'
          name='phone'
          placeholder='phone'
          maxLength={10}
          value={user.phone}
          onChange={handleUserInput}
          required
        />
        <br />
        <button type='button' onClick={handleCancel}>
          Cancel
        </button>
        <button>{userId ? "Edit" : "Add"}</button>
      </form>
      <div className='user-table'>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Roll</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user: any) => {
              return (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.roll}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>
                    <button type='button' onClick={() => setUserId(user._id)}>
                      Edit
                    </button>
                    <button
                      type='button'
                      onClick={() => handleDeleteUser(user._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
