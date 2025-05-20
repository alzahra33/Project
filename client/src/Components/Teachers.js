// src/Components/OwnerTeachers.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import f from "../Images/f.png";
import ff from "../Images/ff.png";
import fff from "../Images/fff.png";


const initialTeachers = [
  {
    email: "alice@example.com",
    name: "Alice Johnson",
    subject: "Mathematics",
    description: "Experienced in algebra, calculus, and SAT prep.",
    image: f,
  },
  {
    email: "brian@example.com",
    name: "Brian Lee",
    subject: "Physics",
    description: "Teaches high school and university-level physics.",
    image: ff,
  },
  {
    email: "catherine@example.com",
    name: "Catherine Smith",
    subject: "English Literature",
    description: "Focus on grammar, creative writing, and exam prep.",
    image: fff,
  },
];

const Teachers = () => {
  const navigate = useNavigate();
  const [teachers, setTeachers] = useState(initialTeachers);

  const handleEdit = (email) => {
    navigate(`/UpdateTeachers/${email}`);
  };

  const handleDelete = (email) => {
    setTeachers(teachers.filter((t) => t.email !== email));
  };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">Manage Teachers</h2>
        <button
          className="btn btn-dark"
          onClick={() => navigate("/AddTeachers")}
        >
          + Add Teacher
        </button>
      </div>

      <div className="d-flex flex-column align-items-center gap-4">
        {teachers.map((teacher) => (
          <div
            className="card w-100 shadow"
            key={teacher.email}
            style={{ maxWidth: "1000px", borderRadius: "30px" }}
          >
            <div className="row g-0 align-items-center">
              <div className="col-md-4">
                <img
                  src={teacher.image}
                  alt={teacher.name}
                  className="img-fluid rounded-start"
                  style={{
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "30px 0 0 30px",
                  }}
                />
              </div>
              <div className="col-md-8 p-4">
                <h3>{teacher.name}</h3>
                <h5 className="text-muted">{teacher.subject}</h5>
                <p>{teacher.description}</p>

                <div className="d-flex gap-3 mt-2">
                  <button
                    className="btn btn-outline-primary"
                    onClick={() => handleEdit(teacher.email)}
                  >
                    <FaEdit /> Edit
                  </button>
                  <button
                    className="btn btn-outline-danger"
                    onClick={() => handleDelete(teacher.email)}
                  >
                    <FaTrash /> Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Teachers;
