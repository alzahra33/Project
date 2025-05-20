import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToBookTeach,
  getBookTeach,
  clearBookError,  // ✅ fixed name
  removeFromBook   // ✅ added import
} from "../Features/BookTeachSlice";
import { useNavigate } from "react-router-dom";
import moment from "moment";

const BookTeachPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { bookings, status, error } = useSelector((state) => state.bookTeach);
  const useremail = useSelector((state) => state.auth.user?.email); // ✅ defined

  useEffect(() => {
    if (useremail) dispatch(getBookTeach(useremail));
  }, [dispatch, useremail]);

  useEffect(() => {
    if (error) {
      const timeout = setTimeout(() => dispatch(clearBookError()), 3000); // ✅ corrected delay
      return () => clearTimeout(timeout);
    }
  }, [error, dispatch]);

  const handleBook = (teacheremail) => dispatch(addToBookTeach({ useremail, teacheremail }));
  const handleCancel = (teacheremail) => dispatch(removeFromBook({ useremail, teacheremail })); // ✅ fixed

  if (status === "loading") return <p>Loading...</p>;
  if (!bookings?.length)
    return <p className="empty-message">You have no bookings yet.</p>;

  return (
    <div className="bookteach-container">
      {error && <p className="error-message">{error}</p>}

      <div className="booking-list">
        <h2>My Teacher Bookings</h2>
        {bookings.map((booking) => (
          <div className="booking-card" key={booking.teacheremail}>
            <div className="booking-info">
              <p className="teacher-id">Teacher Email: {booking.teacheremail}</p>
              <p className="booked-on">
                Booked on: {moment(booking.createdAt).format("LLL")}
              </p>
            </div>
            <button
              className="cancel-btn"
              onClick={() => handleCancel(booking.teacheremail)} // ✅ fixed
            >
              Cancel
            </button>
          </div>
        ))}
      </div>

      <div className="available-section">
        <h3>Available Teachers</h3>
        <div className="available-buttons">
          {["teacher1@gmail.com", "teacher2@gmail.com", "teacher3@gmail.com"].map((temail) => (
            <button
              key={temail}
              className="book-btn"
              onClick={() => handleBook(temail)}
            >
              Book {temail}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookTeachPage;
