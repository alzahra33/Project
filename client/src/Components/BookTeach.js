import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBookingsByUser } from "../Features/BookTeachSlice";


const BookTeachers = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.user);
  const { bookingHistory, loading } = useSelector((state) => state.bookings); // Ensure state.bookings exists

  useEffect(() => {
    if (user?._id) {
      dispatch(getBookingsByUser(user._id));
    }
  }, [user, dispatch]);

  if (loading) return <p>Loading bookings...</p>;
  if (!bookingHistory?.length) return <p>No teacher bookings found.</p>;

  return (
    <div className="bookings-container">
      {bookingHistory.map((booking) => (
        <div className="booking-card" key={booking._id}>
          <h2 className="booking-title">Teacher Booking Info</h2>
          <p><strong>Name:</strong> {booking.name}</p>
          <p><strong>Email:</strong> {booking.email}</p>
          <p><strong>Phone Number:</strong> {booking.phoneNumber}</p>
          <p><strong>Subject:</strong> {booking.subject}</p>
          <p><strong>Course Price:</strong> {booking.coursePrice} OMR</p>
          <p><strong>Image URL:</strong> <a href={booking.imageUrl} target="_blank" rel="noopener noreferrer">{booking.imageUrl}</a></p>
        </div>
      ))}
    </div>
  );
};

export default BookTeachers;
