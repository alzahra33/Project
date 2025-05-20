import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Booking = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { user, teacher, hours, total } = location.state || {};

  if (!user || !teacher || hours === undefined || total === undefined) {
    return <div>Error: Missing booking data.</div>;
  }

  return (
    <div className="orders-container">
      <div className="order-card">
        <h2 className="order-title">Booking Information</h2>

        <p><strong>User Email:</strong> {user.email}</p>
        <p><strong>Teacher Name:</strong> {teacher.name}</p>
        <p><strong>Subject:</strong> {teacher.subject}</p>

        <table className="order-table">
          <thead>
            <tr>
              <th>Teacher ID</th>
              <th>Booked Hours</th>
              <th>Total (OMR)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{teacher._id || "N/A"}</td>
              <td>{hours}</td>
              <td>{total.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>

        <div className="order-footer">
          <span><strong>Total Payment:</strong> {total.toFixed(2)} OMR</span>
          <span><strong>Hours Booked:</strong> {hours}</span>
        </div>

        <button className="btn btn-secondary mt-3" onClick={() => navigate(-1)}>
          Go Back
        </button>
      </div>
    </div>
  );
};

export default Booking;
