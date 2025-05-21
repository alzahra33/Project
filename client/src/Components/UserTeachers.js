import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTeachers } from "../Features/TeacherSlice";
import { useNavigate } from "react-router-dom";
import "./UserTeachers.css";

const BookTeachers = () => {
  const teachers = useSelector((state) => state.teachers.teachers);
  const dispatch = useDispatch();
  const [bookingData, setBookingData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getTeachers());
  }, [dispatch]);

  const handleHourChange = (email, hours) => {
    setBookingData((prev) => ({
      ...prev,
      [email]: {
        hours,
        totalPrice:
          teachers.find((t) => t.email === email).coursePrice * hours,
      },
    }));
  };

  const handleBooking = (teacher) => {
    const data = bookingData[teacher.email];
    if (!data?.hours || data.hours <= 0) {
      alert("Please enter a valid number of hours.");
      return;
    }

    navigate("/BookTeach", {
      state: {
        teacher: {
          name: teacher.name,
          email: teacher.email,
          subject: teacher.subject,
          imageUrl: teacher.imageUrl,
          pricePerHour: teacher.coursePrice,
        },
        hours: data.hours,
        totalPrice: data.totalPrice,
      },
    });
  };

  return (
    <div className="user-teachers">
      {teachers.map((teacher) => (
        <div className="teacher-card" key={teacher.email}>
          <img src={teacher.imageUrl} alt={teacher.name} />
          <h3>{teacher.name}</h3>
          <p>Subject: {teacher.subject}</p>
          <p>Price per hour: {teacher.coursePrice} OMR</p>

          <input
            type="number"
            min="1"
            placeholder="Hours"
            value={bookingData[teacher.email]?.hours || ""}
            onChange={(e) =>
              handleHourChange(teacher.email, Number(e.target.value))
            }
          />

          <p>
            Total:&nbsp;
            {bookingData[teacher.email]?.totalPrice
              ? `${bookingData[teacher.email].totalPrice} OMR`
              : "0 OMR"}
          </p>

          <button
            className="book-button"
            onClick={() => handleBooking(teacher)}
          >
            Book Now
          </button>
        </div>
      ))}
    </div>
  );
};

export default BookTeachers;
