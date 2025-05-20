// src/Components/UserTeachers.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
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
    likes: 0,
    dislikes: 0,
  },
  {
    email: "brian@example.com",
    name: "Brian Lee",
    subject: "Physics",
    description: "Teaches high school and university-level physics.",
    image: ff,
    likes: 0,
    dislikes: 0,
  },
  {
    email: "catherine@example.com",
    name: "Catherine Smith",
    subject: "English Literature",
    description: "Focus on grammar, creative writing, and exam prep.",
    image: fff,
    likes: 0,
    dislikes: 0,
  },
];

const UserTeachers = () => {
  const navigate = useNavigate();
  const [teachers, setTeachers] = useState(initialTeachers);
  const [selectedHours, setSelectedHours] = useState({});

  const handleHourChange = (email, value) => {
    const hours = parseInt(value) || 0;
    setSelectedHours((prev) => ({ ...prev, [email]: hours }));
  };

  const handleBook = (teacher) => {
    const hours = selectedHours[teacher.email] || 0;
    const total = hours * 10;
    const user = { email: "user@example.com" };

    navigate("/Booking", {
      state: { user, teacher, hours, total },
    });
  };

  const handleLike = (email) => {
    setTeachers((prev) =>
      prev.map((t) =>
        t.email === email ? { ...t, likes: t.likes + 1 } : t
      )
    );
  };

  const handleDislike = (email) => {
    setTeachers((prev) =>
      prev.map((t) =>
        t.email === email ? { ...t, dislikes: t.dislikes + 1 } : t
      )
    );
  };

  return (
    <div className="container py-4">
      <h2 className="text-center mb-4" style={{ fontFamily: "cursive" }}>
        Our Teachers
      </h2>

      <div className="d-flex flex-column align-items-center gap-5">
        {teachers.map((teacher) => {
          const hours = selectedHours[teacher.email] || 0;
          const total = hours * 10;

          return (
            <div
              className="card shadow-lg w-100"
              style={{ maxWidth: "1000px", borderRadius: "40px" }}
              key={teacher.email}
            >
              <div className="row g-0 align-items-center">
                <div className="col-md-5">
                  <img
                    src={teacher.image}
                    className="img-fluid h-100"
                    alt={teacher.name}
                    style={{
                      width: "100%",
                      height: "300px",
                      objectFit: "cover",
                      borderTopLeftRadius: "40px",
                      borderBottomLeftRadius: "40px",
                    }}
                  />
                </div>
                <div className="col-md-7 p-4">
                  <h3>{teacher.name}</h3>
                  <h5 className="text-muted">{teacher.subject}</h5>
                  <p>{teacher.description}</p>

                  <label>Hours:</label>
                  <input
                    type="number"
                    className="form-control mb-2"
                    style={{ maxWidth: "120px" }}
                    min={0}
                    value={hours}
                    onChange={(e) =>
                      handleHourChange(teacher.email, e.target.value)
                    }
                  />
                  <p><strong>Total: {total} OMR</strong></p>
                  <button
                    className="btn btn-success me-3"
                    onClick={() => handleBook(teacher)}
                  >
                    Book Now
                  </button>

                  <div className="d-flex gap-3 mt-3">
                    <button
                      className="btn btn-outline-success"
                      onClick={() => handleLike(teacher.email)}
                    >
                      <FaThumbsUp className="me-2" />
                      {teacher.likes}
                    </button>
                    <button
                      className="btn btn-outline-warning"
                      onClick={() => handleDislike(teacher.email)}
                    >
                      <FaThumbsDown className="me-2" />
                      {teacher.dislikes}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UserTeachers;
