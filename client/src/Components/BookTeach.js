import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const BookTeach = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) return <p>No booking data found.</p>;

  const { teacher, hours, totalPrice } = state;

  return (
    <div className="confirmation-container">
      <h2>Booking Confirmation</h2>
      <img src={teacher.imageUrl || "/default-teacher.png"} alt={teacher.name} width="200" />
      <p><strong>Name:</strong> {teacher.name}</p>
      <p><strong>Email:</strong> {teacher.email}</p>
      <p><strong>Subject:</strong> {teacher.subject}</p>
      <p><strong>Phone Number:</strong> {teacher.phoneNumber}</p>
      <p><strong>Price/Hour:</strong> {teacher.pricePerHour} OMR</p>
      <p><strong>Hours:</strong> {hours}</p>
      <p><strong>Total:</strong> {totalPrice} OMR</p>
      <button onClick={() => navigate("/BookTeachers")}>Back to Teachers</button>
    </div>
  );
};

export default BookTeach;
